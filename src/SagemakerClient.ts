import { AwsClient } from './AwsClient';
import { CohereClient } from "./Client";
import { AwsProps, fetchOverride } from './aws-utils';


export class SagemakerClient extends AwsClient {
    constructor(_options: CohereClient.Options & AwsProps) {
        super({ ..._options, fetcher: fetchOverride("sagemaker", _options) });
    }
}
