/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../../index";
import * as Cohere from "../../../../../../api/index";
import * as core from "../../../../../../core";

export const LoraTargetModules: core.serialization.Schema<
    serializers.finetuning.LoraTargetModules.Raw,
    Cohere.finetuning.LoraTargetModules
> = core.serialization.enum_([
    "LORA_TARGET_MODULES_UNSPECIFIED",
    "LORA_TARGET_MODULES_QV",
    "LORA_TARGET_MODULES_QKVO",
    "LORA_TARGET_MODULES_QKVO_FFN",
]);

export declare namespace LoraTargetModules {
    type Raw =
        | "LORA_TARGET_MODULES_UNSPECIFIED"
        | "LORA_TARGET_MODULES_QV"
        | "LORA_TARGET_MODULES_QKVO"
        | "LORA_TARGET_MODULES_QKVO_FFN";
}