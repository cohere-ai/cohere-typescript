import { CohereClient, CohereClientV2 } from "../../src";

function stubFetch(): { fetch: typeof fetch; headers: () => Headers } {
    let captured: Headers = new Headers();
    const fetchStub = (async (_input: unknown, init?: RequestInit) => {
        captured = new Headers(init?.headers as HeadersInit);
        return new Response(JSON.stringify({ id: "1", message: { role: "assistant" }, finish_reason: "COMPLETE" }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    }) as unknown as typeof fetch;
    return { fetch: fetchStub, headers: () => captured };
}

describe("optional auth", () => {
    beforeEach(() => {
        delete process.env.CO_API_KEY;
    });

    it("omits the Authorization header when the token is empty", async () => {
        const stub = stubFetch();
        const client = new CohereClient({ token: "", fetch: stub.fetch });
        await client.v2.chat({ model: "command", messages: [] });
        expect(stub.headers().has("Authorization")).toBe(false);
    });

    it("omits the Authorization header when the token is empty on the v2 client", async () => {
        const stub = stubFetch();
        const client = new CohereClientV2({ token: "", fetch: stub.fetch });
        await client.chat({ model: "command", messages: [] });
        expect(stub.headers().has("Authorization")).toBe(false);
    });

    it("still sends the Authorization header when a token is provided", async () => {
        const stub = stubFetch();
        const client = new CohereClient({ token: "test-token", fetch: stub.fetch });
        await client.v2.chat({ model: "command", messages: [] });
        expect(stub.headers().get("Authorization")).toBe("Bearer test-token");
    });

    it("invokes a token supplier exactly once per request", async () => {
        let calls = 0;
        const stub = stubFetch();
        const client = new CohereClient({
            token: async () => {
                calls += 1;
                return "test-token";
            },
            fetch: stub.fetch,
        });
        await client.v2.chat({ model: "command", messages: [] });
        expect(stub.headers().get("Authorization")).toBe("Bearer test-token");
        expect(calls).toBe(1);
    });

    it("does not re-read a token supplier after the empty check passes", async () => {
        // A supplier whose value changes between calls must not be able to turn a valid token into
        // an empty `Bearer ` header.
        const values = ["real-token", ""];
        const stub = stubFetch();
        const client = new CohereClient({ token: async () => values.shift() ?? "", fetch: stub.fetch });
        await client.v2.chat({ model: "command", messages: [] });
        expect(stub.headers().get("Authorization")).toBe("Bearer real-token");
    });

    it("falls back to CO_API_KEY when no token is provided", async () => {
        process.env.CO_API_KEY = "env-token";
        const stub = stubFetch();
        const client = new CohereClient({ fetch: stub.fetch });
        await client.v2.chat({ model: "command", messages: [] });
        expect(stub.headers().get("Authorization")).toBe("Bearer env-token");
    });
});
