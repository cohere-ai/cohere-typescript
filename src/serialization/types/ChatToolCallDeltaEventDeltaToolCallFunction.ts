/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../index";
import * as Cohere from "../../api/index";
import * as core from "../../core";

export const ChatToolCallDeltaEventDeltaToolCallFunction: core.serialization.ObjectSchema<
    serializers.ChatToolCallDeltaEventDeltaToolCallFunction.Raw,
    Cohere.ChatToolCallDeltaEventDeltaToolCallFunction
> = core.serialization.object({
    arguments: core.serialization.string().optional(),
});

export declare namespace ChatToolCallDeltaEventDeltaToolCallFunction {
    interface Raw {
        arguments?: string | null;
    }
}
