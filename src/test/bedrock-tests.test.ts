import { describe, expect, test } from "@jest/globals";
import { BedrockClient } from "../BedrockClient";

const cohere = new BedrockClient({
    clientName: "typescript-e2e",
    awsRegion: "us-east-1",
});

describe("test sdk", () => {
    test.concurrent("generate works", async () => {
        const generate = await cohere.generate({
            prompt: "Please explain to me how LLMs work",
            temperature: 0,
            model: "cohere.command-text-v14"
        });

        expect(generate.generations[0].text).toBeDefined();
    });

    test.concurrent("generate stream works", async () => {
        const generate = await cohere.generateStream({
            prompt: "Please explain to me how LLMs work",
            temperature: 0,
            model: "cohere.command-text-v14"
        });

        const chunks = [];

        for await (const chunk of generate) {
            chunks.push(chunk);
        }

        expect(chunks[0].eventType).toMatchInlineSnapshot(`"stream-start"`);
        expect(chunks[1].eventType).toMatchInlineSnapshot(`"text-generation"`);
        expect(chunks[chunks.length - 1].eventType).toMatchInlineSnapshot(`"stream-end"`);
    });

    test.concurrent("embed works", async () => {
        const embed = await cohere.embed({
            texts: ["hello", "goodbye"],
            model: "cohere.embed-multilingual-v3",
            inputType: "search_document",
        });

        if (embed.responseType === "embeddings_by_type") {
            expect(embed.embeddings?.float?.[0]).toBeDefined();
        }
    });

    test.concurrent("chat works", async () => {
        const chat = await cohere.chat({
            model: "cohere.command-r-plus-v1:0",
            message: "send me a short message",
            temperature: 0,
        });
    });

    test.concurrent("chat stream works", async () => {
        const chat = await cohere.chatStream({
            model: "cohere.command-r-plus-v1:0",
            message: "send me a short message",
            temperature: 0,
        });

        const chunks = [];

        for await (const chunk of chat) {
            chunks.push(chunk);
        }

        expect(chunks[0].eventType).toMatchInlineSnapshot(`"stream-start"`);
        expect(chunks[chunks.length - 1].eventType).toMatchInlineSnapshot(`"stream-end"`);
    });
});
