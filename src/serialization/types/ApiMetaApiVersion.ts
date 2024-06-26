/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../index";
import * as Cohere from "../../api/index";
import * as core from "../../core";

export const ApiMetaApiVersion: core.serialization.ObjectSchema<
    serializers.ApiMetaApiVersion.Raw,
    Cohere.ApiMetaApiVersion
> = core.serialization.object({
    version: core.serialization.string(),
    isDeprecated: core.serialization.property("is_deprecated", core.serialization.boolean().optional()),
    isExperimental: core.serialization.property("is_experimental", core.serialization.boolean().optional()),
});

export declare namespace ApiMetaApiVersion {
    interface Raw {
        version: string;
        is_deprecated?: boolean | null;
        is_experimental?: boolean | null;
    }
}
