import { V2 } from "./api/resources/v2/client/Client";
import { CohereClient } from "./Client";

// this class will require manual updates over time
export class CohereClientV2 implements Omit<CohereClient, "chat" | "chatStream" | "v2">, Pick<V2, keyof V2> {
    constructor(private _options: CohereClient.Options) {
    }

    private client = new CohereClient(this._options);
    private clientV2 = new V2(this._options);

    chat = this.clientV2.chat.bind(this)
    chatStream = this.clientV2.chatStream.bind(this)

    generateStream = this.client.generateStream.bind(this)
    generate = this.client.generate.bind(this)
    embed = this.client.embed.bind(this)
    rerank = this.client.rerank.bind(this)
    classify = this.client.classify.bind(this)
    summarize = this.client.summarize.bind(this)
    tokenize = this.client.tokenize.bind(this)
    detokenize = this.client.detokenize.bind(this)
    checkApiKey = this.client.checkApiKey.bind(this)

    embedJobs = this.client.embedJobs
    datasets = this.client.datasets
    connectors = this.client.connectors
    models = this.client.models
    finetuning = this.client.finetuning
}