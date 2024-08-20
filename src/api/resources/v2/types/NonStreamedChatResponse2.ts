/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Cohere from "../../../index";

export interface NonStreamedChatResponse2 {
    /** Unique identifier for the generated reply. Useful for submitting feedback. */
    id: string;
    finishReason: Cohere.ChatFinishReason;
    /** The prompt that was used. Only present when `return_prompt` in the request is set to true. */
    prompt?: string;
    message?: Cohere.AssistantMessage;
    usage?: Cohere.Usage;
}