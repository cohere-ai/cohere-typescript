// const https = require('https');
import * as models from './models'
import API from './services/api_service'
import errors from './services/error_service'

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

  private isInvalidParameters(config: object, requiredVals: string[]): Boolean {
    for (let val of requiredVals) {
      if (!config.hasOwnProperty(val)) {
        return true;
      }
    }
    return false;
  }

  private makeRequest(model: string, endpoint: string, data: object, requiredParams: string[]): Promise<models.cohereResponse> {
    if (this.isInvalidParameters(data, requiredParams)) {
      return new Promise((resolve) => resolve(errors.specificError('PARAMETERS_MISSING_OR_INVALID', 500)));
    }
    return API.post(`/${model}${endpoint}`, data);
  }

  public generate(model: string, config: models.generate): Promise<models.cohereResponse> {
    return this.makeRequest(model, ENDPOINT.GENERATE, config, [
      'prompt',
      'max_tokens',
      'temperature',
    ]);
  };

  public similarity(model: string, config: models.similarity): Promise<models.cohereResponse> {
    return this.makeRequest(model, ENDPOINT.SIMILARITY, config, [
      'anchor',
      'targets'
    ]);
  }

  public embed(model: string, config: models.embed): Promise<models.cohereResponse> {
    return this.makeRequest(model, ENDPOINT.EMBED, config, [
      'texts'
    ]);
  }

  public chooseBest(model: string, config: models.chooseBest): Promise<models.cohereResponse> {
    return this.makeRequest(model, ENDPOINT.CHOOSE_BEST, config, [
      'query',
      'options',
      'mode'
    ]);
  }

  public likelihood(model: string, config: models.likelihood): Promise<models.cohereResponse> {
    return this.makeRequest(model, ENDPOINT.LIKELIHOOD, config, [
      'text'
    ]);
  }
};
const cohere = new Cohere();
export = cohere;