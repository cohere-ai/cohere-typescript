/**
 * This file was auto-generated by Fern from our API Definition.
 */

/**
 * The possible combinations of LoRA modules to target.
 *
 *  - LORA_TARGET_MODULES_UNSPECIFIED: Unspecified LoRA target modules.
 *  - LORA_TARGET_MODULES_QV: LoRA adapts the query and value matrices in transformer attention layers.
 *  - LORA_TARGET_MODULES_QKVO: LoRA adapts query, key, value, and output matrices in attention layers.
 *  - LORA_TARGET_MODULES_QKVO_FFN: LoRA adapts attention projection matrices and feed-forward networks (FFN).
 */
export type LoraTargetModules =
    | "LORA_TARGET_MODULES_UNSPECIFIED"
    | "LORA_TARGET_MODULES_QV"
    | "LORA_TARGET_MODULES_QKVO"
    | "LORA_TARGET_MODULES_QKVO_FFN";
export const LoraTargetModules = {
    LoraTargetModulesUnspecified: "LORA_TARGET_MODULES_UNSPECIFIED",
    LoraTargetModulesQv: "LORA_TARGET_MODULES_QV",
    LoraTargetModulesQkvo: "LORA_TARGET_MODULES_QKVO",
    LoraTargetModulesQkvoFfn: "LORA_TARGET_MODULES_QKVO_FFN",
} as const;
