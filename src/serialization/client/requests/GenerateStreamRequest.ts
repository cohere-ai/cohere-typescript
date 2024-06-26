/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../index";
import * as Cohere from "../../../api/index";
import * as core from "../../../core";
import { GenerateStreamRequestTruncate } from "../../types/GenerateStreamRequestTruncate";
import { GenerateStreamRequestReturnLikelihoods } from "../../types/GenerateStreamRequestReturnLikelihoods";

export const GenerateStreamRequest: core.serialization.Schema<
    serializers.GenerateStreamRequest.Raw,
    Cohere.GenerateStreamRequest
> = core.serialization.object({
    prompt: core.serialization.string(),
    model: core.serialization.string().optional(),
    numGenerations: core.serialization.property("num_generations", core.serialization.number().optional()),
    maxTokens: core.serialization.property("max_tokens", core.serialization.number().optional()),
    truncate: GenerateStreamRequestTruncate.optional(),
    temperature: core.serialization.number().optional(),
    seed: core.serialization.number().optional(),
    preset: core.serialization.string().optional(),
    endSequences: core.serialization.property(
        "end_sequences",
        core.serialization.list(core.serialization.string()).optional()
    ),
    stopSequences: core.serialization.property(
        "stop_sequences",
        core.serialization.list(core.serialization.string()).optional()
    ),
    k: core.serialization.number().optional(),
    p: core.serialization.number().optional(),
    frequencyPenalty: core.serialization.property("frequency_penalty", core.serialization.number().optional()),
    presencePenalty: core.serialization.property("presence_penalty", core.serialization.number().optional()),
    returnLikelihoods: core.serialization.property(
        "return_likelihoods",
        GenerateStreamRequestReturnLikelihoods.optional()
    ),
    rawPrompting: core.serialization.property("raw_prompting", core.serialization.boolean().optional()),
});

export declare namespace GenerateStreamRequest {
    interface Raw {
        prompt: string;
        model?: string | null;
        num_generations?: number | null;
        max_tokens?: number | null;
        truncate?: GenerateStreamRequestTruncate.Raw | null;
        temperature?: number | null;
        seed?: number | null;
        preset?: string | null;
        end_sequences?: string[] | null;
        stop_sequences?: string[] | null;
        k?: number | null;
        p?: number | null;
        frequency_penalty?: number | null;
        presence_penalty?: number | null;
        return_likelihoods?: GenerateStreamRequestReturnLikelihoods.Raw | null;
        raw_prompting?: boolean | null;
    }
}
