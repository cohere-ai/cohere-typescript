/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../index";
import * as Cohere from "../../api/index";
import * as core from "../../core";
import { ChatSearchQuery } from "./ChatSearchQuery";
import { ChatStreamEvent } from "./ChatStreamEvent";

export const ChatSearchQueriesGenerationEvent: core.serialization.ObjectSchema<
    serializers.ChatSearchQueriesGenerationEvent.Raw,
    Cohere.ChatSearchQueriesGenerationEvent
> = core.serialization
    .object({
        searchQueries: core.serialization.property("search_queries", core.serialization.list(ChatSearchQuery)),
    })
    .extend(ChatStreamEvent);

export declare namespace ChatSearchQueriesGenerationEvent {
    interface Raw extends ChatStreamEvent.Raw {
        search_queries: ChatSearchQuery.Raw[];
    }
}
