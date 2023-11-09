/**
 * This file was auto-generated by Fern from our API Definition.
 */

/**
 * Defaults to `AUTO` when `connectors` are specified and `OFF` in all other cases.
 * Dictates how the prompt will be constructed.
 * With `prompt_truncation` set to "AUTO", some elements from `chat_history` and `documents` will be dropped in an attempt to construct a prompt that fits within the model's context length limit.
 * With `prompt_truncation` set to "OFF", no elements will be dropped. If the sum of the inputs exceeds the model's context length limit, a `TooManyTokens` error will be returned.
 *
 */
export type ChatStreamRequestPromptTruncation = "OFF" | "AUTO";

export const ChatStreamRequestPromptTruncation = {
    Off: "OFF",
    Auto: "AUTO",
} as const;
