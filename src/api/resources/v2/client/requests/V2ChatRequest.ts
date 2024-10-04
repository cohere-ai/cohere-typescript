/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Cohere from "../../../../index";

/**
 * @example
 *     {
 *         model: "model",
 *         messages: [{
 *                 role: "tool",
 *                 toolCallId: "messages"
 *             }]
 *     }
 */
export interface V2ChatRequest {
    /** The name of a compatible [Cohere model](https://docs.cohere.com/v2/docs/models) (such as command-r or command-r-plus) or the ID of a [fine-tuned](https://docs.cohere.com/v2/docs/chat-fine-tuning) model. */
    model: string;
    messages: Cohere.ChatMessages;
    /**
     * A list of available tools (functions) that the model may suggest invoking before producing a text response.
     *
     * When `tools` is passed (without `tool_results`), the `text` content in the response will be empty and the `tool_calls` field in the response will be populated with a list of tool calls that need to be made. If no calls need to be made, the `tool_calls` array will be empty.
     *
     */
    tools?: Cohere.ToolV2[];
    /**
     * A list of relevant documents that the model can cite to generate a more accurate reply. Each document is either a string or document object with content and metadata.
     *
     */
    documents?: Cohere.V2ChatRequestDocumentsItem[];
    citationOptions?: Cohere.CitationOptions;
    responseFormat?: Cohere.ResponseFormatV2;
    /**
     * Used to select the [safety instruction](https://docs.cohere.com/v2/docs/safety-modes) inserted into the prompt. Defaults to `CONTEXTUAL`.
     * When `OFF` is specified, the safety instruction will be omitted.
     *
     * Safety modes are not yet configurable in combination with `tools`, `tool_results` and `documents` parameters.
     *
     * **Note**: This parameter is only compatible with models [Command R 08-2024](https://docs.cohere.com/v2/docs/command-r#august-2024-release), [Command R+ 08-2024](https://docs.cohere.com/v2/docs/command-r-plus#august-2024-release) and newer.
     *
     */
    safetyMode?: Cohere.V2ChatRequestSafetyMode;
    /**
     * The maximum number of tokens the model will generate as part of the response.
     *
     * **Note**: Setting a low value may result in incomplete generations.
     *
     */
    maxTokens?: number;
    /**
     * A list of up to 5 strings that the model will use to stop generation. If the model generates a string that matches any of the strings in the list, it will stop generating tokens and return the generated text up to that point not including the stop sequence.
     *
     */
    stopSequences?: string[];
    /**
     * Defaults to `0.3`.
     *
     * A non-negative float that tunes the degree of randomness in generation. Lower temperatures mean less random generations, and higher temperatures mean more random generations.
     *
     * Randomness can be further maximized by increasing the  value of the `p` parameter.
     *
     */
    temperature?: number;
    /**
     * If specified, the backend will make a best effort to sample tokens
     * deterministically, such that repeated requests with the same
     * seed and parameters should return the same result. However,
     * determinism cannot be totally guaranteed.
     *
     */
    seed?: number;
    /**
     * Defaults to `0.0`, min value of `0.0`, max value of `1.0`.
     * Used to reduce repetitiveness of generated tokens. The higher the value, the stronger a penalty is applied to previously present tokens, proportional to how many times they have already appeared in the prompt or prior generation.
     *
     */
    frequencyPenalty?: number;
    /**
     * Defaults to `0.0`, min value of `0.0`, max value of `1.0`.
     * Used to reduce repetitiveness of generated tokens. Similar to `frequency_penalty`, except that this penalty is applied equally to all tokens that have already appeared, regardless of their exact frequencies.
     *
     */
    presencePenalty?: number;
    /**
     * Ensures only the top `k` most likely tokens are considered for generation at each step.
     * Defaults to `0`, min value of `0`, max value of `500`.
     *
     */
    k?: number;
    /**
     * Ensures that only the most likely tokens, with total probability mass of `p`, are considered for generation at each step. If both `k` and `p` are enabled, `p` acts after `k`.
     * Defaults to `0.75`. min value of `0.01`, max value of `0.99`.
     *
     */
    p?: number;
    /** Whether to return the prompt in the response. */
    returnPrompt?: boolean;
}
