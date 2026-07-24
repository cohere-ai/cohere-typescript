import { describe, expect, test } from "vitest";
import { CohereClient, CohereClientV2 } from "../index";

describe("v1 back compat", () => {
    test.each([
        "https://api.cohere.com/",
        "https://api.cohere.com/v1",
        "https://api.cohere.com/v1/",
        "https://api.cohere.com/v1//",
        "https://api.cohere.com/v2",
    ])("%s", async (environment) => {
        let url = "";

        const cohere = new CohereClient({
            token: "token",
            environment,
            fetcher: async (opts) => {
                url = opts.url;
                throw "we're done";
            },
        });

        try {
            await cohere.chat({ message: "hello" });
        } catch {}

        expect(url).toMatchSnapshot();
    });

    test("CohereClientV2 delegates legacy endpoints to the v1 client", async () => {
        let url = "";
        let body: unknown;

        const cohere = new CohereClientV2({
            token: "token",
            fetcher: async (opts) => {
                url = opts.url;
                body = opts.body;
                return {
                    ok: false,
                    error: {
                        reason: "status-code",
                        statusCode: 400,
                        body: { message: "stop after capturing request" },
                    },
                    rawResponse: {
                        headers: new Headers(),
                        redirected: false,
                        status: 400,
                        statusText: "Bad Request",
                        type: "basic" as ResponseType,
                        url: opts.url,
                    },
                };
            },
        });

        await expect(cohere.generate({ prompt: "hello" })).rejects.toThrow("stop after capturing request");

        expect(url).toBe("https://api.cohere.com/v1/generate");
        expect(body).toMatchObject({ prompt: "hello" });
    });
});
