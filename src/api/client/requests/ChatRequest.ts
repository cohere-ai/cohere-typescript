/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Cohere from "../..";

export interface ChatRequest {
    /**
     * Accepts a string.
     * The chat message from the user to the model.
     *
     */
    message: string;
    /**
     * Defaults to `command`.
     * The identifier of the model, which can be one of the existing Cohere models or the full ID for a [finetuned custom model](/docs/training-custom-models).
     * Compatible Cohere models are `command` and `command-light` as well as the experimental `command-nightly` and `command-light-nightly` variants. Read more about [Cohere models](https://docs.cohere.com/docs/models).
     *
     */
    model?: string;
    /**
     * When specified, the default Cohere preamble will be replaced with the provided one.
     *
     */
    preambleOverride?: string;
    /**
     * A list of previous messages between the user and the model, meant to give the model conversational context for responding to the user's `message`.
     *
     */
    chatHistory?: Cohere.ChatMessage[];
    /**
     * An alternative to `chat_history`. Previous conversations can be resumed by providing the conversation's identifier. The contents of `message` and the model's response will be stored as part of this conversation.
     * If a conversation with this id does not already exist, a new conversation will be created.
     *
     */
    conversationId?: string;
    /**
     * Defaults to `AUTO` when `connectors` are specified and `OFF` in all other cases.
     * Dictates how the prompt will be constructed.
     * With `prompt_truncation` set to "AUTO", some elements from `chat_history` and `documents` will be dropped in an attempt to construct a prompt that fits within the model's context length limit.
     * With `prompt_truncation` set to "OFF", no elements will be dropped. If the sum of the inputs exceeds the model's context length limit, a `TooManyTokens` error will be returned.
     *
     */
    promptTruncation?: Cohere.ChatRequestPromptTruncation;
    /**
     * Accepts `{"id": "web-search"}`, and/or the `"id"` for a custom connector, if you've made one.
     * When specified, the model's reply will be enriched with information found by quering each of the connectors (RAG).
     *
     */
    connectors?: Cohere.ChatConnector[];
    /**
     * Defaults to `false`.
     * When `true`, the response will only contain a list of generated search queries, but no search will take place, and no reply from the model to the user's `message` will be generated.
     *
     */
    searchQueriesOnly?: boolean;
    /**
     * A list of relevant documents that the model can use to enrich its reply. See ['Document Mode'](https://docs.cohere.com/docs/retrieval-augmented-generation-rag#document-mode) in the guide for more information.
     *
     */
    documents?: Cohere.ChatDocument[];
    /**
     * Defaults to `"accurate"`.
     * Dictates the approach taken to generating citations as part of the RAG flow by allowing the user to specify whether they want `"accurate"` results or `"fast"` results.
     *
     */
    citationQuality?: Cohere.ChatRequestCitationQuality;
    /**
     * Defaults to `0.3`
     * A non-negative float that tunes the degree of randomness in generation. Lower temperatures mean less random generations, and higher temperatures mean more random generations.
     *
     */
    temperature?: number;
}
