/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as Cohere from "../../../../api/index";
import * as core from "../../../../core";

export const DocumentContent: core.serialization.ObjectSchema<serializers.DocumentContent.Raw, Cohere.DocumentContent> =
    core.serialization.object({
        id: core.serialization.string(),
        document: core.serialization.record(core.serialization.string(), core.serialization.unknown()),
    });

export declare namespace DocumentContent {
    interface Raw {
        id: string;
        document: Record<string, unknown>;
    }
}
