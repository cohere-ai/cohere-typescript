/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "..";
import * as Cohere from "../../api";
import * as core from "../../core";

export const EmbedJobTruncate: core.serialization.Schema<serializers.EmbedJobTruncate.Raw, Cohere.EmbedJobTruncate> =
    core.serialization.enum_(["START", "END"]);

export declare namespace EmbedJobTruncate {
    type Raw = "START" | "END";
}