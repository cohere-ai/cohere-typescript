/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Cohere from "../../../index";

export interface ChatToolCallStartEventDeltaToolCall {
    id?: string;
    type?: "function";
    function?: Cohere.ChatToolCallStartEventDeltaToolCallFunction;
}
