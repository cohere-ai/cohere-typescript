import { describe, expect, test } from "vitest";
import { StreamedChatResponse } from "api";
import { CohereClient } from "../index";

const cohere = new CohereClient({
    token: process.env.COHERE_API_KEY!,
    clientName: "typescript-e2e",
});

describe("test sdk", () => {
    test.concurrent("generate works", async () => {
        const generate = await cohere.generate({
            prompt: "Please explain to me how LLMs work",
            temperature: 0,
        });
    });

    test.concurrent("generate stream works", async () => {
        const generate = await cohere.generateStream({
            prompt: "Please explain to me how LLMs work",
            temperature: 0,
        });

        const chunks = [];

        for await (const chunk of generate) {
            chunks.push(chunk);
        }

        expect(chunks[0].eventType).toEqual("text-generation");
        expect(chunks[1].eventType).toEqual("text-generation");
        expect(chunks[chunks.length - 1].eventType).toEqual("stream-end");
    });

    test.concurrent("embed works", async () => {
        const embed = await cohere.embed({
            texts: ["hello", "goodbye"],
            model: "small",
        });
    });

    test.concurrent("chat works", async () => {
        const chat = await cohere.chat({
            chatHistory: [
                { role: "USER", message: "Who discovered gravity?" },
                {
                    role: "CHATBOT",
                    message: "The man who is widely credited with discovering gravity is Sir Isaac Newton",
                },
            ],
            message: "What year was he born?",
            temperature: 0,
        });
    });

    test.concurrent("chat stream works", async () => {
        const chat = await cohere.chatStream({
            chatHistory: [
                { role: "USER", message: "Who discovered gravity?" },
                {
                    role: "CHATBOT",
                    message: "The man who is widely credited with discovering gravity is Sir Isaac Newton",
                },
            ],
            message: "What year was he born?",
            temperature: 0,
        });

        const chunks = [];

        for await (const chunk of chat) {
            chunks.push(chunk);
        }

        expect(chunks[0].eventType).toEqual("stream-start");
        expect(chunks[chunks.length - 1].eventType).toEqual("stream-end");
    });

    // this test hasn't yet been fixed
    test.skip("check that no emojis get chopped up", async () => {
        const chat = await cohere.chatStream({
            model: "command-a-03-2025",
            message: "generate 2000 emojis",
        });

        let finalChunk: StreamedChatResponse;

        for await (const chunk of chat) {
            finalChunk = chunk;
        }

        expect(finalChunk!.eventType).toMatchInlineSnapshot(`"stream-end"`);

        if (finalChunk!.eventType === "stream-end") {
            expect(finalChunk!.response.text).not.toContain("�");
        }
    });

    test.concurrent("tokenize works", async () => {
        const tokenize = await cohere.tokenize({
            text: "tokenize me! :D",
            model: "command-a-03-2025",
        });
    });

    test.concurrent("detokenize works", async () => {
        const detokenize = await cohere.detokenize({
            tokens: [10104, 12221, 1315, 34, 1420, 69],
            model: "command-a-03-2025",
        });
    });

    test.concurrent("rerank works", async () => {
        const rerank = await cohere.rerank({
            documents: [
                { text: "Carson City is the capital city of the American state of Nevada." },
                {
                    text: "The Commonwealth of the Northern Mariana Islands is a group of islands in the Pacific Ocean. Its capital is Saipan.",
                },
                {
                    text: "Washington, D.C. (also known as simply Washington or D.C., and officially as the District of Columbia) is the capital of the United States. It is a federal district.",
                },
                {
                    text: "Capital punishment (the death penalty) has existed in the United States since beforethe United States was a country. As of 2017, capital punishment is legal in 30 of the 50 states.",
                },
            ],
            query: "What is the capital of the United States?",
            topN: 3,
        });
    });

    test.concurrent("tool use works", async () => {
        const tools = [
            {
                name: "sales_database",
                description: "Connects to a database about sales volumes",
                parameterDefinitions: {
                    day: {
                        description: "Retrieves sales data from this day, formatted as YYYY-MM-DD.",
                        type: "str",
                        required: true,
                    },
                },
            },
        ];

        const toolsResponse = await cohere.chat({
            message: "How good were the sales on September 29?",
            tools,
            preamble: `
              ## Task Description
              You help people answer their questions and other requests interactively. You will be asked a very wide array of requests on all kinds of topics. You will be equipped with a wide range of search engines or similar tools to help you, which you use to research your answer. You should focus on serving the user's needs as best you can, which will be wide-ranging.
              
              ## Style Guide
              Unless the user asks for a different style of answer, you should answer in full sentences, using proper grammar and spelling.
            `,
        });

        expect(toolsResponse.toolCalls?.[0].name).toEqual("sales_database");
        expect(toolsResponse.toolCalls?.[0].parameters).toEqual({
            day: "2023-09-29",
        });

        const localTools: Record<
            string,
            (day: string) => {
                numberOfSales: number;
                totalRevenue: number;
                averageSaleValue: number;
                date: string;
            }
        > = {
            sales_database: (day: string) => ({
                numberOfSales: 120,
                totalRevenue: 48500,
                averageSaleValue: 404.17,
                date: "2023-09-29",
            }),
        };

        const toolResults = toolsResponse.toolCalls?.map((toolCall) => {
            return {
                call: toolCall,
                outputs: [localTools[toolCall.name](toolCall.parameters.day as string)],
            };
        });

        const citedResponse = await cohere.chat({
            message: "How good were the sales on September 29?",
            tools,
            toolResults: toolResults,
            model: "command-nightly",
            forceSingleStep: true,
        });

        expect(citedResponse.documents).toEqual(
            [
                {
                    averageSaleValue: "404.17",
                    date: "2023-09-29",
                    id: "sales_database:0:0",
                    numberOfSales: "120",
                    totalRevenue: "48500",
                },
            ]
        );
    });
});
