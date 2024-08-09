/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as Cohere from "../../../../api/index";
import * as core from "../../../../core";
import { ChatToolCallStartEventDeltaToolCall } from "./ChatToolCallStartEventDeltaToolCall";

export const ChatToolCallStartEventDelta: core.serialization.ObjectSchema<
    serializers.ChatToolCallStartEventDelta.Raw,
    Cohere.ChatToolCallStartEventDelta
> = core.serialization.object({
    toolCall: core.serialization.property("tool_call", ChatToolCallStartEventDeltaToolCall.optional()),
});

export declare namespace ChatToolCallStartEventDelta {
    interface Raw {
        tool_call?: ChatToolCallStartEventDeltaToolCall.Raw | null;
    }
}
