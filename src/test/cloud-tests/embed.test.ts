import { test } from "@jest/globals";
import { cohere, skipIfTestTypeIsnt } from "./utils";

skipIfTestTypeIsnt("embed")("embed", () => {
    test.concurrent("works", async () => {
        const embed = await cohere.embed({
            texts: ["hello", "goodbye"],
            model: "embed-english-v3.0",
            inputType: "search_document",
        });

        expect(embed.embeddings).toBeDefined();
    });
});
