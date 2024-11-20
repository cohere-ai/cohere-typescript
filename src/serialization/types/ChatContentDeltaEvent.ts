/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../index";
import * as Cohere from "../../api/index";
import * as core from "../../core";
import { ChatContentDeltaEventDelta } from "./ChatContentDeltaEventDelta";
import { LogprobItem } from "./LogprobItem";
import { ChatStreamEventType } from "./ChatStreamEventType";

export const ChatContentDeltaEvent: core.serialization.ObjectSchema<
    serializers.ChatContentDeltaEvent.Raw,
    Cohere.ChatContentDeltaEvent
> = core.serialization
    .object({
        index: core.serialization.number().optional(),
        delta: ChatContentDeltaEventDelta.optional(),
        logprobs: LogprobItem.optional(),
    })
    .extend(ChatStreamEventType);

export declare namespace ChatContentDeltaEvent {
    interface Raw extends ChatStreamEventType.Raw {
        index?: number | null;
        delta?: ChatContentDeltaEventDelta.Raw | null;
        logprobs?: LogprobItem.Raw | null;
    }
}
