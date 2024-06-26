/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../index";
import * as Cohere from "../../api/index";
import * as core from "../../core";

export const ToolCallDelta: core.serialization.ObjectSchema<serializers.ToolCallDelta.Raw, Cohere.ToolCallDelta> =
    core.serialization.object({
        name: core.serialization.string().optional(),
        index: core.serialization.number().optional(),
        parameters: core.serialization.string().optional(),
        text: core.serialization.string().optional(),
    });

export declare namespace ToolCallDelta {
    interface Raw {
        name?: string | null;
        index?: number | null;
        parameters?: string | null;
        text?: string | null;
    }
}
