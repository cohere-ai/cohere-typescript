import { describe, expect, test } from "@jest/globals";
import { AwsEndpoint, AwsPlatform } from "aws-utils";
import { BedrockClient, SagemakerClient } from "../";
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
        rerank: "cohere.rerank-v3-5:0",
    },
    sagemaker: {
        generate: "cohere-command-light",
        embed: "cohere-embed-multilingual-v3",
        chat: "cohere-command-plus",
        rerank: "cohere.rerank-v1",
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

        test.skip("rerank works", async () => {
            const rerank = await cohere.v2.rerank({
                model: models[platform].rerank,
                documents: [
                    "Carson City is the capital city of the American state of Nevada.",
                    "The Commonwealth of the Northern Mariana Islands is a group of islands in the Pacific Ocean. Its capital is Saipan.",
                    "Washington, D.C. d (also known as simply Washington or D.C., and officially as the District of Columbia) is the capital of the United States. It is a federal district.",
                    "Capital punishment (the death penalty) has existed in the United States since beforethe United States was a country. As of 2017, capital punishment is legal in 30 of the 50 states.",
                ],
                query: "What is the capital of the United States?",
                topN: 3,
            });

            expect(rerank.results).toBeDefined();
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
