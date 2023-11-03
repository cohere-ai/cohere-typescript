/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Cohere from "../..";

export interface EmbedRequest {
    /** An array of strings for the model to embed. Maximum number of texts per call is `96`. We recommend reducing the length of each text to be under `512` tokens for optimal quality. */
    texts: string[];
    /**
     * The identifier of the model. Smaller "light" models are faster, while larger models will perform better. [Custom models](/docs/training-custom-models) can also be supplied with their full ID.
     *
     * Available models and corresponding embedding dimensions:
     * * `embed-english-v2.0` (default) 4096
     * * `embed-english-light-v2.0` 1024
     * * `embed-multilingual-v2.0` 768
     * * `embed-english-v3.0` 1024
     * * `embed-multilingual-v3.0` 1024
     * * `embed-english-light-v3.0` 384
     * * `embed-multilingual-light-v3.0` 384
     */
    model?: string;
    /**
     * One of `NONE|START|END` to specify how the API will handle inputs longer than the maximum token length.
     *
     * Passing `START` will discard the start of the input. `END` will discard the end of the input. In both cases, input is discarded until the remaining input is exactly the maximum input token length for the model.
     *
     * If `NONE` is selected, when the input exceeds the maximum input token length an error will be returned.
     */
    truncate?: Cohere.EmbedRequestTruncate;
    /**
     * Specifies the type of input you're giving to the model. Not required for older versions of the embedding models (i.e. anything lower than v3), but is required for more recent versions (i.e. anything bigger than v2).
     *
     * * `search_document` - Use this when you encode documents for embeddings that you store in a vector database for search use-cases.
     * * `search_query` - Use this when you query your vector DB to find relevant documents.
     * * `classification` - Use this when you use the embeddings as an input to a text classifier.
     * * `clustering` - Use this when you want to cluster the embeddings.
     */
    input_type?: "search_document" | "search_query" | "classification" | "clustering";
}
