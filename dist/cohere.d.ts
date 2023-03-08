import * as models from "./models";
interface CohereService {
    init(key: string): void;
    generate(config: models.generateRequest): Promise<models.cohereResponse<models.generateResponse>>;
    classify(config: models.classifyRequest): Promise<models.cohereResponse<models.classifyResponse>>;
    tokenize(config: models.tokenizeRequest): Promise<models.cohereResponse<models.tokenizeResponse>>;
    detokenize(config: models.detokenizeRequest): Promise<models.cohereResponse<models.detokenizeResponse>>;
    embed(config: models.embedRequest): Promise<models.cohereResponse<models.embedResponse>>;
    detectLanguage(config: models.detectLanguageRequest): Promise<models.cohereResponse<models.detectLanguageResponse>>;
}
declare class Cohere implements CohereService {
    init(key: string): void;
    private makeRequest;
    /** Generates realistic text conditioned on a given input.
     * See: https://docs.cohere.ai/generate-reference
     */
    generate(config: models.generateRequest): Promise<models.cohereResponse<models.generateResponse>>;
    /** Returns a list of tokens for the specified text.
     * See: https://docs.cohere.ai/tokenize-reference
     */
    tokenize({ text, }: models.tokenizeRequest): Promise<models.cohereResponse<models.tokenizeResponse>>;
    /** Returns a string for the specified list of tokens.
     * See: https://docs.cohere.ai/detokenize-reference
     */
    detokenize({ tokens, }: models.detokenizeRequest): Promise<models.cohereResponse<models.detokenizeResponse>>;
    /** Returns text embeddings. An embedding is a list of floating point numbers that captures semantic
     * information about the text that it represents.
     * See: https://docs.cohere.ai/embed-reference
     */
    embed(config: models.embedRequest): Promise<models.cohereResponse<models.embedResponse>>;
    /**
     * Classifies text as one of the given labels. Returns a confidence score for each label.
     * See: https://docs.cohere.ai/classify-reference
     */
    classify(config: models.classifyRequest): Promise<models.cohereResponse<models.classifyResponse>>;
    detectLanguage(config: models.detectLanguageRequest): Promise<models.cohereResponse<models.detectLanguageResponse>>;
    summarize(config: models.summarizeRequest): Promise<models.cohereResponse<models.summarizeResponse>>;
}
declare const cohere: Cohere;
export = cohere;
