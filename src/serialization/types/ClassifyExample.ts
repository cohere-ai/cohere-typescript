/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../index";
import * as Cohere from "../../api/index";
import * as core from "../../core";

export const ClassifyExample: core.serialization.ObjectSchema<serializers.ClassifyExample.Raw, Cohere.ClassifyExample> =
    core.serialization.object({
        text: core.serialization.string().optional(),
        label: core.serialization.string().optional(),
    });

export declare namespace ClassifyExample {
    interface Raw {
        text?: string | null;
        label?: string | null;
    }
}
