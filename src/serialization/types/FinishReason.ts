/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../index";
import * as Cohere from "../../api/index";
import * as core from "../../core";

export const FinishReason: core.serialization.Schema<serializers.FinishReason.Raw, Cohere.FinishReason> =
    core.serialization.enum_([
        "COMPLETE",
        "STOP_SEQUENCE",
        "ERROR",
        "ERROR_TOXIC",
        "ERROR_LIMIT",
        "USER_CANCEL",
        "MAX_TOKENS",
    ]);

export declare namespace FinishReason {
    type Raw = "COMPLETE" | "STOP_SEQUENCE" | "ERROR" | "ERROR_TOXIC" | "ERROR_LIMIT" | "USER_CANCEL" | "MAX_TOKENS";
}
