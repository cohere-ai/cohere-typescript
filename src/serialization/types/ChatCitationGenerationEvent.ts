/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "..";
import * as Cohere from "../../api";
import * as core from "../../core";

export const ChatCitationGenerationEvent: core.serialization.ObjectSchema<
    serializers.ChatCitationGenerationEvent.Raw,
    Cohere.ChatCitationGenerationEvent
> = core.serialization
    .object({
        citations: core.serialization.list(
            core.serialization.lazyObject(async () => (await import("..")).ChatCitation)
        ),
    })
    .extend(core.serialization.lazyObject(async () => (await import("..")).ChatStreamEvent));

export declare namespace ChatCitationGenerationEvent {
    interface Raw extends serializers.ChatStreamEvent.Raw {
        citations: serializers.ChatCitation.Raw[];
    }
}
