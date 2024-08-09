/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Cohere from "../../../index";

/**
 * A streamed delta event which signifies that a new content block has started.
 */
export interface ChatContentStartEvent extends Cohere.ChatStreamEventType {
    index?: number;
    delta?: Cohere.ChatContentStartEventDelta;
}
