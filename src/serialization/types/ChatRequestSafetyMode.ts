/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../index";
import * as Cohere from "../../api/index";
import * as core from "../../core";

export const ChatRequestSafetyMode: core.serialization.Schema<
    serializers.ChatRequestSafetyMode.Raw,
    Cohere.ChatRequestSafetyMode
> = core.serialization.enum_(["CONTEXTUAL", "STRICT", "NONE"]);

export declare namespace ChatRequestSafetyMode {
    type Raw = "CONTEXTUAL" | "STRICT" | "NONE";
}
