/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Cohere from "../index";

/**
 * A streamed event delta which signifies a tool call has finished streaming.
 */
export interface ChatToolCallEndEvent extends Cohere.ChatStreamEventType {
    index?: number;
}
