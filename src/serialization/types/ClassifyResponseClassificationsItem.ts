/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "..";
import * as Cohere from "../../api";
import * as core from "../../core";

export const ClassifyResponseClassificationsItem: core.serialization.ObjectSchema<
    serializers.ClassifyResponseClassificationsItem.Raw,
    Cohere.ClassifyResponseClassificationsItem
> = core.serialization.object({
    id: core.serialization.string(),
    input: core.serialization.string().optional(),
    prediction: core.serialization.string().optional(),
    predictions: core.serialization.list(core.serialization.string()),
    confidence: core.serialization.number().optional(),
    confidences: core.serialization.list(core.serialization.number()),
    labels: core.serialization.record(
        core.serialization.string(),
        core.serialization.lazyObject(async () => (await import("..")).ClassifyResponseClassificationsItemLabelsValue)
    ),
    classificationType: core.serialization.property(
        "classification_type",
        core.serialization.lazy(async () => (await import("..")).ClassifyResponseClassificationsItemClassificationType)
    ),
});

export declare namespace ClassifyResponseClassificationsItem {
    interface Raw {
        id: string;
        input?: string | null;
        prediction?: string | null;
        predictions: string[];
        confidence?: number | null;
        confidences: number[];
        labels: Record<string, serializers.ClassifyResponseClassificationsItemLabelsValue.Raw>;
        classification_type: serializers.ClassifyResponseClassificationsItemClassificationType.Raw;
    }
}
