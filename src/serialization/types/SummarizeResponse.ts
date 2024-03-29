/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "..";
import * as Cohere from "../../api";
import * as core from "../../core";

export const SummarizeResponse: core.serialization.ObjectSchema<
    serializers.SummarizeResponse.Raw,
    Cohere.SummarizeResponse
> = core.serialization.object({
    id: core.serialization.string().optional(),
    summary: core.serialization.string().optional(),
    meta: core.serialization.lazyObject(async () => (await import("..")).ApiMeta).optional(),
});

export declare namespace SummarizeResponse {
    interface Raw {
        id?: string | null;
        summary?: string | null;
        meta?: serializers.ApiMeta.Raw | null;
    }
}
