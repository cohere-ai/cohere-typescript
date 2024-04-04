/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Cohere from "..";

export interface ListModelsResponse {
    models: Cohere.GetModelResponse[];
    /** A token to retrieve the next page of results. Provide in the page_token parameter of the next request. */
    nextPageToken?: string;
}
