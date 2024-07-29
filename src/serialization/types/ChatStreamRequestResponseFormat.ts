/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../index";
import * as Cohere from "../../api/index";
import * as core from "../../core";
import { ChatStreamRequestResponseFormatType } from "./ChatStreamRequestResponseFormatType";

export const ChatStreamRequestResponseFormat: core.serialization.ObjectSchema<
    serializers.ChatStreamRequestResponseFormat.Raw,
    Cohere.ChatStreamRequestResponseFormat
> = core.serialization.object({
    type: ChatStreamRequestResponseFormatType,
    schema: core.serialization.record(core.serialization.string(), core.serialization.unknown()).optional(),
});

export declare namespace ChatStreamRequestResponseFormat {
    interface Raw {
        type: ChatStreamRequestResponseFormatType.Raw;
        schema?: Record<string, unknown> | null;
    }
}