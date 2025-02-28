/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../index";
import * as Cohere from "../../api/index";
import * as core from "../../core";
import { CompatibleEndpoint } from "./CompatibleEndpoint";

export const GetModelResponse: core.serialization.ObjectSchema<
    serializers.GetModelResponse.Raw,
    Cohere.GetModelResponse
> = core.serialization.object({
    name: core.serialization.string().optional(),
    endpoints: core.serialization.list(CompatibleEndpoint).optional(),
    finetuned: core.serialization.boolean().optional(),
    contextLength: core.serialization.property("context_length", core.serialization.number().optional()),
    tokenizerUrl: core.serialization.property("tokenizer_url", core.serialization.string().optional()),
    supportsVision: core.serialization.property("supports_vision", core.serialization.boolean().optional()),
    defaultEndpoints: core.serialization.property(
        "default_endpoints",
        core.serialization.list(CompatibleEndpoint).optional()
    ),
});

export declare namespace GetModelResponse {
    interface Raw {
        name?: string | null;
        endpoints?: CompatibleEndpoint.Raw[] | null;
        finetuned?: boolean | null;
        context_length?: number | null;
        tokenizer_url?: string | null;
        supports_vision?: boolean | null;
        default_endpoints?: CompatibleEndpoint.Raw[] | null;
    }
}
