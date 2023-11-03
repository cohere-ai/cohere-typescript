/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "..";
import * as Cohere from "../../api";
import * as core from "../../core";

export const ChatConnector: core.serialization.ObjectSchema<serializers.ChatConnector.Raw, Cohere.ChatConnector> =
    core.serialization.object({
        id: core.serialization.string(),
        options: core.serialization.record(core.serialization.string(), core.serialization.unknown()).optional(),
    });

export declare namespace ChatConnector {
    interface Raw {
        id: string;
        options?: Record<string, unknown> | null;
    }
}
