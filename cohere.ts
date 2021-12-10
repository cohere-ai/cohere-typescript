import * as models from './models'
import API from './services/api_service'

enum ENDPOINT {
  GENERATE = '/generate',
  EMBED = '/embed',
  CHOOSE_BEST = '/choose-best',
  LIKELIHOOD = '/likelihood'
}

interface CohereService {
  init(key: string, version?: string): void;
  generate(
    model: string,
    config: models.generate
  ): Promise<models.cohereResponse<models.text>>;
  embed(
    model: string,
    config: models.embed
  ): Promise<models.cohereResponse<models.embeddings>>;
  chooseBest(
    model: string,
    config: models.chooseBest
  ): Promise<models.cohereResponse<models.scores>>;
  likelihood(
    model: string,
    config: models.likelihood
  ): Promise<models.cohereResponse<models.token_likelihoods>>;
}

class Cohere implements CohereService {
  public init(key: string, version?: string): void {
    API.init(key, version);
  }

  private makeRequest(
    model: string,
    endpoint: string,
    data: models.cohereParameters,
  ): Promise<models.cohereResponse<models.responseBody>> {
    return API.post(`/${model}${endpoint}`, data);
  }

  public generate(model: string, config: models.generate): Promise<models.cohereResponse<models.text>> {
    return this.makeRequest(model, ENDPOINT.GENERATE, config) as Promise<models.cohereResponse<models.text>>;
  }

  public embed(model: string, config: models.embed): Promise<models.cohereResponse<models.embeddings>> {
    return this.makeRequest(model, ENDPOINT.EMBED, config) as Promise<models.cohereResponse<models.embeddings>>;
  }

  public chooseBest(model: string, config: models.chooseBest): Promise<models.cohereResponse<models.scores>> {
    return this.makeRequest(model, ENDPOINT.CHOOSE_BEST, config) as Promise<models.cohereResponse<models.scores>>;
  }

  public likelihood(model: string, config: models.likelihood): Promise<models.cohereResponse<models.token_likelihoods>> {
    return this.makeRequest(model, ENDPOINT.LIKELIHOOD, config) as Promise<models.cohereResponse<models.token_likelihoods>>;
  }
}
const cohere = new Cohere();
export = cohere;
