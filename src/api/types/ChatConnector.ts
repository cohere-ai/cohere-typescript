/**
 * This file was auto-generated by Fern from our API Definition.
 */

/**
 * The connector used for fetching documents.
 */
export interface ChatConnector {
    /** The identifier of the connector. */
    id: string;
    /** When specified, this user access token will be passed to the connector in the Authorization header instead of the Cohere generated one. */
    userAccessToken?: string;
    /**
     * Defaults to `false`.
     *
     * When `true`, the request will continue if this connector returned an error.
     */
    continueOnFailure?: boolean;
    /**
     * Provides the connector with different settings at request time. The key/value pairs of this object are specific to each connector.
     *
     * For example, the connector `web-search` supports the `site` option, which limits search results to the specified domain.
     */
    options?: Record<string, unknown>;
}
