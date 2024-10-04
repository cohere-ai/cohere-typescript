import { expect, test } from "@jest/globals";
import { cohere, skipIfTestTypeIsnt } from "./utils";

skipIfTestTypeIsnt("chat")("chat", () => {
    test.concurrent("stream works", async () => {
        const chat = await cohere.chatStream({
            message: "Hello world!",
        });

        const chunks = [];

        for await (const chunk of chat) {
            chunks.push(chunk);
        }

        expect(chunks[0].eventType).toMatchInlineSnapshot(`"stream-start"`);
        expect(chunks[1].eventType).toMatchInlineSnapshot(`"text-generation"`);
        expect(chunks[chunks.length - 1].eventType).toMatchInlineSnapshot(`"stream-end"`);
    });

    test.concurrent("works", async () => {
        const chat = await cohere.chat({
            message: "Hello world!",
        });

        expect(chat.text).toBeDefined();
    });
});
