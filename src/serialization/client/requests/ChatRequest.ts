/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../index";
import * as Cohere from "../../../api/index";
import * as core from "../../../core";
import { Message } from "../../types/Message";
import { ChatRequestPromptTruncation } from "../../types/ChatRequestPromptTruncation";
import { ChatConnector } from "../../types/ChatConnector";
import { ChatDocument } from "../../types/ChatDocument";
import { ChatRequestCitationQuality } from "../../types/ChatRequestCitationQuality";
import { Tool } from "../../types/Tool";
import { ToolResult } from "../../types/ToolResult";
import { ChatRequestResponseFormat } from "../../types/ChatRequestResponseFormat";

export const ChatRequest: core.serialization.Schema<serializers.ChatRequest.Raw, Cohere.ChatRequest> =
    core.serialization.object({
        message: core.serialization.string(),
        model: core.serialization.string().optional(),
        preamble: core.serialization.string().optional(),
        chatHistory: core.serialization.property("chat_history", core.serialization.list(Message).optional()),
        conversationId: core.serialization.property("conversation_id", core.serialization.string().optional()),
        promptTruncation: core.serialization.property("prompt_truncation", ChatRequestPromptTruncation.optional()),
        connectors: core.serialization.list(ChatConnector).optional(),
        searchQueriesOnly: core.serialization.property("search_queries_only", core.serialization.boolean().optional()),
        documents: core.serialization.list(ChatDocument).optional(),
        citationQuality: core.serialization.property("citation_quality", ChatRequestCitationQuality.optional()),
        temperature: core.serialization.number().optional(),
        maxTokens: core.serialization.property("max_tokens", core.serialization.number().optional()),
        maxInputTokens: core.serialization.property("max_input_tokens", core.serialization.number().optional()),
        k: core.serialization.number().optional(),
        p: core.serialization.number().optional(),
        seed: core.serialization.number().optional(),
        stopSequences: core.serialization.property(
            "stop_sequences",
            core.serialization.list(core.serialization.string()).optional()
        ),
        frequencyPenalty: core.serialization.property("frequency_penalty", core.serialization.number().optional()),
        presencePenalty: core.serialization.property("presence_penalty", core.serialization.number().optional()),
        rawPrompting: core.serialization.property("raw_prompting", core.serialization.boolean().optional()),
        returnPrompt: core.serialization.property("return_prompt", core.serialization.boolean().optional()),
        tools: core.serialization.list(Tool).optional(),
        toolResults: core.serialization.property("tool_results", core.serialization.list(ToolResult).optional()),
        forceSingleStep: core.serialization.property("force_single_step", core.serialization.boolean().optional()),
        responseFormat: core.serialization.property("response_format", ChatRequestResponseFormat.optional()),
    });

export declare namespace ChatRequest {
    interface Raw {
        message: string;
        model?: string | null;
        preamble?: string | null;
        chat_history?: Message.Raw[] | null;
        conversation_id?: string | null;
        prompt_truncation?: ChatRequestPromptTruncation.Raw | null;
        connectors?: ChatConnector.Raw[] | null;
        search_queries_only?: boolean | null;
        documents?: ChatDocument.Raw[] | null;
        citation_quality?: ChatRequestCitationQuality.Raw | null;
        temperature?: number | null;
        max_tokens?: number | null;
        max_input_tokens?: number | null;
        k?: number | null;
        p?: number | null;
        seed?: number | null;
        stop_sequences?: string[] | null;
        frequency_penalty?: number | null;
        presence_penalty?: number | null;
        raw_prompting?: boolean | null;
        return_prompt?: boolean | null;
        tools?: Tool.Raw[] | null;
        tool_results?: ToolResult.Raw[] | null;
        force_single_step?: boolean | null;
        response_format?: ChatRequestResponseFormat.Raw | null;
    }
}
