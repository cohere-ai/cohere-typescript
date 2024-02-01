import { describe, expect, test } from "@jest/globals";
import { CohereClient } from "../Client";

const cohere = new CohereClient({
    token: process.env.COHERE_API_KEY!,
    clientName: "typescript-e2e"
});

describe("test sdk", () => {
    test.concurrent("generate works", async () => {
        const generate = await cohere.generate({
            prompt: "Please explain to me how LLMs work",
            temperature: 0,
        });
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
            connectors: [{ id: "web-search" }],
            temperature: 0,
        });
    });

    test.concurrent("classify works", async () => {
        const classify = await cohere.classify({
            examples: [
                { text: "Dermatologists don't like her!", label: "Spam" },
                { text: "'Hello, open to this?'", label: "Spam" },
                { text: "I need help please wire me $1000 right now", label: "Spam" },
                { text: "Nice to know you ;)", label: "Spam" },
                { text: "Please help me?", label: "Spam" },
                { text: "Your parcel will be delivered today", label: "Not spam" },
                { text: "Review changes to our Terms and Conditions", label: "Not spam" },
                { text: "Weekly sync notes", label: "Not spam" },
                { text: "'Re: Follow up from today's meeting'", label: "Not spam" },
                { text: "Pre-read for tomorrow", label: "Not spam" },
            ],
            inputs: ["Confirm your email address", "hey i need u to send some $"],
        });
    });

    test.concurrent("tokenize works", async () => {
        const tokenize = await cohere.tokenize({
            text: "tokenize me! :D",
            model: "command",
        });
    });

    test.concurrent("detokenize works", async () => {
        const detokenize = await cohere.detokenize({
            tokens: [10104, 12221, 1315, 34, 1420, 69],
            model: "command",
        });
    });

    test.concurrent("summarize works", async () => {
        const summarize = await cohere.summarize({
            text:
                "Ice cream is a sweetened frozen food typically eaten as a snack or dessert. " +
                "It may be made from milk or cream and is flavoured with a sweetener, " +
                "either sugar or an alternative, and a spice, such as cocoa or vanilla, " +
                "or with fruit such as strawberries or peaches. " +
                "It can also be made by whisking a flavored cream base and liquid nitrogen together. " +
                "Food coloring is sometimes added, in addition to stabilizers. " +
                "The mixture is cooled below the freezing point of water and stirred to incorporate air spaces " +
                "and to prevent detectable ice crystals from forming. The result is a smooth, " +
                "semi-solid foam that is solid at very low temperatures (below 2 °C or 35 °F). " +
                "It becomes more malleable as its temperature increases.\n\n" +
                'The meaning of the name "ice cream" varies from one country to another. ' +
                'In some countries, such as the United States, "ice cream" applies only to a specific variety, ' +
                "and most governments regulate the commercial use of the various terms according to the " +
                "relative quantities of the main ingredients, notably the amount of cream. " +
                "Products that do not meet the criteria to be called ice cream are sometimes labelled " +
                '"frozen dairy dessert" instead. In other countries, such as Italy and Argentina, ' +
                "one word is used fo\r all variants. Analogues made from dairy alternatives, " +
                "such as goat's or sheep's milk, or milk substitutes " +
                "(e.g., soy, cashew, coconut, almond milk or tofu), are available for those who are " +
                "lactose intolerant, allergic to dairy protein or vegan.",
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
});
