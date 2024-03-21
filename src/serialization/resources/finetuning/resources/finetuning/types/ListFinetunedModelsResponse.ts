/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../..";
import * as Cohere from "../../../../../../api";
import * as core from "../../../../../../core";

export const ListFinetunedModelsResponse: core.serialization.ObjectSchema<
    serializers.finetuning.ListFinetunedModelsResponse.Raw,
    Cohere.finetuning.ListFinetunedModelsResponse
> = core.serialization.object({
    finetunedModels: core.serialization.property(
        "finetuned_models",
        core.serialization
            .list(core.serialization.lazyObject(async () => (await import("../../../../..")).finetuning.FinetunedModel))
            .optional()
    ),
    nextPageToken: core.serialization.property("next_page_token", core.serialization.string().optional()),
    totalSize: core.serialization.property("total_size", core.serialization.number().optional()),
});

export declare namespace ListFinetunedModelsResponse {
    interface Raw {
        finetuned_models?: serializers.finetuning.FinetunedModel.Raw[] | null;
        next_page_token?: string | null;
        total_size?: number | null;
    }
}
