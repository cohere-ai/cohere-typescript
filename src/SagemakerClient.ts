import { AwsClient } from './AwsClient';
import { CohereClient } from "./Client";
import { AwsProps, fetchOverride } from './aws-utils';


export class SagemakerClient extends AwsClient {
    constructor(protected readonly _options: CohereClient.Options & AwsProps) {
        _options.token = "n/a";
        super(_options);
        this.overrideFetch();
    }


    private overrideFetch() {
        global.fetch = fetchOverride("sagemaker", this._options, global.fetch);
    }
}
