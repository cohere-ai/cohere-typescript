/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../../index";
import * as Cohere from "../../../../../../api/index";
import * as core from "../../../../../../core";

export const TrainingStepMetrics: core.serialization.ObjectSchema<
    serializers.finetuning.TrainingStepMetrics.Raw,
    Cohere.finetuning.TrainingStepMetrics
> = core.serialization.object({
    createdAt: core.serialization.property("created_at", core.serialization.date().optional()),
    stepNumber: core.serialization.property("step_number", core.serialization.number().optional()),
    metrics: core.serialization.record(core.serialization.string(), core.serialization.number()).optional(),
});

export declare namespace TrainingStepMetrics {
    interface Raw {
        created_at?: string | null;
        step_number?: number | null;
        metrics?: Record<string, number> | null;
    }
}
