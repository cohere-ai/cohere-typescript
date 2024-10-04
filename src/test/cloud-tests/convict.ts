import convict from "convict";

const testables= ["chat","embed","rerank","chat-2","rerank-2","embed-2"]

var config = convict({
    baseUrl: {
        doc: "The base url of the API eg https://api.cohere.com",
        format: String,
        default: "https://api.cohere.com",
        env: "BASE_URL",
        arg: "baseUrl"
    },
    apiKey: {
        doc: "The API key",
        format: String,
        default: "none",
        env: "CO_API_KEY",
        arg: "apiKey"
    },
    featuresToTest: {
        doc: `The features to test, can  be any of ${testables.join(", ")}`,
        format: Array,
        default: [],
        env: "FEATURES_TO_TEST",
        arg: "featuresToTest"
    }
});

// Perform validation
config.validate({ allowed: 'strict' });
export { config };

