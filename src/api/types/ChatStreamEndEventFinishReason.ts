/**
 * This file was auto-generated by Fern from our API Definition.
 */

/**
 * - `COMPLETE` - the model sent back a finished reply
 * - `ERROR_LIMIT` - the reply was cut off because the model reached the maximum number of tokens for its context length
 * - `MAX_TOKENS` - the reply was cut off because the model reached the maximum number of tokens specified by the max_tokens parameter
 * - `ERROR` - something went wrong when generating the reply
 * - `ERROR_TOXIC` - the model generated a reply that was deemed toxic
 */
export type ChatStreamEndEventFinishReason = "COMPLETE" | "ERROR_LIMIT" | "MAX_TOKENS" | "ERROR" | "ERROR_TOXIC";
export const ChatStreamEndEventFinishReason = {
    Complete: "COMPLETE",
    ErrorLimit: "ERROR_LIMIT",
    MaxTokens: "MAX_TOKENS",
    Error: "ERROR",
    ErrorToxic: "ERROR_TOXIC",
} as const;
