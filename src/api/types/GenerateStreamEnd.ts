/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Cohere from "..";

export interface GenerateStreamEnd extends Cohere.GenerateStreamEvent {
    isFinished: boolean;
    finishReason?: Cohere.FinishReason;
    response: Cohere.GenerateStreamEndResponse;
}