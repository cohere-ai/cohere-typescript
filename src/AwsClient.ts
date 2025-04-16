import { CohereClientV2 } from 'ClientV2';
import { AwsProps } from './aws-utils';
import { CohereClient } from "./Client";

export class AwsClient extends CohereClient {
    constructor(_options: CohereClient.Options & AwsProps) {
        _options.token = "n/a"; // AWS clients don't need a token but setting to this to a string so Fern doesn't complain
        super(_options);
    }
}

export class AwsClientV2 extends CohereClientV2 {
    constructor(_options: CohereClient.Options & AwsProps) {
        _options.token = "n/a"; // AWS clients don't need a token but setting to this to a string so Fern doesn't complain
        super(_options);
    }
}