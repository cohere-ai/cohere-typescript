import { describe, expect, it } from "vitest";
import { _iterSSEMessages } from "../../../src/core/streaming-fetcher/streaming-utils";

/**
 * A response body that yields `chunks` and then blocks forever on the next read,
 * modelling a server that pauses after emitting each complete SSE event.
 */
function pausingBody(chunks: string[]) {
    const encoder = new TextEncoder();
    return {
        async *[Symbol.asyncIterator]() {
            for (const chunk of chunks) {
                yield encoder.encode(chunk);
            }
            await new Promise(() => {});
        },
    };
}

/** Resolves to the first event, or to "TIMEOUT" if nothing arrives in `ms`. */
async function firstEventWithin(next: Promise<unknown>, ms = 500): Promise<any> {
    return Promise.race([next, new Promise((resolve) => setTimeout(() => resolve("TIMEOUT"), ms))]);
}

describe("_iterSSEMessages", () => {
    const delimiters: Array<[string, string]> = [
        ["LF LF", "\n\n"],
        ["CRLF CRLF", "\r\n\r\n"],
        ["CR CR", "\r\r"],
    ];

    for (const [name, delimiter] of delimiters) {
        it(`emits an event whose ${name} delimiter ends the chunk, without waiting for more data`, async () => {
            const iterator = _iterSSEMessages({
                body: pausingBody([`data: {"value":1}${delimiter}`]),
            } as any);

            const result = await firstEventWithin(iterator.next());

            expect(result).not.toBe("TIMEOUT");
            expect(result.value.data).toBe('{"value":1}');
        });
    }

    it("still emits both events when they arrive in a single chunk", async () => {
        const iterator = _iterSSEMessages({
            body: pausingBody(['data: {"value":1}\n\ndata: {"value":2}\n\n']),
        } as any);

        expect((await firstEventWithin(iterator.next())).value.data).toBe('{"value":1}');
        expect((await firstEventWithin(iterator.next())).value.data).toBe('{"value":2}');
    });

    it("emits an event split across two chunks once the delimiter arrives", async () => {
        const iterator = _iterSSEMessages({
            body: pausingBody(['data: {"val', 'ue":1}\n\n']),
        } as any);

        const result = await firstEventWithin(iterator.next());

        expect(result).not.toBe("TIMEOUT");
        expect(result.value.data).toBe('{"value":1}');
    });
});
