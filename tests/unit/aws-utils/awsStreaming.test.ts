import { createRequire } from "node:module";
import { describe, expect, it, vi } from "vitest";

/**
 * The AWS signing packages are optional peer dependencies, so this suite only
 * runs where they are installed.
 */
const hasAwsPeerDeps = (() => {
    const require = createRequire(import.meta.url);
    try {
        for (const dep of [
            "@aws-crypto/sha256-js",
            "@aws-sdk/credential-providers",
            "@smithy/protocol-http",
            "@smithy/signature-v4",
        ]) {
            require.resolve(dep);
        }
        return true;
    } catch {
        return false;
    }
})();

const fakeFetcher = vi.fn();
vi.mock("../../../src/core", async (importOriginal) => {
    const actual = (await importOriginal()) as Record<string, unknown>;
    return { ...actual, fetcher: (...args: unknown[]) => fakeFetcher(...args) };
});

const UPSTREAM_PAUSE_MS = 2000;

/** One Bedrock event-stream frame, in the shape parseAWSEvent expects. */
function bedrockFrame(text: string, isFinished: boolean): Uint8Array {
    const payload = Buffer.from(
        JSON.stringify({ event_type: "text-generation", text, is_finished: isFinished }),
    ).toString("base64");
    return Buffer.from(`:event-typeevent{"bytes":"${payload}"}\n`);
}

/** Emits one frame, pauses mid-response, then emits the last frame. */
function pausingBedrockStream() {
    return {
        async *[Symbol.asyncIterator]() {
            yield bedrockFrame("hello", false);
            await new Promise((resolve) => setTimeout(resolve, UPSTREAM_PAUSE_MS));
            yield bedrockFrame("world", true);
        },
    };
}

describe.skipIf(!hasAwsPeerDeps)("fetchOverride streaming", () => {
    it("delivers events as they arrive rather than buffering the whole response", async () => {
        const { fetchOverride } = await import("../../../src/aws-utils");

        fakeFetcher.mockResolvedValue({
            ok: true,
            body: pausingBedrockStream(),
            rawResponse: { headers: new Headers() },
        });

        const startedAt = Date.now();
        const response: any = await fetchOverride("bedrock", {
            awsRegion: "us-east-1",
            awsAccessKey: "AKIAIOSFODNN7EXAMPLE",
            awsSecretKey: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
        })({
            url: "https://api.cohere.com/v1/chat",
            method: "POST",
            headers: {},
            body: { model: "command-r", stream: true },
        } as any);

        let firstChunkAt = -1;
        const received: string[] = [];
        for await (const chunk of response.body) {
            if (firstChunkAt < 0) {
                firstChunkAt = Date.now() - startedAt;
            }
            received.push(chunk.toString());
        }

        // The first event must be readable long before the upstream stream ends.
        expect(firstChunkAt).toBeLessThan(UPSTREAM_PAUSE_MS);
        // ...and no events may be lost in the process.
        expect(received.join("")).toContain("hello");
        expect(received.join("")).toContain("world");
    }, 20000);

    it("propagates an upstream error to the returned body", async () => {
        const { fetchOverride } = await import("../../../src/aws-utils");

        fakeFetcher.mockResolvedValue({
            ok: true,
            body: {
                async *[Symbol.asyncIterator]() {
                    yield bedrockFrame("hello", false);
                    throw new Error("upstream exploded");
                },
            },
            rawResponse: { headers: new Headers() },
        });

        const response: any = await fetchOverride("bedrock", {
            awsRegion: "us-east-1",
            awsAccessKey: "AKIAIOSFODNN7EXAMPLE",
            awsSecretKey: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
        })({
            url: "https://api.cohere.com/v1/chat",
            method: "POST",
            headers: {},
            body: { model: "command-r", stream: true },
        } as any);

        await expect(async () => {
            for await (const _chunk of response.body) {
                // drain
            }
        }).rejects.toThrow("upstream exploded");
    }, 20000);
});
