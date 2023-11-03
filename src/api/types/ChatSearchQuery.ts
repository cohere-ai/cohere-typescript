/**
 * This file was auto-generated by Fern from our API Definition.
 */

/**
 * The generated search query. Contains the text of the query and a unique identifier for the query.
 *
 */
export interface ChatSearchQuery {
    /**
     * The text of the search query.
     *
     */
    text: string;
    /**
     * Unique identifier for the generated search query. Useful for submitting feedback.
     *
     */
    generationId: string;
}
