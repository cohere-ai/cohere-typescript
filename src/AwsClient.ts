import { AwsProps } from 'aws-utils';
import { CohereClient } from "./Client";

export class AwsClient extends CohereClient {
    constructor(_options: CohereClient.Options & AwsProps) {
        _options.token = "n/a";
        super(_options);
    }
}