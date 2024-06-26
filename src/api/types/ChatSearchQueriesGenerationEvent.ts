/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Cohere from "../index";

export interface ChatSearchQueriesGenerationEvent extends Cohere.ChatStreamEvent {
    /** Generated search queries, meant to be used as part of the RAG flow. */
    searchQueries: Cohere.ChatSearchQuery[];
}
