/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../index";
import * as Cohere from "../../api/index";
import * as core from "../../core";

export const RerankerDataMetrics: core.serialization.ObjectSchema<
    serializers.RerankerDataMetrics.Raw,
    Cohere.RerankerDataMetrics
> = core.serialization.object({
    numTrainQueries: core.serialization.property("num_train_queries", core.serialization.number().optional()),
    numTrainRelevantPassages: core.serialization.property(
        "num_train_relevant_passages",
        core.serialization.number().optional()
    ),
    numTrainHardNegatives: core.serialization.property(
        "num_train_hard_negatives",
        core.serialization.number().optional()
    ),
    numEvalQueries: core.serialization.property("num_eval_queries", core.serialization.number().optional()),
    numEvalRelevantPassages: core.serialization.property(
        "num_eval_relevant_passages",
        core.serialization.number().optional()
    ),
    numEvalHardNegatives: core.serialization.property(
        "num_eval_hard_negatives",
        core.serialization.number().optional()
    ),
});

export declare namespace RerankerDataMetrics {
    interface Raw {
        num_train_queries?: number | null;
        num_train_relevant_passages?: number | null;
        num_train_hard_negatives?: number | null;
        num_eval_queries?: number | null;
        num_eval_relevant_passages?: number | null;
        num_eval_hard_negatives?: number | null;
    }
}
