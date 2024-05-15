/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../index";
import * as Cohere from "../../api/index";
import * as core from "../../core";

export const ChatStreamRequestPromptTruncation: core.serialization.Schema<
    serializers.ChatStreamRequestPromptTruncation.Raw,
    Cohere.ChatStreamRequestPromptTruncation
> = core.serialization.enum_(["OFF", "AUTO", "AUTO_PRESERVE_ORDER"]);

export declare namespace ChatStreamRequestPromptTruncation {
    type Raw = "OFF" | "AUTO" | "AUTO_PRESERVE_ORDER";
}
