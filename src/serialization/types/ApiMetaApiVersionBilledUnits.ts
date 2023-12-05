/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "..";
import * as Cohere from "../../api";
import * as core from "../../core";

export const ApiMetaApiVersionBilledUnits: core.serialization.ObjectSchema<
    serializers.ApiMetaApiVersionBilledUnits.Raw,
    Cohere.ApiMetaApiVersionBilledUnits
> = core.serialization.object({
    inputTokens: core.serialization.property("input_tokens", core.serialization.number().optional()),
    outputTokens: core.serialization.property("output_tokens", core.serialization.number().optional()),
    searchUnits: core.serialization.property("search_units", core.serialization.number().optional()),
    classifications: core.serialization.number().optional(),
});

export declare namespace ApiMetaApiVersionBilledUnits {
    interface Raw {
        input_tokens?: number | null;
        output_tokens?: number | null;
        search_units?: number | null;
        classifications?: number | null;
    }
}
