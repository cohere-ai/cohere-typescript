import { AwsProps, fetchOverride } from './aws-utils';
import { AwsClient } from './AwsClient';
import { CohereClient } from "./Client";

export class BedrockClient extends AwsClient {
    constructor(_options: CohereClient.Options & AwsProps) {
        super({ ..._options, fetcher: fetchOverride("bedrock", _options) });
    }
}
