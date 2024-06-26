/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as Cohere from "../../../../api/index";
import * as core from "../../../../core";
import { Dataset } from "../../../types/Dataset";

export const DatasetsListResponse: core.serialization.ObjectSchema<
    serializers.DatasetsListResponse.Raw,
    Cohere.DatasetsListResponse
> = core.serialization.object({
    datasets: core.serialization.list(Dataset).optional(),
});

export declare namespace DatasetsListResponse {
    interface Raw {
        datasets?: Dataset.Raw[] | null;
    }
}
