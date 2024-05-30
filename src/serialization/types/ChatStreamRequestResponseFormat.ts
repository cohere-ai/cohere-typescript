/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../index";
import * as Cohere from "../../api/index";
import * as core from "../../core";

export const ChatStreamRequestResponseFormat: core.serialization.ObjectSchema<
    serializers.ChatStreamRequestResponseFormat.Raw,
    Cohere.ChatStreamRequestResponseFormat
> = core.serialization.object({
    type: core.serialization.stringLiteral("json_object").optional(),
    schema: core.serialization.string().optional(),
});

export declare namespace ChatStreamRequestResponseFormat {
    interface Raw {
        type?: "json_object" | null;
        schema?: string | null;
    }
}
