/**
 * This file was auto-generated by Fern from our API Definition.
 */

/**
 * Used to select the [safety instruction](https://docs.cohere.com/docs/safety-modes) inserted into the prompt. Defaults to `CONTEXTUAL`.
 * When `NONE` is specified, the safety instruction will be omitted.
 *
 * Safety modes are not yet configurable in combination with `tools`, `tool_results` and `documents` parameters.
 *
 * **Note**: This parameter is only compatible with models [Command R 08-2024](https://docs.cohere.com/docs/command-r#august-2024-release), [Command R+ 08-2024](https://docs.cohere.com/docs/command-r-plus#august-2024-release) and newer.
 *
 * **Note**: `command-r7b-12-2024` only supports `"CONTEXTUAL"` and `"STRICT"` modes.
 *
 * Compatible Deployments: Cohere Platform, Azure, AWS Sagemaker/Bedrock, Private Deployments
 */
export type ChatRequestSafetyMode = "CONTEXTUAL" | "STRICT" | "NONE";
export const ChatRequestSafetyMode = {
    Contextual: "CONTEXTUAL",
    Strict: "STRICT",
    None: "NONE",
} as const;
