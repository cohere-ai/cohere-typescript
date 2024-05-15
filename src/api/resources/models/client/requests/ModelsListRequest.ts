/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Cohere from "../../../../index";

/**
 * @example
 *     {}
 */
export interface ModelsListRequest {
    /**
     * Maximum number of models to include in a page
     * Defaults to `20`, min value of `1`, max value of `1000`.
     */
    pageSize?: number;
    /**
     * Page token provided in the `next_page_token` field of a previous response.
     */
    pageToken?: string;
    /**
     * When provided, filters the list of models to only those that are compatible with the specified endpoint.
     */
    endpoint?: Cohere.CompatibleEndpoint;
    /**
     * When provided, filters the list of models to only the default model to the endpoint. This parameter is only valid when `endpoint` is provided.
     */
    defaultOnly?: boolean;
}
