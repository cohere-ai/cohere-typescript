import { AwsProps, fetchOverride } from 'aws-utils';
import { AwsClient } from './AwsClient';
import { CohereClient } from "./Client";
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

export class BedrockClient extends AwsClient {
    constructor(protected readonly _options: CohereClient.Options & AwsProps) {
        _options.token = "n/a";
        super(_options);
        this.overrideFetch();
    }


    private overrideFetch() {
        global.fetch = fetchOverride("bedrock", this._options, global.fetch);
    }
}
