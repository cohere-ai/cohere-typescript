/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Cohere from "..";

export interface ChatStreamStartEvent extends Cohere.ChatStreamEvent {
    /**
     * Unique identifier for the generated reply. Useful for submitting feedback.
     *
     */
    generationId: string;
}