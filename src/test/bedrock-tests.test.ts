import { describe, expect, test } from "@jest/globals";
import { BedrockClient } from "BedrockClient";
import { SagemakerClient } from "SagemakerClient";
import { AwsEndpoint, AwsPlatform } from "aws-utils";
import { AwsClient } from "../AwsClient";

let cohere: AwsClient;

const config = {
    awsRegion: "us-east-1",
    awsAccessKey: "...",
    awsSecretKey: "...",
    awsSessionToken: "...",
};

const models: Record<AwsPlatform, Record<AwsEndpoint, string>> = {
    bedrock: {
        generate: "cohere.command-text-v14",
        embed: "cohere.embed-multilingual-v3",
        chat: "cohere.command-r-plus-v1:0",
    },
    sagemaker: {
        generate: "cohere-command-light",
        embed: "cohere-embed-multilingual-v3",
        chat: "cohere-command-plus",
    },
};


// skip until we have the right auth in ci
describe.each<AwsPlatform>(["bedrock"])(
    "test sdk",
    (platform) => {
        cohere = {
            "bedrock": new BedrockClient(config),
            "sagemaker": new SagemakerClient(config)
        }[platform]!;

        test.skip("generate works", async () => {
            const generate = await cohere.generate({
                prompt: "Please explain to me how LLMs work",
                temperature: 0,
                model: models[platform].generate,
            });

            expect(generate.generations[0].text).toBeDefined();
        });

        test.skip("generate stream works", async () => {
            const generate = await cohere.generateStream({
                prompt: "Please explain to me how LLMs work",
                temperature: 0,
                model: models[platform].generate,
            });

            const chunks = [];

            for await (const chunk of generate) {
                chunks.push(chunk);
            }

            expect(chunks[0].eventType).toMatchInlineSnapshot(`"stream-start"`);
            expect(chunks[1].eventType).toMatchInlineSnapshot(`"text-generation"`);
            expect(chunks[chunks.length - 1].eventType).toMatchInlineSnapshot(`"stream-end"`);
        });

        test.skip("embed works", async () => {
            const embed = await cohere.embed({
                texts: ["hello", "goodbye"],
                model: models[platform].embed,
                inputType: "search_document",
            });

            if (embed.responseType === "embeddings_by_type") {
                expect(embed.embeddings?.float?.[0]).toBeDefined();
            }
        });

        test.skip("chat works", async () => {
            const chat = await cohere.chat({
                model: models[platform].chat,
                message: "send me a short message",
                temperature: 0,
            });
        });

        test.skip("chat stream works", async () => {
            const chat = await cohere.chatStream({
                model: models[platform].chat,
                message: "send me a short message",
                temperature: 0,
            });

            const chunks = [];

            for await (const chunk of chat) {
                chunks.push(chunk);
            }

            expect(chunks[0].eventType).toMatchInlineSnapshot(`"text-generation"`);
            expect(chunks[chunks.length - 1].eventType).toMatchInlineSnapshot(`"stream-end"`);
        });
    },
    5000
);
