/**
 * This file was auto-generated by Fern from our API Definition.
 */

/**
 * If the prompt exceeds the context length, this truncation strategy will continuously omit the oldest tool call and tool result pairs until the prompt fits. If the prompt does not fit with only the last tool call and tool result pair, an error will be returned.
 */
export interface TruncationStrategyAutoPreserveOrder {}
