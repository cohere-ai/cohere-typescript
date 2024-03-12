/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "..";
import * as Cohere from "../../api";
import * as core from "../../core";

export const ToolParameterDefinitionsValue: core.serialization.ObjectSchema<
    serializers.ToolParameterDefinitionsValue.Raw,
    Cohere.ToolParameterDefinitionsValue
> = core.serialization.object({
    description: core.serialization.string(),
    type: core.serialization.string(),
    required: core.serialization.boolean().optional(),
});

export declare namespace ToolParameterDefinitionsValue {
    interface Raw {
        description: string;
        type: string;
        required?: boolean | null;
    }
}
