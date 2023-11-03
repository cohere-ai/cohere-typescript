/**
 * This file was auto-generated by Fern from our API Definition.
 */

export interface TokenizeRequest {
    /** The string to be tokenized, the minimum text length is 1 character, and the maximum text length is 65536 characters. */
    text: string;
    /** An optional parameter to provide the model name. This will ensure that the tokenization uses the tokenizer used by that model. */
    model?: string;
}
