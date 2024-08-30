/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Cohere from "../index";

/**
 * Configuration for forcing the model output to adhere to the specified format. Supported on [Command R](https://docs.cohere.com/docs/command-r), [Command R+](https://docs.cohere.com/docs/command-r-plus) and newer models.
 *
 * The model can be forced into outputting JSON objects (with up to 5 levels of nesting) by setting `{ "type": "json_object" }`.
 *
 * A [JSON Schema](https://json-schema.org/) can optionally be provided, to ensure a specific structure.
 *
 * **Note**: When using `{ "type": "json_object" }` your `message` should always explicitly instruct the model to generate a JSON (eg: _"Generate a JSON ..."_) . Otherwise the model may end up getting stuck generating an infinite stream of characters and eventually run out of context length.
 * **Limitation**: The parameter is not supported in RAG mode (when any of `connectors`, `documents`, `tools`, `tool_results` are provided).
 */
export type ResponseFormat2 = Cohere.ResponseFormat2.Text | Cohere.ResponseFormat2.JsonObject;

export declare namespace ResponseFormat2 {
    interface Text extends Cohere.TextResponseFormat {
        type: "text";
    }

    interface JsonObject extends Cohere.JsonResponseFormat2 {
        type: "json_object";
    }
}
