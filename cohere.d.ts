import * as models from './models';
interface CohereService {
    init(key: string): void;
    generate(model: string, config: models.generate): Promise<models.cohereResponse>;
    similarity(model: string, config: models.similarity): Promise<models.cohereResponse>;
    embed(model: string, config: models.embed): Promise<models.cohereResponse>;
    chooseBest(model: string, config: models.chooseBest): Promise<models.cohereResponse>;
    likelihood(model: string, config: models.likelihood): Promise<models.cohereResponse>;
}
declare class Cohere implements CohereService {
    init(key: string): void;
    private isInvalidParameters;
    private makeRequest;
    generate(model: string, config: models.generate): Promise<models.cohereResponse>;
    similarity(model: string, config: models.similarity): Promise<models.cohereResponse>;
    embed(model: string, config: models.embed): Promise<models.cohereResponse>;
    chooseBest(model: string, config: models.chooseBest): Promise<models.cohereResponse>;
    likelihood(model: string, config: models.likelihood): Promise<models.cohereResponse>;
}
declare const cohere: Cohere;
export = cohere;
