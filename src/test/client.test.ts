import { describe, test, expect } from "vitest";
import { CohereClient } from "../index";

describe("v1 back compat", () => {
    test.each([
        "https://api.cohere.com/",
        "https://api.cohere.com/v1",
        "https://api.cohere.com/v1/",
        "https://api.cohere.com/v1//",
        "https://api.cohere.com/v2",
    ])("%s", async (environment) => {
        let url = ""

        const cohere = new CohereClient({
            token: "token",
            environment,
            fetcher: (async (opts) => {
                url = opts.url
                throw "we're done"
            })
        })

        try {
            await cohere.chat({ message: "hello" })
        } catch { }

        expect(url).toMatchSnapshot()
    })
});
