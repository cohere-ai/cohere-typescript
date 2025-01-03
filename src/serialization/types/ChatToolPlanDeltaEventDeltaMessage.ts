/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../index";
import * as Cohere from "../../api/index";
import * as core from "../../core";

export const ChatToolPlanDeltaEventDeltaMessage: core.serialization.ObjectSchema<
    serializers.ChatToolPlanDeltaEventDeltaMessage.Raw,
    Cohere.ChatToolPlanDeltaEventDeltaMessage
> = core.serialization.object({
    toolPlan: core.serialization.property("tool_plan", core.serialization.string().optional()),
});

export declare namespace ChatToolPlanDeltaEventDeltaMessage {
    interface Raw {
        tool_plan?: string | null;
    }
}
