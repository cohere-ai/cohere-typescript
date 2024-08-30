/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../index";
import * as Cohere from "../../../../../api/index";
import * as core from "../../../../../core";
import { ChatMessages } from "../../types/ChatMessages";
import { Tool2 } from "../../types/Tool2";
import { V2ChatRequestCitationMode } from "../../types/V2ChatRequestCitationMode";
import { ResponseFormat2 } from "../../../../types/ResponseFormat2";
import { ChatMessage2 } from "../../types/ChatMessage2";

export const V2ChatRequest: core.serialization.Schema<serializers.V2ChatRequest.Raw, Cohere.V2ChatRequest> =
    core.serialization.object({
        model: core.serialization.string(),
        messages: ChatMessages,
        tools: core.serialization.list(Tool2).optional(),
        citationMode: core.serialization.property("citation_mode", V2ChatRequestCitationMode.optional()),
        responseFormat: core.serialization.property("response_format", ResponseFormat2.optional()),
        maxTokens: core.serialization.property("max_tokens", core.serialization.number().optional()),
        stopSequences: core.serialization.property(
            "stop_sequences",
            core.serialization.list(core.serialization.string()).optional()
        ),
        temperature: core.serialization.number().optional(),
        seed: core.serialization.number().optional(),
        frequencyPenalty: core.serialization.property("frequency_penalty", core.serialization.number().optional()),
        presencePenalty: core.serialization.property("presence_penalty", core.serialization.number().optional()),
        k: core.serialization.number().optional(),
        p: core.serialization.number().optional(),
        returnPrompt: core.serialization.property("return_prompt", core.serialization.boolean().optional()),
    });

export declare namespace V2ChatRequest {
    interface Raw {
        model: string;
        messages: ChatMessages.Raw;
        tools?: Tool2.Raw[] | null;
        citation_mode?: V2ChatRequestCitationMode.Raw | null;
        response_format?: ResponseFormat2.Raw | null;
        max_tokens?: number | null;
        stop_sequences?: string[] | null;
        temperature?: number | null;
        seed?: number | null;
        frequency_penalty?: number | null;
        presence_penalty?: number | null;
        k?: number | null;
        p?: number | null;
        return_prompt?: boolean | null;
    }
}
