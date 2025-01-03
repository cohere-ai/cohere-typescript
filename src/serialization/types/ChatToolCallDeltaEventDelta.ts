/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../index";
import * as Cohere from "../../api/index";
import * as core from "../../core";
import { ChatToolCallDeltaEventDeltaMessage } from "./ChatToolCallDeltaEventDeltaMessage";

export const ChatToolCallDeltaEventDelta: core.serialization.ObjectSchema<
    serializers.ChatToolCallDeltaEventDelta.Raw,
    Cohere.ChatToolCallDeltaEventDelta
> = core.serialization.object({
    message: ChatToolCallDeltaEventDeltaMessage.optional(),
});

export declare namespace ChatToolCallDeltaEventDelta {
    interface Raw {
        message?: ChatToolCallDeltaEventDeltaMessage.Raw | null;
    }
}
