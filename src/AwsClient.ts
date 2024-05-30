import { AwsProps } from 'aws-utils';
import { CohereClient } from "./Client";

export class AwsClient extends CohereClient {
    constructor(_options: CohereClient.Options & AwsProps) {
        _options.token = "n/a"; // AWS clients don't need a token but setting to this to a string so Fern doesn't complain
        super(_options);
    }
}