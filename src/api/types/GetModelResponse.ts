/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Cohere from "..";

/**
 * Contains information about the model and which API endpoints it can be used with.
 */
export interface GetModelResponse {
    /** Specify this name in the `model` parameter of API requests to use your chosen model. */
    name?: string;
    /** The API endpoints that the model is compatible with. */
    endpoints?: Cohere.CompatibleEndpoint[];
    /** Whether the model has been fine-tuned or not. */
    finetuned?: boolean;
    /** The maximum number of tokens that the model can process in a single request. Note that not all of these tokens are always available due to special tokens and preambles that Cohere has added by default. */
    contextLength?: number;
    /** Public URL to the tokenizer's configuration file. */
    tokenizerUrl?: string;
    /** The API endpoints that the model is default to. */
    defaultEndpoints?: Cohere.CompatibleEndpoint[];
}
