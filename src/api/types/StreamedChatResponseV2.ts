/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Cohere from "../index";

/**
 * StreamedChatResponse is returned in streaming mode (specified with `stream=True` in the request).
 */
export type StreamedChatResponseV2 =
    | Cohere.StreamedChatResponseV2.MessageStart
    | Cohere.StreamedChatResponseV2.ContentStart
    | Cohere.StreamedChatResponseV2.ContentDelta
    | Cohere.StreamedChatResponseV2.ContentEnd
    | Cohere.StreamedChatResponseV2.ToolPlanDelta
    | Cohere.StreamedChatResponseV2.ToolCallStart
    | Cohere.StreamedChatResponseV2.ToolCallDelta
    | Cohere.StreamedChatResponseV2.ToolCallEnd
    | Cohere.StreamedChatResponseV2.CitationStart
    | Cohere.StreamedChatResponseV2.CitationEnd
    | Cohere.StreamedChatResponseV2.MessageEnd
    | Cohere.StreamedChatResponseV2.Debug;

export namespace StreamedChatResponseV2 {
    export interface MessageStart extends Cohere.ChatMessageStartEvent {
        type: "message-start";
    }

    export interface ContentStart extends Cohere.ChatContentStartEvent {
        type: "content-start";
    }

    export interface ContentDelta extends Cohere.ChatContentDeltaEvent {
        type: "content-delta";
    }

    export interface ContentEnd extends Cohere.ChatContentEndEvent {
        type: "content-end";
    }

    export interface ToolPlanDelta extends Cohere.ChatToolPlanDeltaEvent {
        type: "tool-plan-delta";
    }

    export interface ToolCallStart extends Cohere.ChatToolCallStartEvent {
        type: "tool-call-start";
    }

    export interface ToolCallDelta extends Cohere.ChatToolCallDeltaEvent {
        type: "tool-call-delta";
    }

    export interface ToolCallEnd extends Cohere.ChatToolCallEndEvent {
        type: "tool-call-end";
    }

    export interface CitationStart extends Cohere.CitationStartEvent {
        type: "citation-start";
    }

    export interface CitationEnd extends Cohere.CitationEndEvent {
        type: "citation-end";
    }

    export interface MessageEnd extends Cohere.ChatMessageEndEvent {
        type: "message-end";
    }

    export interface Debug extends Cohere.ChatDebugEvent {
        type: "debug";
    }
}
