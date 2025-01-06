/**
 * This file was auto-generated by Fern from our API Definition.
 */

/**
 * @example
 *     {}
 */
export interface FinetuningListEventsRequest {
    /**
     * Maximum number of results to be returned by the server. If 0, defaults to
     * 50.
     */
    pageSize?: number;
    /**
     * Request a specific page of the list results.
     */
    pageToken?: string;
    /**
     * Comma separated list of fields. For example: "created_at,name". The default
     * sorting order is ascending. To specify descending order for a field, append
     * " desc" to the field name. For example: "created_at desc,name".
     *
     * Supported sorting fields:
     *   - created_at (default)
     */
    orderBy?: string;
}
