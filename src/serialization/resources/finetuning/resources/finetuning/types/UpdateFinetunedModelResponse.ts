/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../../index";
import * as Cohere from "../../../../../../api/index";
import * as core from "../../../../../../core";
import { FinetunedModel } from "./FinetunedModel";

export const UpdateFinetunedModelResponse: core.serialization.ObjectSchema<
    serializers.finetuning.UpdateFinetunedModelResponse.Raw,
    Cohere.finetuning.UpdateFinetunedModelResponse
> = core.serialization.object({
    finetunedModel: core.serialization.property("finetuned_model", FinetunedModel.optional()),
});

export declare namespace UpdateFinetunedModelResponse {
    interface Raw {
        finetuned_model?: FinetunedModel.Raw | null;
    }
}
