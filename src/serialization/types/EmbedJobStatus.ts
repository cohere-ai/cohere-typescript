/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../index";
import * as Cohere from "../../api/index";
import * as core from "../../core";

export const EmbedJobStatus: core.serialization.Schema<serializers.EmbedJobStatus.Raw, Cohere.EmbedJobStatus> =
    core.serialization.enum_(["processing", "complete", "cancelling", "cancelled", "failed"]);

export declare namespace EmbedJobStatus {
    type Raw = "processing" | "complete" | "cancelling" | "cancelled" | "failed";
}
