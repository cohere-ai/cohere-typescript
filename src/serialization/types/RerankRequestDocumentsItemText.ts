/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "..";
import * as Cohere from "../../api";
import * as core from "../../core";

export const RerankRequestDocumentsItemText: core.serialization.ObjectSchema<
    serializers.RerankRequestDocumentsItemText.Raw,
    Cohere.RerankRequestDocumentsItemText
> = core.serialization.object({
    text: core.serialization.string(),
});

export declare namespace RerankRequestDocumentsItemText {
    interface Raw {
        text: string;
    }
}