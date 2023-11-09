/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../..";
import * as Cohere from "../../../api";
import * as core from "../../../core";

export const SummarizeRequest: core.serialization.Schema<serializers.SummarizeRequest.Raw, Cohere.SummarizeRequest> =
    core.serialization.object({
        text: core.serialization.string(),
        length: core.serialization.lazy(async () => (await import("../..")).SummarizeRequestLength).optional(),
        format: core.serialization.lazy(async () => (await import("../..")).SummarizeRequestFormat).optional(),
        model: core.serialization.string().optional(),
        extractiveness: core.serialization
            .lazy(async () => (await import("../..")).SummarizeRequestExtractiveness)
            .optional(),
        temperature: core.serialization.number().optional(),
        additionalCommand: core.serialization.property("additional_command", core.serialization.string().optional()),
    });

export declare namespace SummarizeRequest {
    interface Raw {
        text: string;
        length?: serializers.SummarizeRequestLength.Raw | null;
        format?: serializers.SummarizeRequestFormat.Raw | null;
        model?: string | null;
        extractiveness?: serializers.SummarizeRequestExtractiveness.Raw | null;
        temperature?: number | null;
        additional_command?: string | null;
    }
}
