/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "..";
import * as Cohere from "../../api";
import * as core from "../../core";

export const ClassifyResponseClassificationsItemClassificationType: core.serialization.Schema<
    serializers.ClassifyResponseClassificationsItemClassificationType.Raw,
    Cohere.ClassifyResponseClassificationsItemClassificationType
> = core.serialization.enum_(["single-label", "multi-label"]);

export declare namespace ClassifyResponseClassificationsItemClassificationType {
    type Raw = "single-label" | "multi-label";
}
