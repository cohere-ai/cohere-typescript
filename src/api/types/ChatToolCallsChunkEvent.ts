/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Cohere from "../index";

export interface ChatToolCallsChunkEvent extends Cohere.ChatStreamEvent {
    toolCallDelta: Cohere.ToolCallDelta;
}
