/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "..";
import * as Cohere from "../../api";
import * as core from "../../core";

export const ChatSearchResult: core.serialization.ObjectSchema<
    serializers.ChatSearchResult.Raw,
    Cohere.ChatSearchResult
> = core.serialization.object({
    searchQuery: core.serialization.property(
        "search_query",
        core.serialization.lazyObject(async () => (await import("..")).ChatSearchQuery)
    ),
    connector: core.serialization.lazyObject(async () => (await import("..")).ChatConnector),
    documentIds: core.serialization.property("document_ids", core.serialization.list(core.serialization.string())),
});

export declare namespace ChatSearchResult {
    interface Raw {
        search_query: serializers.ChatSearchQuery.Raw;
        connector: serializers.ChatConnector.Raw;
        document_ids: string[];
    }
}