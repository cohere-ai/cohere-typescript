/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as Cohere from "../../../../api/index";
import * as core from "../../../../core";

export const V2ChatStreamRequestResponseFormat: core.serialization.ObjectSchema<
    serializers.V2ChatStreamRequestResponseFormat.Raw,
    Cohere.V2ChatStreamRequestResponseFormat
> = core.serialization.object({
    type: core.serialization.stringLiteral("json_object").optional(),
    schema: core.serialization.record(core.serialization.string(), core.serialization.unknown()).optional(),
});

export declare namespace V2ChatStreamRequestResponseFormat {
    interface Raw {
        type?: "json_object" | null;
        schema?: Record<string, unknown> | null;
    }
}
