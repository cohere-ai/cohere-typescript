/**
 * This file was auto-generated by Fern from our API Definition.
 */

/**
 * Defaults to `"accurate"`.
 * Dictates the approach taken to generating citations as part of the RAG flow by allowing the user to specify whether they want `"accurate"` results or `"fast"` results.
 *
 */
export type ChatRequestCitationQuality = "fast" | "accurate";

export const ChatRequestCitationQuality = {
    Fast: "fast",
    Accurate: "accurate",
} as const;
