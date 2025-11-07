import { describe } from "@jest/globals";
import { CohereClientV2 } from "../ClientV2";

const cohere = new CohereClientV2({
    token: process.env.COHERE_API_KEY!,
    clientName: "typescript-e2e",
});

describe("test sdk", () => {
    it("chat", async () => {
        const response = await cohere.chat({
            model: "command-a-03-2025",
            messages: [
                {
                    role: "user",
                    content: "hello world!",
                },
            ],
        });
        console.log(response.message);
    });

    it("chatStream", async () => {
        const stream = await cohere.chatStream({
            model: "command-a-03-2025",
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
                if (chatEvent.type === "content-delta") {
                    console.log(chatEvent.delta?.message);
                }
            }
        }

        expect(events.has("message-start")).toBeTruthy();
        expect(events.has("content-start")).toBeTruthy();
        expect(events.has("content-delta")).toBeTruthy();
        expect(events.has("content-end")).toBeTruthy();
        expect(events.has("message-end")).toBeTruthy();
    });
});
