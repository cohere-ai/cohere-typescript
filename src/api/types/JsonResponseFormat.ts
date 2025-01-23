/**
 * This file was auto-generated by Fern from our API Definition.
 */

export interface JsonResponseFormat {
    /**
     * A JSON schema object that the output will adhere to. There are some restrictions we have on the schema, refer to [our guide](https://docs.cohere.com/docs/structured-outputs-json#schema-constraints) for more information.
     * Example (required name and age object):
     *
     * ```json
     * {
     *   "type": "object",
     *   "properties": {
     *     "name": { "type": "string" },
     *     "age": { "type": "integer" }
     *   },
     *   "required": ["name", "age"]
     * }
     * ```
     *
     * **Note**: This field must not be specified when the `type` is set to `"text"`.
     */
    schema?: Record<string, unknown>;
}
