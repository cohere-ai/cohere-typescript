/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Cohere from "../index";

/**
 * Outputs from a tool. The content should formatted as a JSON object string, or a list of tool content blocks
 */
export type ToolMessageV2Content = string | Cohere.ToolContent[];
