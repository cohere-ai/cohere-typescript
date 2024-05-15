/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../../index";
import * as Cohere from "../../../../../../api/index";
import * as core from "../../../../../../core";

export const DeleteFinetunedModelResponse: core.serialization.Schema<
    serializers.finetuning.DeleteFinetunedModelResponse.Raw,
    Cohere.finetuning.DeleteFinetunedModelResponse
> = core.serialization.record(core.serialization.string(), core.serialization.unknown());

export declare namespace DeleteFinetunedModelResponse {
    type Raw = Record<string, unknown>;
}
