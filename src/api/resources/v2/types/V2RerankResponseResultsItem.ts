/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Cohere from "../../../index";

export interface V2RerankResponseResultsItem {
    /** If `return_documents` is set as `false` this will return none, if `true` it will return the documents passed in */
    document?: Cohere.V2RerankResponseResultsItemDocument;
    /** Corresponds to the index in the original list of documents to which the ranked document belongs. (i.e. if the first value in the `results` object has an `index` value of 3, it means in the list of documents passed in, the document at `index=3` had the highest relevance) */
    index: number;
    /** Relevance scores are normalized to be in the range `[0, 1]`. Scores close to `1` indicate a high relevance to the query, and scores closer to `0` indicate low relevance. It is not accurate to assume a score of 0.9 means the document is 2x more relevant than a document with a score of 0.45 */
    relevanceScore: number;
}