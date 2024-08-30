/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../index";
import * as Cohere from "../../api/index";
import * as core from "../../core";

export const ChatStreamRequestSafetyMode: core.serialization.Schema<
    serializers.ChatStreamRequestSafetyMode.Raw,
    Cohere.ChatStreamRequestSafetyMode
> = core.serialization.enum_(["CONTEXTUAL", "STRICT", "NONE"]);

export declare namespace ChatStreamRequestSafetyMode {
    type Raw = "CONTEXTUAL" | "STRICT" | "NONE";
}
