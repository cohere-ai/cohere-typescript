/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "..";
import * as Cohere from "../../api";
import * as core from "../../core";

export const SingleGenerationInStream: core.serialization.ObjectSchema<
    serializers.SingleGenerationInStream.Raw,
    Cohere.SingleGenerationInStream
> = core.serialization.object({
    id: core.serialization.string(),
    text: core.serialization.string(),
    index: core.serialization.number().optional(),
    finishReason: core.serialization.property(
        "finish_reason",
        core.serialization.lazy(async () => (await import("..")).FinishReason)
    ),
});

export declare namespace SingleGenerationInStream {
    interface Raw {
        id: string;
        text: string;
        index?: number | null;
        finish_reason: serializers.FinishReason.Raw;
    }
}
