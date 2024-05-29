import { Sha256 } from '@aws-crypto/sha256-js';
import { fromNodeProviderChain } from '@aws-sdk/credential-providers';
import { HttpRequest } from '@aws-sdk/protocol-http';
import { SignatureV4 } from '@aws-sdk/signature-v4';
import assert from 'assert';
import { PassThrough, Readable } from 'stream';
import { AwsClient } from './AwsClient';
import { CohereClient } from "./Client";
import { AwsProps, getUrl } from './aws-utils';
import { LineDecoder, readableStreamAsyncIterable } from './core/streaming-fetcher/streaming-utils';
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

const streamingResponseParser: Record<string, any> = {
    "chat": serializers.StreamedChatResponse,
    "generate": serializers.GenerateStreamedResponse,
}

const nonStreamedResponseParser: Record<string, any> = {
    "chat": serializers.NonStreamedChatResponse,
    "embed": serializers.EmbedResponse,
    "generate": serializers.Generation,
}

const mapResponseFromBedrock = async (streaming: boolean, endpoint: string, obj: {}) => {

    const parser = streaming ? streamingResponseParser[endpoint] : nonStreamedResponseParser[endpoint];

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

export class SagemakerClient extends AwsClient {
    constructor(protected readonly _options: CohereClient.Options & AwsProps) {
        _options.token = "n/a";
        super(_options);
        this.overrideFetch();
    }

    async getAuthHeaders(url: URL, req: RequestInit, props: AwsProps): Promise<Record<string, string>> {
        assert(req.method, 'Expected request method property to be set');
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
            service: 'sagemaker',
            region: props.awsRegion,
            credentials,
            sha256: Sha256,
        });

        const headers =
            !req.headers ? {}
                : Array.isArray(req.headers) ?
                    Object.fromEntries(Array.from(req.headers).map((header) => [...header]))
                    : { ...req.headers };

        // The connection header may be stripped by a proxy somewhere, so the receiver
        // of this message may not see this header, so we remove it from the set of headers
        // that are signed.
        delete headers['connection'];
        headers['host'] = url.hostname;

        const request = new HttpRequest({
            method: req.method.toUpperCase(),
            protocol: url.protocol,
            path: url.pathname,
            headers,
            body: req.body,
        });

        const signed = await signer.sign(request);
        return signed.headers;
    };

    private getEndpointFromUrl(url: string, chatModel?: string, embedModel?: string, generateModel?: string): string {
        if (chatModel && url.includes(chatModel)) {
            return "chat";
        }
        if (embedModel && url.includes(embedModel)) {
            return "embed";
        }
        if (generateModel && url.includes(generateModel)) {
            return "generate";
        }
        throw new Error(`Unknown endpoint in url: ${url}`);
    }

    private parseAWSEvent(line: string) {
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

    private overrideFetch() {
        const originalFetch = global.fetch;
        const fetchOverride: typeof fetch = async (input, init): Promise<Response> => {
            assert(init, 'Expected init to be set');

            const endpoint = (input as String).split('/').pop() as string;
            const bodyJson = JSON.parse(init.body as string);
            const isStreaming = Boolean(bodyJson.stream);

            const url = getUrl(
                "sagemaker",
                this._options.awsRegion,
                bodyJson.model,
                isStreaming,
            );

            delete bodyJson["stream"];
            delete bodyJson["model"];
            delete (init.headers as Record<string, string>)['Authorization'];
            (init.headers as Record<string, string>)["Host"] = new URL(url).hostname;
            init.body = JSON.stringify(bodyJson);

            const authHeaders = await this.getAuthHeaders(
                new URL(url),
                init,
                {
                    awsRegion: this._options.awsRegion,
                    awsAccessKey: this._options.awsAccessKey,
                    awsSecretKey: this._options.awsSecretKey,
                    awsSessionToken: this._options.awsSessionToken,
                }
            )

            init.headers = authHeaders

            const response = await originalFetch(url, init);

            try {
                if (isStreaming) {
                    const responseStream = readableStreamAsyncIterable(response.body as unknown as Readable);
                    const lineDecoder = new LineDecoder();
                    const newBody = new PassThrough();

                    for await (const chunk of responseStream) {
                        for (const line of lineDecoder.decode(chunk as any)) {
                            const event = this.parseAWSEvent(line);
                            if (event) {
                                const obj = await mapResponseFromBedrock(isStreaming, endpoint, event);
                                newBody.push(JSON.stringify(obj) + "\n");
                            }
                        }
                    }

                    for (const line of lineDecoder.flush()) {
                        const event = this.parseAWSEvent(line);
                        if (event) {
                            const obj = await mapResponseFromBedrock(isStreaming, endpoint, event);
                            newBody.push(JSON.stringify(obj) + "\n");
                        }
                    }
                    newBody.end();
                    return new Response(newBody as any, response);
                } else {
                    const newBody = new PassThrough();
                    const oldBody = await response.json();
                    const mappedResponse = await mapResponseFromBedrock(isStreaming, endpoint, oldBody);
                    newBody.write(JSON.stringify(mappedResponse));
                    newBody.end();
                    return new Response(newBody as any, response);
                }
            } catch (e) {
                return response;
            }
        };

        // TODO: fix this because this when fern support natively overiding fetch
        global.fetch = fetchOverride;
    }
}
