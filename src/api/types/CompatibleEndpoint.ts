/**
 * This file was auto-generated by Fern from our API Definition.
 */

/**
 * One of the Cohere API endpoints that the model can be used with.
 */
export type CompatibleEndpoint = "chat" | "embed" | "classify" | "summarize" | "rerank" | "rate" | "generate";

export const CompatibleEndpoint = {
    Chat: "chat",
    Embed: "embed",
    Classify: "classify",
    Summarize: "summarize",
    Rerank: "rerank",
    Rate: "rate",
    Generate: "generate",
} as const;
