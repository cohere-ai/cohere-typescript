import { CohereClient } from "../../index";
import { config } from "./convict";

export const skipIf = (condition: boolean) => {
    return condition ? describe.skip : describe;
}

export const skipIfTestTypeIsnt = (testType: string) => {
    const featuresToTest = config.get("featuresToTest") as string[];
    const shouldSkip = !featuresToTest.includes(testType);

    return shouldSkip ? describe.skip : describe;
}

export const cohere = new CohereClient({
    token: config.get('apiKey'),
    environment: config.get('baseUrl'),
    clientName: "typescript-e2e",
});
