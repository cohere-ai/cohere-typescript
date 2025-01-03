/**
 * This file was auto-generated by Fern from our API Definition.
 */

/**
 * Used to select the [safety instruction](https://docs.cohere.com/v2/docs/safety-modes) inserted into the prompt. Defaults to `CONTEXTUAL`.
 * When `OFF` is specified, the safety instruction will be omitted.
 *
 * Safety modes are not yet configurable in combination with `tools`, `tool_results` and `documents` parameters.
 *
 * **Note**: This parameter is only compatible with models [Command R 08-2024](https://docs.cohere.com/v2/docs/command-r#august-2024-release), [Command R+ 08-2024](https://docs.cohere.com/v2/docs/command-r-plus#august-2024-release) and newer.
 *
 * **Note**: `command-r7b-12-2024` only supports `"CONTEXTUAL"` and `"STRICT"` modes.
 */
export type V2ChatStreamRequestSafetyMode = "CONTEXTUAL" | "STRICT" | "OFF";

export const V2ChatStreamRequestSafetyMode = {
    Contextual: "CONTEXTUAL",
    Strict: "STRICT",
    Off: "OFF",
} as const;
