/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../index";
import * as Cohere from "../../api/index";
import * as core from "../../core";

export const ChatStreamRequestConnectorsSearchOptions: core.serialization.ObjectSchema<
    serializers.ChatStreamRequestConnectorsSearchOptions.Raw,
    Cohere.ChatStreamRequestConnectorsSearchOptions
> = core.serialization.object({
    seed: core.serialization.number().optional(),
});

export declare namespace ChatStreamRequestConnectorsSearchOptions {
    interface Raw {
        seed?: number | null;
    }
}
