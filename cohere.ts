// const https = require('https');
import * as models from './models'
import API from './services/api_service'

enum ENDPOINT {
  GENERATE = '/generate',
  SIMILARITY = '/similarity',
  EMBED = '/embed',
  CHOOSE_BEST = '/choose-best',
  LIKELIHOOD = '/likelihood'
}

interface CohereService {
  init(key: string): void;
  generate(
    model: string,
    config: models.generate
  ): Promise<models.cohereResponse>;
  similarity(
    model: string,
    config: models.similarity
  ): Promise<models.cohereResponse>;
  embed(
    model: string,
    config: models.embed
  ): Promise<models.cohereResponse>;
  chooseBest(
    model: string,
    config: models.chooseBest
  ): Promise<models.cohereResponse>;
  likelihood(
    model: string,
    config: models.likelihood
  ): Promise<models.cohereResponse>;
}

class Cohere implements CohereService {

  public init(key: string): void {
    API.init(key);
  };

  private makeRequest(
    model: string,
    endpoint: string,
    data: object,
  ): Promise<models.cohereResponse> {
    return API.post(`/${model}${endpoint}`, data);
  }

  public generate(model: string, config: models.generate): Promise<models.cohereResponse> {
    return this.makeRequest(model, ENDPOINT.GENERATE, config as object);
  };

  public similarity(model: string, config: models.similarity): Promise<models.cohereResponse> {
    return this.makeRequest(model, ENDPOINT.SIMILARITY, config as object);
  }

  public embed(model: string, config: models.embed): Promise<models.cohereResponse> {
    return this.makeRequest(model, ENDPOINT.EMBED, config as object);
  }

  public chooseBest(model: string, config: models.chooseBest): Promise<models.cohereResponse> {
    return this.makeRequest(model, ENDPOINT.CHOOSE_BEST, config as object);
  }

  public likelihood(model: string, config: models.likelihood): Promise<models.cohereResponse> {
    return this.makeRequest(model, ENDPOINT.LIKELIHOOD, config as object);
  }
};
const cohere = new Cohere();
export = cohere;