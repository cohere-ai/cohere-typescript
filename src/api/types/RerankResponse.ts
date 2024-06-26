/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Cohere from "../index";

export interface RerankResponse {
    id?: string;
    /** An ordered list of ranked documents */
    results: Cohere.RerankResponseResultsItem[];
    meta?: Cohere.ApiMeta;
}
