import { V2 } from "./api/resources/v2/client/Client";
import { CohereClient } from "./Client";

// this class will require manual updates over time
export class CohereClientV2 implements Omit<CohereClient, "chat" | "chatStream" | "v2">, Pick<V2, keyof V2> {
    constructor(private _options: CohereClient.Options) {
    }

    private client = new CohereClient(this._options);
    private clientV2 = new V2(this._options);

    chat = this.clientV2.chat.bind(this.clientV2)
    chatStream = this.clientV2.chatStream.bind(this.clientV2)

    generateStream = this.client.generateStream.bind(this.clientV2)
    generate = this.client.generate.bind(this.clientV2)
    embed = this.client.embed.bind(this.clientV2)
    rerank = this.client.rerank.bind(this.clientV2)
    classify = this.client.classify.bind(this.clientV2)
    summarize = this.client.summarize.bind(this.clientV2)
    tokenize = this.client.tokenize.bind(this.clientV2)
    detokenize = this.client.detokenize.bind(this.clientV2)
    checkApiKey = this.client.checkApiKey.bind(this.clientV2)

    embedJobs = this.client.embedJobs
    datasets = this.client.datasets
    connectors = this.client.connectors
    models = this.client.models
    finetuning = this.client.finetuning
}