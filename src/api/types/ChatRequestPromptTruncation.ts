/**
 * This file was auto-generated by Fern from our API Definition.
 */

/**
 * Defaults to `AUTO` when `connectors` are specified and `OFF` in all other cases.
 *
 * Dictates how the prompt will be constructed.
 *
 * With `prompt_truncation` set to "AUTO", some elements from `chat_history` and `documents` will be dropped in an attempt to construct a prompt that fits within the model's context length limit. During this process the order of the documents and chat history will be changed and ranked by relevance.
 *
 * With `prompt_truncation` set to "AUTO_PRESERVE_ORDER", some elements from `chat_history` and `documents` will be dropped in an attempt to construct a prompt that fits within the model's context length limit. During this process the order of the documents and chat history will be preserved as they are inputted into the API.
 *
 * With `prompt_truncation` set to "OFF", no elements will be dropped. If the sum of the inputs exceeds the model's context length limit, a `TooManyTokens` error will be returned.
 *
 * Compatible Deployments:
 *
 * - AUTO: Cohere Platform Only
 * - AUTO_PRESERVE_ORDER: Azure, AWS Sagemaker/Bedrock, Private Deployments
 */
export type ChatRequestPromptTruncation = "OFF" | "AUTO" | "AUTO_PRESERVE_ORDER";
export const ChatRequestPromptTruncation = {
    Off: "OFF",
    Auto: "AUTO",
    AutoPreserveOrder: "AUTO_PRESERVE_ORDER",
} as const;
