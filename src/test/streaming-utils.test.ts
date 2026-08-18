import { describe, expect, it } from "vitest";

import { _iterSSEMessages } from "../core/streaming-fetcher/streaming-utils";

describe("_iterSSEMessages", () => {
    it.each(["\n\n", "\r\r", "\r\n\r\n"])("emits an event when %j ends the current chunk", async (delimiter) => {
        let releaseStream: () => void = () => {};
        let markSecondRead: () => void = () => {};
        const streamReleased = new Promise<void>((resolve) => {
            releaseStream = resolve;
        });
        const secondRead = new Promise<void>((resolve) => {
            markSecondRead = resolve;
        });
        let reads = 0;
        const body = {
            async next() {
                reads++;
                if (reads === 1) {
                    return {
                        done: false,
                        value: Buffer.from(`data: {"value":1}${delimiter}`),
                    };
                }

                markSecondRead();
                await streamReleased;
                return { done: true, value: undefined };
            },
            [Symbol.asyncIterator]() {
                return this;
            },
        };
        const response = {
            ok: true,
            body,
            rawResponse: new Response(),
        } as never;
        const messages = _iterSSEMessages(response);

        const outcome = await Promise.race([
            messages.next().then((result) => ({ kind: "event" as const, result })),
            secondRead.then(() => ({ kind: "second-read" as const })),
        ]);
        releaseStream();
        await messages.return(undefined);

        expect(outcome.kind).toBe("event");
        if (outcome.kind === "event") {
            expect(outcome.result.value?.data).toBe('{"value":1}');
        }
    });
});
