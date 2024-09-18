/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Cohere from "../../../index";

export type V2EmbedRequest =
    | Cohere.V2EmbedRequest.SearchDocument
    | Cohere.V2EmbedRequest.SearchQuery
    | Cohere.V2EmbedRequest.Classification
    | Cohere.V2EmbedRequest.Clustering
    | Cohere.V2EmbedRequest.Image;

export declare namespace V2EmbedRequest {
    interface SearchDocument extends Cohere.Texts {
        inputType: "search_document";
    }

    interface SearchQuery extends Cohere.Texts {
        inputType: "search_query";
    }

    interface Classification extends Cohere.Texts {
        inputType: "classification";
    }

    interface Clustering extends Cohere.Texts {
        inputType: "clustering";
    }

    interface Image extends Cohere.Images {
        inputType: "image";
    }
}