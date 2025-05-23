/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Cohere from "../../index";

/**
 * @example
 *     {}
 */
export interface EmbedRequest {
    /** An array of strings for the model to embed. Maximum number of texts per call is `96`. We recommend reducing the length of each text to be under `512` tokens for optimal quality. */
    texts?: string[];
    /**
     * An array of image data URIs for the model to embed. Maximum number of images per call is `1`.
     *
     * The image must be a valid [data URI](https://developer.mozilla.org/en-US/docs/Web/URI/Schemes/data). The image must be in either `image/jpeg` or `image/png` format and has a maximum size of 5MB.
     */
    images?: string[];
    /**
     * Defaults to embed-english-v2.0
     *
     * The identifier of the model. Smaller "light" models are faster, while larger models will perform better. [Custom models](https://docs.cohere.com/docs/training-custom-models) can also be supplied with their full ID.
     *
     * Available models and corresponding embedding dimensions:
     *
     * * `embed-english-v3.0`  1024
     * * `embed-multilingual-v3.0`  1024
     * * `embed-english-light-v3.0`  384
     * * `embed-multilingual-light-v3.0`  384
     *
     * * `embed-english-v2.0`  4096
     * * `embed-english-light-v2.0`  1024
     * * `embed-multilingual-v2.0`  768
     */
    model?: string;
    inputType?: Cohere.EmbedInputType;
    /**
     * Specifies the types of embeddings you want to get back. Not required and default is None, which returns the Embed Floats response type. Can be one or more of the following types.
     *
     * * `"float"`: Use this when you want to get back the default float embeddings. Valid for all models.
     * * `"int8"`: Use this when you want to get back signed int8 embeddings. Valid for only v3 models.
     * * `"uint8"`: Use this when you want to get back unsigned int8 embeddings. Valid for only v3 models.
     * * `"binary"`: Use this when you want to get back signed binary embeddings. Valid for only v3 models.
     * * `"ubinary"`: Use this when you want to get back unsigned binary embeddings. Valid for only v3 models.
     */
    embeddingTypes?: Cohere.EmbeddingType[];
    /**
     * One of `NONE|START|END` to specify how the API will handle inputs longer than the maximum token length.
     *
     * Passing `START` will discard the start of the input. `END` will discard the end of the input. In both cases, input is discarded until the remaining input is exactly the maximum input token length for the model.
     *
     * If `NONE` is selected, when the input exceeds the maximum input token length an error will be returned.
     */
    truncate?: Cohere.EmbedRequestTruncate;
}
