/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as Cohere from "../../../../api/index";
import * as core from "../../../../core";
import { V2RerankResponseResultsItem } from "./V2RerankResponseResultsItem";
import { ApiMeta } from "../../../types/ApiMeta";

export const V2RerankResponse: core.serialization.ObjectSchema<
    serializers.V2RerankResponse.Raw,
    Cohere.V2RerankResponse
> = core.serialization.object({
    id: core.serialization.string().optional(),
    results: core.serialization.list(V2RerankResponseResultsItem),
    meta: ApiMeta.optional(),
});

export declare namespace V2RerankResponse {
    interface Raw {
        id?: string | null;
        results: V2RerankResponseResultsItem.Raw[];
        meta?: ApiMeta.Raw | null;
    }
}
