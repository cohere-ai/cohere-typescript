import { V2 } from "./api/resources/v2/client/Client";
import { CohereClient } from "./Client";

// this class will require manual updates over time
export class CohereClientV2 implements Omit<CohereClient, keyof V2 | "v2">, Pick<V2, keyof V2> {
    constructor(private _options: CohereClient.Options) {
    }

    private client = new CohereClient(this._options);
    private clientV2 = new V2(this._options);

    chat: typeof V2.prototype.chat = this.clientV2.chat.bind(this.clientV2)
    chatStream: typeof V2.prototype.chatStream = this.clientV2.chatStream.bind(this.clientV2)
    embed: typeof V2.prototype.embed = this.clientV2.embed.bind(this.clientV2)
    rerank: typeof V2.prototype.rerank = this.clientV2.rerank.bind(this.clientV2)

    generateStream: typeof CohereClient.prototype.generateStream = this.client.generateStream.bind(this.clientV2)
    generate: typeof CohereClient.prototype.generate = this.client.generate.bind(this.clientV2)
    classify: typeof CohereClient.prototype.classify = this.client.classify.bind(this.clientV2)
    summarize: typeof CohereClient.prototype.summarize = this.client.summarize.bind(this.clientV2)
    tokenize: typeof CohereClient.prototype.tokenize = this.client.tokenize.bind(this.clientV2)
    detokenize: typeof CohereClient.prototype.detokenize = this.client.detokenize.bind(this.clientV2)
    checkApiKey: typeof CohereClient.prototype.checkApiKey = this.client.checkApiKey.bind(this.clientV2)

    embedJobs: typeof CohereClient.prototype.embedJobs = this.client.embedJobs
    datasets: typeof CohereClient.prototype.datasets = this.client.datasets
    connectors: typeof CohereClient.prototype.connectors = this.client.connectors
    models: typeof CohereClient.prototype.models = this.client.models
    finetuning: typeof CohereClient.prototype.finetuning = this.client.finetuning
    batches: typeof CohereClient.prototype.batches = this.client.batches
}