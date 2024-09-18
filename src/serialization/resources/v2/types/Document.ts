/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as Cohere from "../../../../api/index";
import * as core from "../../../../core";

export const Document: core.serialization.ObjectSchema<serializers.Document.Raw, Cohere.Document> =
    core.serialization.object({
        data: core.serialization.record(core.serialization.string(), core.serialization.string()),
        id: core.serialization.string().optional(),
    });

export declare namespace Document {
    interface Raw {
        data: Record<string, string>;
        id?: string | null;
    }
}
