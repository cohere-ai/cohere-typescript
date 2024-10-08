/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../index";
import * as Cohere from "../../api/index";
import * as core from "../../core";
import { ChatContentStartEventDeltaMessage } from "./ChatContentStartEventDeltaMessage";

export const ChatContentStartEventDelta: core.serialization.ObjectSchema<
    serializers.ChatContentStartEventDelta.Raw,
    Cohere.ChatContentStartEventDelta
> = core.serialization.object({
    message: ChatContentStartEventDeltaMessage.optional(),
});

export declare namespace ChatContentStartEventDelta {
    interface Raw {
        message?: ChatContentStartEventDeltaMessage.Raw | null;
    }
}
