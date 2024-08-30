/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as Cohere from "../../../../api/index";
import * as core from "../../../../core";
import { ToolCall2 } from "./ToolCall2";
import { AssistantMessageContent } from "./AssistantMessageContent";
import { Citation } from "./Citation";

export const AssistantMessage: core.serialization.ObjectSchema<
    serializers.AssistantMessage.Raw,
    Cohere.AssistantMessage
> = core.serialization.object({
    toolCalls: core.serialization.property("tool_calls", core.serialization.list(ToolCall2).optional()),
    toolPlan: core.serialization.property("tool_plan", core.serialization.string().optional()),
    content: AssistantMessageContent.optional(),
    citations: core.serialization.list(Citation).optional(),
});

export declare namespace AssistantMessage {
    interface Raw {
        tool_calls?: ToolCall2.Raw[] | null;
        tool_plan?: string | null;
        content?: AssistantMessageContent.Raw | null;
        citations?: Citation.Raw[] | null;
    }
}
