import * as models from "./models";
import API from "./services/api_service";

enum ENDPOINT {
  GENERATE = "/generate",
  EMBED = "/embed",
  CLASSIFY = "/classify",
  TOKENIZE = "/tokenize",
  DETOKENIZE = "/detokenize",
  DETECT_LANGUAGE = "/detect-language",
  SUMMARIZE = "/summarize",
}

const COHERE_EMBED_BATCH_SIZE = 5;

interface CohereService {
  init(key: string, version?: string): void;
  generate(
    config: models.generateRequest
  ): Promise<models.cohereResponse<models.generateResponse>>;
  classify(
    config: models.classifyRequest
  ): Promise<models.cohereResponse<models.classifyResponse>>;
  tokenize(
    config: models.tokenizeRequest
  ): Promise<models.cohereResponse<models.tokenizeResponse>>;
  detokenize(
    config: models.detokenizeRequest
  ): Promise<models.cohereResponse<models.detokenizeResponse>>;
  embed(
    config: models.embedRequest
  ): Promise<models.cohereResponse<models.embedResponse>>;
  detectLanguage(
    config: models.detectLanguageRequest
  ): Promise<models.cohereResponse<models.detectLanguageResponse>>;
}

class Cohere implements CohereService {
  public init(key: string, version?: string): void {
    API.init(key, version);
  }

  private makeRequest(
    endpoint: string,
    data: models.cohereParameters
  ): Promise<models.cohereResponse<models.responseBody>> {
    return API.post(endpoint, data);
  }

  /** Generates realistic text conditioned on a given input.
   * See: https://docs.cohere.ai/generate-reference
   */
  public generate(
    config: models.generateRequest
  ): Promise<models.cohereResponse<models.generateResponse>> {
    return this.makeRequest(ENDPOINT.GENERATE, config) as Promise<
      models.cohereResponse<models.generateResponse>
    >;
  }

  /** Returns a list of tokens for the specified text.
   * See: https://docs.cohere.ai/tokenize-reference
   */
  public tokenize({
    text,
  }: models.tokenizeRequest): Promise<
    models.cohereResponse<models.tokenizeResponse>
  > {
    return this.makeRequest(ENDPOINT.TOKENIZE, {
      text,
    }) as Promise<models.cohereResponse<models.tokenizeResponse>>;
  }

  /** Returns a string for the specified list of tokens.
   * See: https://docs.cohere.ai/detokenize-reference
   */
  public detokenize({
    tokens,
  }: models.detokenizeRequest): Promise<
    models.cohereResponse<models.detokenizeResponse>
  > {
    return this.makeRequest(ENDPOINT.DETOKENIZE, {
      tokens,
    }) as Promise<models.cohereResponse<models.detokenizeResponse>>;
  }

  /** Returns text embeddings. An embedding is a list of floating point numbers that captures semantic
   * information about the text that it represents.
   * See: https://docs.cohere.ai/embed-reference
   */
  public embed(
    config: models.embedRequest
  ): Promise<models.cohereResponse<models.embedResponse>> {
    const createBatches = (array: string[]) => {
      const result = [];
      for (const value of array) {
        const lastArray = result[result.length - 1];
        if (!lastArray || lastArray.length === COHERE_EMBED_BATCH_SIZE) {
          result.push([value]);
        } else {
          lastArray.push(value);
        }
      }
      return result;
    };

    return Promise.all(
      createBatches(config.texts).map(
        (texts) =>
          this.makeRequest(ENDPOINT.EMBED, {
            ...config,
            texts,
          }) as Promise<models.cohereResponse<models.embedResponse>>
      )
    ).then((results) => {
      let embeddings: number[][] = [];
      results.forEach((result) => {
        embeddings = embeddings.concat(result.body.embeddings);
      });

      const response: models.cohereResponse<models.embedResponse> = {
        statusCode: results[0].statusCode,
        body: { embeddings },
      };

      return response;
    });
  }

  /**
   * Classifies text as one of the given labels. Returns a confidence score for each label.
   * See: https://docs.cohere.ai/classify-reference
   */
  public classify(
    config: models.classifyRequest
  ): Promise<models.cohereResponse<models.classifyResponse>> {
    return this.makeRequest(ENDPOINT.CLASSIFY, config) as Promise<
      models.cohereResponse<models.classifyResponse>
    >;
  }

  public detectLanguage(
    config: models.detectLanguageRequest
  ): Promise<models.cohereResponse<models.detectLanguageResponse>> {
    return this.makeRequest(ENDPOINT.DETECT_LANGUAGE, config) as Promise<
      models.cohereResponse<models.detectLanguageResponse>
    >;
  }

  public summarize(
    config: models.summarizeRequest
  ): Promise<models.cohereResponse<models.summarizeResponse>> {
    return this.makeRequest(ENDPOINT.SUMMARIZE, config) as Promise<
      models.cohereResponse<models.summarizeResponse>
    >;
  }
}
const cohere = new Cohere();
export = cohere;
