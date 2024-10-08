/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Cohere from "../index";

/**
 * A streamed event which signifies a citation has been created.
 */
export interface CitationStartEvent extends Cohere.ChatStreamEventType {
    index?: number;
    delta?: Cohere.CitationStartEventDelta;
}
