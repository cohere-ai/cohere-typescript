/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Cohere from "../index";

/**
 * A content block which contains information about the content of a tool result
 */
export type ToolContent = Cohere.ToolContent.Text | Cohere.ToolContent.Document;

export declare namespace ToolContent {
    interface Text extends Cohere.TextContent {
        type: "text";
    }

    interface Document extends Cohere.DocumentContent {
        type: "document";
    }
}
