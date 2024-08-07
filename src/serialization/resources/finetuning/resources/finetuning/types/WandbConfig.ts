/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../../index";
import * as Cohere from "../../../../../../api/index";
import * as core from "../../../../../../core";

export const WandbConfig: core.serialization.ObjectSchema<
    serializers.finetuning.WandbConfig.Raw,
    Cohere.finetuning.WandbConfig
> = core.serialization.object({
    project: core.serialization.string(),
    apiKey: core.serialization.property("api_key", core.serialization.string()),
    entity: core.serialization.string().optional(),
});

export declare namespace WandbConfig {
    interface Raw {
        project: string;
        api_key: string;
        entity?: string | null;
    }
}
