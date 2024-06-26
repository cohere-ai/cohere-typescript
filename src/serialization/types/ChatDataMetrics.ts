/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../index";
import * as Cohere from "../../api/index";
import * as core from "../../core";

export const ChatDataMetrics: core.serialization.ObjectSchema<serializers.ChatDataMetrics.Raw, Cohere.ChatDataMetrics> =
    core.serialization.object({
        numTrainTurns: core.serialization.property("num_train_turns", core.serialization.number().optional()),
        numEvalTurns: core.serialization.property("num_eval_turns", core.serialization.number().optional()),
        preamble: core.serialization.string().optional(),
    });

export declare namespace ChatDataMetrics {
    interface Raw {
        num_train_turns?: number | null;
        num_eval_turns?: number | null;
        preamble?: string | null;
    }
}
