import { expect } from "@jest/globals";
import { cohere, skipIfTestTypeIsnt } from "./utils";


skipIfTestTypeIsnt("chat-2")("chat-2", () => {
    it("chat", async () => {
        const response = await cohere.v2.chat({
            model: "command-r-plus",
            messages: [
                {
                    role: "user",
                    content: "hello world!",
                },
            ],
        });
        
        expect(response.message).toBeDefined();
    });

    it("chatStream", async () => {
        const stream = await cohere.v2.chatStream({
            model: "command-r-plus",
            messages: [
                {
                    role: "user",
                    content: "hello world!",
                },
            ],
        });

        const events = new Set<string>();

        for await (const chatEvent of stream) {
            if (chatEvent) {
                events.add(chatEvent.type);
            }
        }

        expect(events.has("message-start")).toBeTruthy();
        expect(events.has("content-start")).toBeTruthy();
        expect(events.has("content-delta")).toBeTruthy();
        expect(events.has("content-end")).toBeTruthy();
        expect(events.has("message-end")).toBeTruthy();
    });
});
