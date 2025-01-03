/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../index";
import * as Cohere from "../../api/index";
import * as core from "../../core";
import { ChatToolCallDeltaEventDeltaMessageToolCallsFunction } from "./ChatToolCallDeltaEventDeltaMessageToolCallsFunction";

export const ChatToolCallDeltaEventDeltaMessageToolCalls: core.serialization.ObjectSchema<
    serializers.ChatToolCallDeltaEventDeltaMessageToolCalls.Raw,
    Cohere.ChatToolCallDeltaEventDeltaMessageToolCalls
> = core.serialization.object({
    function: ChatToolCallDeltaEventDeltaMessageToolCallsFunction.optional(),
});

export declare namespace ChatToolCallDeltaEventDeltaMessageToolCalls {
    interface Raw {
        function?: ChatToolCallDeltaEventDeltaMessageToolCallsFunction.Raw | null;
    }
}
