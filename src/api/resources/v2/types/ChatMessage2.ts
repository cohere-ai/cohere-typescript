/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Cohere from "../../../index";

/**
 * Represents a single message in the chat history from a given role.
 */
export type ChatMessage2 =
    | Cohere.ChatMessage2.Assistant
    | Cohere.ChatMessage2.System
    | Cohere.ChatMessage2.User
    | Cohere.ChatMessage2.Tool;

export declare namespace ChatMessage2 {
    interface Assistant extends Cohere.AssistantMessage {
        role: "assistant";
    }

    interface System extends Cohere.SystemMessage {
        role: "system";
    }

    interface User extends Cohere.UserMessage {
        role: "user";
    }

    interface Tool extends Cohere.ToolMessage2 {
        role: "tool";
    }
}
