/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as Cohere from "../../../../api/index";
import * as core from "../../../../core";
import { ToolCall2Function } from "./ToolCall2Function";

export const ToolCall2: core.serialization.ObjectSchema<serializers.ToolCall2.Raw, Cohere.ToolCall2> =
    core.serialization.object({
        id: core.serialization.string().optional(),
        type: core.serialization.stringLiteral("function").optional(),
        function: ToolCall2Function.optional(),
    });

export declare namespace ToolCall2 {
    interface Raw {
        id?: string | null;
        type?: "function" | null;
        function?: ToolCall2Function.Raw | null;
    }
}