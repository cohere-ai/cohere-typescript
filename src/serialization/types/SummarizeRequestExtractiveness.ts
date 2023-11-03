/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "..";
import * as Cohere from "../../api";
import * as core from "../../core";

export const SummarizeRequestExtractiveness: core.serialization.Schema<
    serializers.SummarizeRequestExtractiveness.Raw,
    Cohere.SummarizeRequestExtractiveness
> = core.serialization.enum_(["low", "medium", "high"]);

export declare namespace SummarizeRequestExtractiveness {
    type Raw = "low" | "medium" | "high";
}
