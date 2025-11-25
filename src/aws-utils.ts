import { Sha256 } from '@aws-crypto/sha256-js';
import { fromNodeProviderChain } from '@aws-sdk/credential-providers';
import { HttpRequest } from '@smithy/protocol-http';
import { SignatureV4 } from '@smithy/signature-v4';
import { PassThrough, Readable } from 'readable-stream';
import { APIResponse, FetchFunction, Fetcher, fetcher } from './core';
import { readableStreamAsyncIterable } from './core/stream/Stream';
import { LineDecoder } from './core/streaming-fetcher/streaming-utils';
import * as serializers from "./serialization";

const withTempEnv = async <R>(updateEnv: () => void, fn: () => Promise<R>): Promise<R> => {
    const previousEnv = { ...process.env };

    try {
        updateEnv();
        return await fn();
    } finally {
        process.env = previousEnv;
    }
};

const streamingResponseParser: Record<string, Record<string, any>> = {
    1: {
        "chat": serializers.StreamedChatResponse,
        "generate": serializers.GenerateStreamedResponse,
    },
    2: {
        "chat": serializers.V2ChatStreamResponse,
        "generate": serializers.GenerateStreamedResponse,
    }
}

const nonStreamedResponseParser: Record<string, Record<string, any>> = {
    1: {
        "chat": serializers.NonStreamedChatResponse,
        "embed": serializers.EmbedResponse,
        "generate": serializers.Generation,
        "rerank": serializers.RerankResponse,
    },
    2: {
        "chat": serializers.V2ChatResponse,
        "embed": serializers.EmbedByTypeResponse,
        "generate": serializers.Generation,
        "rerank": serializers.V2RerankResponse,
    }
}

export const mapResponseFromBedrock = async (streaming: boolean, endpoint: string, version: 1 | 2, obj: {}): Promise<any> => {

    const parser = streaming ? streamingResponseParser[version][endpoint] : nonStreamedResponseParser[version][endpoint];

    const config = {
        unrecognizedObjectKeys: "passthrough",
        allowUnrecognizedUnionMembers: true,
        allowUnrecognizedEnumValues: true,
        skipValidation: true,
        breadcrumbsPrefix: ["response"],
    }

    const parsed = await parser.parseOrThrow(obj, config)
    return parser.jsonOrThrow(parsed, config);
}

export type AwsProps = {
    awsRegion: string;
    awsAccessKey?: string;
    awsSecretKey?: string;
    awsSessionToken?: string;
};

export type AwsPlatform = "sagemaker" | "bedrock"

export type AwsEndpoint = "chat" | "generate" | "embed" | "rerank"

export const getUrl = (
    platform: "bedrock" | "sagemaker",
    awsRegion: string,
    model: string,
    stream: boolean,
): string => {
    const endpoint = {
        "bedrock": stream ? "invoke-with-response-stream" : "invoke",
        "sagemaker": stream ? "invocations-response-stream" : "invocations"
    }[platform];
    return {
        "bedrock": `https://${platform}-runtime.${awsRegion}.amazonaws.com/model/${model}/${endpoint}`,
        "sagemaker": `https://runtime.sagemaker.${awsRegion}.amazonaws.com/endpoints/${model}/${endpoint}`
    }[platform];
}

export const getAuthHeaders = async (url: URL, method: string, headers: Record<string, string>, body: unknown, service: AwsPlatform, props: AwsProps): Promise<Record<string, string>> => {
    const providerChain = fromNodeProviderChain();

    const credentials = await withTempEnv(
        () => {
            // Temporarily set the appropriate environment variables if we've been
            // explicitly given credentials so that the credentials provider can
            // resolve them.
            //
            // Note: the environment provider is only not run first if the `AWS_PROFILE`
            // environment variable is set.
            // https://github.com/aws/aws-sdk-js-v3/blob/44a18a34b2c93feccdfcd162928d13e6dbdcaf30/packages/credential-provider-node/src/defaultProvider.ts#L49
            if (props.awsAccessKey) {
                process.env['AWS_ACCESS_KEY_ID'] = props.awsAccessKey;
            }
            if (props.awsSecretKey) {
                process.env['AWS_SECRET_ACCESS_KEY'] = props.awsSecretKey;
            }
            if (props.awsSessionToken) {
                process.env['AWS_SESSION_TOKEN'] = props.awsSessionToken;
            }
        },
        () => providerChain(),
    );

    const signer = new SignatureV4({
        service,
        region: props.awsRegion,
        credentials,
        sha256: Sha256,
    });

    // The connection header may be stripped by a proxy somewhere, so the receiver
    // of this message may not see this header, so we remove it from the set of headers
    // that are signed.
    delete headers['connection'];
    headers['host'] = url.hostname;

    const request = new HttpRequest({
        method: method.toUpperCase(),
        protocol: url.protocol,
        path: url.pathname,
        headers,
        body: body,
    });

    const signed = await signer.sign(request);
    return signed.headers;
};

export const parseAWSEvent = (line: string): any => {
    const regex = /{[^\}]*}/;
    const match = line.match(regex);
    if (match?.[0]) {
        const obj = JSON.parse(match[0]);
        if (obj.bytes) {
            const base64Payload = Buffer.from(obj.bytes, 'base64').toString('utf-8');
            const streamedObj = JSON.parse(base64Payload);
            if (streamedObj.event_type) {
                return streamedObj;
            }
        }
    }
}

const getVersion = (version: string): 1 | 2 => (({"v1": 1, "v2": 2})[version] || 1) as 1 | 2

export const fetchOverride = (platform: AwsPlatform, {
    awsRegion,
    awsAccessKey,
    awsSecretKey,
    awsSessionToken,
}: AwsProps): FetchFunction => async (fetcherArgs: Fetcher.Args): Promise<APIResponse<any, Fetcher.Error>> => {
    const splittedUrl: string[] = fetcherArgs.url.split('/');
    const endpoint = splittedUrl.pop()!;
    const version = getVersion(splittedUrl.pop()!);
    const bodyJson = fetcherArgs.body as { model?: string, stream?: boolean, api_version?: number };
    console.assert(bodyJson.model, "model is required")

    const isStreaming = Boolean(bodyJson.stream);

    const url = getUrl(
        platform,
        awsRegion,
        bodyJson.model!,
        isStreaming,
    );

    if (endpoint === "rerank") {
        bodyJson["api_version"] = version;
    }

    delete bodyJson["stream"];
    delete bodyJson["model"];
    delete (fetcherArgs.headers as Record<string, string>)['Authorization'];
    (fetcherArgs.headers as Record<string, string>)["Host"] = new URL(url).hostname;

    const authHeaders = await getAuthHeaders(
        new URL(url),
        fetcherArgs.method,
        fetcherArgs.headers as Record<string, string>,
        JSON.stringify(bodyJson),
        platform,
        {
            awsRegion,
            awsAccessKey,
            awsSecretKey,
            awsSessionToken,
        }
    )

    fetcherArgs.url = url;
    fetcherArgs.headers = authHeaders

    const response = await fetcher(fetcherArgs);

    if (!response.ok) {
        return response;
    }

    try {
        if (isStreaming) {
            const responseStream = readableStreamAsyncIterable(response.body as unknown as Readable);
            const lineDecoder = new LineDecoder();
            const newBody = new PassThrough();

            for await (const chunk of responseStream) {
                for (const line of lineDecoder.decode(chunk as any)) {
                    const event = parseAWSEvent(line);
                    if (event) {
                        const obj = await mapResponseFromBedrock(isStreaming, endpoint, version, event);
                        newBody.push(JSON.stringify(obj) + "\n");
                    }
                }
            }

            for (const line of lineDecoder.flush()) {
                const event = parseAWSEvent(line);
                if (event) {
                    const obj = await mapResponseFromBedrock(isStreaming, endpoint, version, event);
                    newBody.push(JSON.stringify(obj) + "\n");
                }
            }
            newBody.end();
            return {
                ok: true,
                body: newBody,
                rawResponse: response.rawResponse
            }
        } else {
            const oldBody = await response.body as {};
            const mappedResponse = await mapResponseFromBedrock(isStreaming, endpoint, version, oldBody);
            return {
                ok: true,
                body: mappedResponse,
                rawResponse: response.rawResponse
            }
        }
    } catch (e) {
        throw e
    }
};
