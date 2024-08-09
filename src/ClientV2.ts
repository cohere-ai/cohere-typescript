import { V2 } from "./api/resources/v2/client/Client";
import { CohereClient } from "./Client";

// this class will require manual updates over time
export class CohereClientV2 implements Omit<CohereClient, "chat" | "chatStream" | "v2">, Pick<V2, keyof V2> {
    constructor(private _options: CohereClient.Options) {
    }

    private client = new CohereClient(this._options);
    private clientV2 = new V2(this._options);

    chat = this.clientV2.chat;
    chatStream = this.clientV2.chatStream;

    generateStream = this.client.generateStream
    generate = this.client.generate
    embed = this.client.embed
    rerank = this.client.rerank
    classify = this.client.classify
    summarize = this.client.summarize
    tokenize = this.client.tokenize
    detokenize = this.client.detokenize
    checkApiKey = this.client.checkApiKey

    embedJobs = this.client.embedJobs
    datasets = this.client.datasets
    connectors = this.client.connectors
    models = this.client.models
    finetuning = this.client.finetuning
}