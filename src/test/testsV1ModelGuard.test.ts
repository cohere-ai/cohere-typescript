import { describe, expect, test } from "vitest";
import { CohereClient } from "../index";
import { CohereV1UnsupportedModelError, isV2OnlyModel, COHERE_V2_ONLY_MODEL_PREFIXES } from "../errors/CohereV1UnsupportedModelError";

// ---------------------------------------------------------------------------
// isV2OnlyModel unit tests
// ---------------------------------------------------------------------------
describe("isV2OnlyModel", () => {
    test("returns true for command-a-08-2025 (exact match)", () => {
        expect(isV2OnlyModel("command-a-08-2025")).toBe(true);
    });

    test("returns true for command-a-vision-07-2025", () => {
        expect(isV2OnlyModel("command-a-vision-07-2025")).toBe(true);
    });

    test("returns true regardless of casing", () => {
        expect(isV2OnlyModel("Command-A-08-2025")).toBe(true);
        expect(isV2OnlyModel("COMMAND-A-VISION-07-2025")).toBe(true);
    });

    test("returns false for legacy V1 model command-a-03-2025", () => {
        expect(isV2OnlyModel("command-a-03-2025")).toBe(false);
    });

    test("returns false for command-r models", () => {
        expect(isV2OnlyModel("command-r")).toBe(false);
        expect(isV2OnlyModel("command-r-plus")).toBe(false);
    });

    test("returns false for undefined", () => {
        expect(isV2OnlyModel(undefined)).toBe(false);
    });

    test("returns false for empty string", () => {
        expect(isV2OnlyModel("")).toBe(false);
    });

    test("COHERE_V2_ONLY_MODEL_PREFIXES is a non-empty readonly array", () => {
        expect(Array.isArray(COHERE_V2_ONLY_MODEL_PREFIXES)).toBe(true);
        expect(COHERE_V2_ONLY_MODEL_PREFIXES.length).toBeGreaterThan(0);
    });
});

// ---------------------------------------------------------------------------
// CohereV1UnsupportedModelError shape tests
// ---------------------------------------------------------------------------
describe("CohereV1UnsupportedModelError", () => {
    test("is an instance of Error", () => {
        const err = new CohereV1UnsupportedModelError("command-a-08-2025");
        expect(err).toBeInstanceOf(Error);
        expect(err).toBeInstanceOf(CohereV1UnsupportedModelError);
    });

    test("has correct name", () => {
        const err = new CohereV1UnsupportedModelError("command-a-08-2025");
        expect(err.name).toBe("CohereV1UnsupportedModelError");
    });

    test("exposes model on the error object", () => {
        const err = new CohereV1UnsupportedModelError("command-a-08-2025");
        expect(err.model).toBe("command-a-08-2025");
    });

    test("message contains model name, v2 endpoint hint and migration URL", () => {
        const err = new CohereV1UnsupportedModelError("command-a-08-2025");
        expect(err.message).toContain("command-a-08-2025");
        expect(err.message).toContain("client.v2.chat()");
        expect(err.message).toContain("https://docs.cohere.com/v2/docs/migrating-v1-to-v2");
    });

    test("v2Only flag is true", () => {
        const err = new CohereV1UnsupportedModelError("command-a-08-2025");
        expect(err.v2Only).toBe(true);
    });
});

// ---------------------------------------------------------------------------
// Integration-style guard tests (no real network call made)
// ---------------------------------------------------------------------------
describe("client.chat() V2-model guard", () => {
    // Use a dummy token — the guard fires before any network I/O
    const client = new CohereClient({ token: "test-token" });

    test("throws CohereV1UnsupportedModelError for command-a-08-2025", async () => {
        await expect(
            client.chat({ model: "command-a-08-2025", message: "hello" }),
        ).rejects.toBeInstanceOf(CohereV1UnsupportedModelError);
    });

    test("throws CohereV1UnsupportedModelError for command-a-vision-07-2025", async () => {
        await expect(
            client.chat({ model: "command-a-vision-07-2025", message: "hello" }),
        ).rejects.toBeInstanceOf(CohereV1UnsupportedModelError);
    });

    test("does NOT throw for command-a-03-2025 (V1-compatible model)", async () => {
        // We only check it does not throw our guard error — network errors are acceptable
        const promise = client.chat({ model: "command-a-03-2025", message: "hello" });
        await expect(promise).rejects.not.toBeInstanceOf(CohereV1UnsupportedModelError);
    });

    test("does NOT throw when model is undefined", async () => {
        const promise = client.chat({ message: "hello" });
        await expect(promise).rejects.not.toBeInstanceOf(CohereV1UnsupportedModelError);
    });
});

describe("client.chatStream() V2-model guard", () => {
    const client = new CohereClient({ token: "test-token" });

    test("throws CohereV1UnsupportedModelError for command-a-08-2025", async () => {
        await expect(
            client.chatStream({ model: "command-a-08-2025", message: "hello" }),
        ).rejects.toBeInstanceOf(CohereV1UnsupportedModelError);
    });

    test("does NOT throw for command-a-03-2025 (V1-compatible model)", async () => {
        const promise = client.chatStream({ model: "command-a-03-2025", message: "hello" });
        await expect(promise).rejects.not.toBeInstanceOf(CohereV1UnsupportedModelError);
    });
});
