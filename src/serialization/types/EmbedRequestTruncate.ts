/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "..";
import * as Cohere from "../../api";
import * as core from "../../core";

export const EmbedRequestTruncate: core.serialization.Schema<
    serializers.EmbedRequestTruncate.Raw,
    Cohere.EmbedRequestTruncate
> = core.serialization.enum_(["NONE", "START", "END"]);

export declare namespace EmbedRequestTruncate {
    type Raw = "NONE" | "START" | "END";
}