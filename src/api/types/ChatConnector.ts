/**
 * This file was auto-generated by Fern from our API Definition.
 */

/**
 * The connector used for fetching documents.
 *
 */
export interface ChatConnector {
    /**
     * The identifier of the connector. Currently only 'web-search' is supported.
     *
     */
    id: string;
    /**
     * An optional override to set the token that Cohere passes to the connector in the Authorization header.
     *
     */
    userAccessToken?: string;
    /**
     * An optional override to set whether or not the request continues if this connector fails.
     *
     */
    continueOnFailure?: boolean;
    /**
     * Provides the connector with different settings at request time. The key/value pairs of this object are specific to each connector.
     *
     * The supported options are:
     *
     * **web-search**
     *
     * **site** - The web search results will be restricted to this domain (and TLD) when specified. Only a single domain is specified, and subdomains are also accepted.
     * Examples:
     * * `{"options": {"site": "cohere.com"}}` would restrict the results to all subdomains at cohere.com
     * * `{"options": {"site": "txt.cohere.com"}}` would restrict the results to `txt.cohere.com`
     *
     */
    options?: Record<string, unknown>;
}
