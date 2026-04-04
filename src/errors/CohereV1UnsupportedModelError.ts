/**
 * Thrown when a model that is only supported by the Cohere V2 API
 * (e.g. command-a-08-2025) is passed to the legacy V1 `client.chat()` or
 * `client.chatStream()` methods, which target the `/v1/chat` endpoint.
 *
 * Switch to the V2 client:
 * ```ts
 * // ❌ V1 — will throw this error for V2-only models
 * await client.chat({ model: "command-a-08-2025", message: "..." });
 *
 * // ✅ V2 — correct for reasoning / V2-only models
 * await client.v2.chat({ model: "command-a-08-2025", messages: [{ role: "user", content: "..." }] });
 * ```
 *
 * @see https://docs.cohere.com/v2/docs/migrating-v1-to-v2
 */
export class CohereV1UnsupportedModelError extends Error {
    public readonly model: string;
    public readonly v2Only: true = true;

    constructor(model: string) {
        super(
            [
                `Model "${model}" is not supported by the V1 chat endpoint (/v1/chat).`,
                `This model requires the V2 API. Please use client.v2.chat() instead:`,
                ``,
                `  // V2 API usage:`,
                `  await client.v2.chat({`,
                `    model: "${model}",`,
                `    messages: [{ role: "user", content: "<your message>" }],`,
                `  });`,
                ``,
                `Migration guide: https://docs.cohere.com/v2/docs/migrating-v1-to-v2`,
            ].join("\n"),
        );
        Object.setPrototypeOf(this, new.target.prototype);
        if ((Error as any).captureStackTrace) {
            (Error as any).captureStackTrace(this, this.constructor);
        }
        this.name = "CohereV1UnsupportedModelError";
        this.model = model;
    }
}

/**
 * Models that are exclusively supported by the V2 API (`/v2/chat`).
 * The V1 endpoint (`/v1/chat`) will reject requests using these models.
 *
 * When a new V2-only model is released, add its identifier here so that
 * `client.chat()` / `client.chatStream()` fail fast with a clear error
 * instead of an opaque API response.
 *
 * Matching uses case-insensitive prefix checks — any model whose name
 * starts with a listed prefix is considered V2-only.
 */
export const COHERE_V2_ONLY_MODEL_PREFIXES: readonly string[] = [
    // command-a-08-2025 is the first reasoning model; future quarter releases
    // of the command-a series are expected to be V2-only as well.
    "command-a-08-2025",
    "command-a-09-",
    "command-a-10-",
    "command-a-11-",
    "command-a-12-",
    // command-a-vision is a V2-only multimodal model
    "command-a-vision-",
];

/**
 * Returns `true` if the given model identifier is known to be V2-only.
 *
 * The check is deliberately conservative: only models we are certain about
 * are blocked, so unknown or custom model strings are always allowed through.
 */
export function isV2OnlyModel(model: string | undefined): model is string {
    if (!model) {
        return false;
    }
    const lower = model.toLowerCase();
    return COHERE_V2_ONLY_MODEL_PREFIXES.some((prefix) => lower.startsWith(prefix.toLowerCase()));
}
