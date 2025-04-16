import { AwsProps, fetchOverride } from './aws-utils';
import { AwsClient, AwsClientV2 } from './AwsClient';
import { CohereClient } from "./Client";

export class BedrockClient extends AwsClient {
    constructor(_options: CohereClient.Options & AwsProps) {
        super({ ..._options, fetcher: fetchOverride("bedrock", _options) });
    }
}

export class BedrockClientV2 extends AwsClientV2 {
    constructor(_options: CohereClient.Options & AwsProps) {
        super({ ..._options, fetcher: fetchOverride("bedrock", _options) });
    }
}
