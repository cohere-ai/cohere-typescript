/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "..";
import * as Cohere from "../../api";
import * as core from "../../core";
import { RerankResponseResultsItem } from "./RerankResponseResultsItem";
import { ApiMeta } from "./ApiMeta";

export const RerankResponse: core.serialization.ObjectSchema<serializers.RerankResponse.Raw, Cohere.RerankResponse> =
    core.serialization.object({
        id: core.serialization.string().optional(),
        results: core.serialization.list(RerankResponseResultsItem),
        meta: ApiMeta.optional(),
    });

export declare namespace RerankResponse {
    interface Raw {
        id?: string | null;
        results: RerankResponseResultsItem.Raw[];
        meta?: ApiMeta.Raw | null;
    }
}
