/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../index";
import * as Cohere from "../../api/index";
import * as core from "../../core";

export const EmbedText: core.serialization.ObjectSchema<serializers.EmbedText.Raw, Cohere.EmbedText> =
    core.serialization.object({
        text: core.serialization.string().optional(),
    });

export declare namespace EmbedText {
    interface Raw {
        text?: string | null;
    }
}
