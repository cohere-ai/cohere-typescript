/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "..";
import * as Cohere from "../../api";
import * as core from "../../core";

export const ClassifyResponseClassificationsItemLabelsValue: core.serialization.ObjectSchema<
    serializers.ClassifyResponseClassificationsItemLabelsValue.Raw,
    Cohere.ClassifyResponseClassificationsItemLabelsValue
> = core.serialization.object({
    confidence: core.serialization.number().optional(),
});

export declare namespace ClassifyResponseClassificationsItemLabelsValue {
    interface Raw {
        confidence?: number | null;
    }
}
