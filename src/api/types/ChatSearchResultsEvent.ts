/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Cohere from "..";

export interface ChatSearchResultsEvent extends Cohere.ChatStreamEvent {
    /** Conducted searches and the ids of documents retrieved from each of them. */
    searchResults?: Cohere.ChatSearchResult[];
    /** Documents fetched from searches or provided by the user. */
    documents?: Cohere.ChatDocument[];
}
