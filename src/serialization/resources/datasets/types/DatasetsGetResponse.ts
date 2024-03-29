/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../..";
import * as Cohere from "../../../../api";
import * as core from "../../../../core";

export const DatasetsGetResponse: core.serialization.ObjectSchema<
    serializers.DatasetsGetResponse.Raw,
    Cohere.DatasetsGetResponse
> = core.serialization.object({
    dataset: core.serialization.lazyObject(async () => (await import("../../..")).Dataset),
});

export declare namespace DatasetsGetResponse {
    interface Raw {
        dataset: serializers.Dataset.Raw;
    }
}
