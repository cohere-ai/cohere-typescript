/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "..";
import * as Cohere from "../../api";
import * as core from "../../core";

export const CompatibleEndpoint: core.serialization.Schema<
    serializers.CompatibleEndpoint.Raw,
    Cohere.CompatibleEndpoint
> = core.serialization.enum_(["chat", "embed", "classify", "summarize", "rerank", "rate", "generate"]);

export declare namespace CompatibleEndpoint {
    type Raw = "chat" | "embed" | "classify" | "summarize" | "rerank" | "rate" | "generate";
}