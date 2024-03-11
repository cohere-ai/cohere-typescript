/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Cohere from "../..";

export interface ChatStreamRequest {
    /**
     * Text input for the model to respond to.
     *
     */
    message: string;
    /**
     * Defaults to `command`.
     *
     * The name of a compatible [Cohere model](https://docs.cohere.com/docs/models) or the ID of a [fine-tuned](https://docs.cohere.com/docs/chat-fine-tuning) model.
     *
     */
    model?: string;
    /**
     * When specified, the default Cohere preamble will be replaced with the provided one. Preambles are a part of the prompt used to adjust the model's overall behavior and conversation style.
     *
     */
    preamble?: string;
    /**
     * A list of previous messages between the user and the model, meant to give the model conversational context for responding to the user's `message`.
     *
     */
    chatHistory?: Cohere.ChatMessage[];
    /**
     * An alternative to `chat_history`.
     *
     * Providing a `conversation_id` creates or resumes a persisted conversation with the specified ID. The ID can be any non empty string.
     *
     */
    conversationId?: string;
    /**
     * Defaults to `AUTO` when `connectors` are specified and `OFF` in all other cases.
     *
     * Dictates how the prompt will be constructed.
     *
     * With `prompt_truncation` set to "AUTO", some elements from `chat_history` and `documents` will be dropped in an attempt to construct a prompt that fits within the model's context length limit. During this process the order of the documents and chat history will be changed and ranked by relevance.
     *
     * With `prompt_truncation` set to "AUTO_PRESERVE_ORDER", some elements from `chat_history` and `documents` will be dropped in an attempt to construct a prompt that fits within the model's context length limit. During this process the order of the documents and chat history will be preserved as they are inputted into the API.
     *
     * With `prompt_truncation` set to "OFF", no elements will be dropped. If the sum of the inputs exceeds the model's context length limit, a `TooManyTokens` error will be returned.
     *
     */
    promptTruncation?: Cohere.ChatStreamRequestPromptTruncation;
    /**
     * Accepts `{"id": "web-search"}`, and/or the `"id"` for a custom [connector](https://docs.cohere.com/docs/connectors), if you've [created](https://docs.cohere.com/docs/creating-and-deploying-a-connector) one.
     *
     * When specified, the model's reply will be enriched with information found by quering each of the connectors (RAG).
     *
     */
    connectors?: Cohere.ChatConnector[];
    /**
     * Defaults to `false`.
     *
     * When `true`, the response will only contain a list of generated search queries, but no search will take place, and no reply from the model to the user's `message` will be generated.
     *
     */
    searchQueriesOnly?: boolean;
    /**
     * A list of relevant documents that the model can cite to generate a more accurate reply. Each document is a string-string dictionary.
     *
     * Example:
     * `[
     *   { "title": "Tall penguins", "text": "Emperor penguins are the tallest." },
     *   { "title": "Penguin habitats", "text": "Emperor penguins only live in Antarctica." },
     * ]`
     *
     * Keys and values from each document will be serialized to a string and passed to the model. The resulting generation will include citations that reference some of these documents.
     *
     * Some suggested keys are "text", "author", and "date". For better generation quality, it is recommended to keep the total word count of the strings in the dictionary to under 300 words.
     *
     * An `id` field (string) can be optionally supplied to identify the document in the citations. This field will not be passed to the model.
     *
     * An `_excludes` field (array of strings) can be optionally supplied to omit some key-value pairs from being shown to the model. The omitted fields will still show up in the citation object. The "_excludes" field will not be passed to the model.
     *
     * See ['Document Mode'](https://docs.cohere.com/docs/retrieval-augmented-generation-rag#document-mode) in the guide for more information.
     *
     */
    documents?: Cohere.ChatDocument[];
    /**
     * Defaults to `0.3`.
     *
     * A non-negative float that tunes the degree of randomness in generation. Lower temperatures mean less random generations, and higher temperatures mean more random generations.
     *
     * Randomness can be further maximized by increasing the  value of the `p` parameter.
     *
     */
    temperature?: number;
    /**
     * The maximum number of tokens the model will generate as part of the response. Note: Setting a low value may result in incomplete generations.
     *
     */
    maxTokens?: number;
    /**
     * Ensures only the top `k` most likely tokens are considered for generation at each step.
     * Defaults to `0`, min value of `0`, max value of `500`.
     *
     */
    k?: number;
    /**
     * Ensures that only the most likely tokens, with total probability mass of `p`, are considered for generation at each step. If both `k` and `p` are enabled, `p` acts after `k`.
     * Defaults to `0.75`. min value of `0.01`, max value of `0.99`.
     *
     */
    p?: number;
    /**
     * Defaults to `0.0`, min value of `0.0`, max value of `1.0`.
     *
     * Used to reduce repetitiveness of generated tokens. The higher the value, the stronger a penalty is applied to previously present tokens, proportional to how many times they have already appeared in the prompt or prior generation.
     *
     */
    frequencyPenalty?: number;
    /**
     * Defaults to `0.0`, min value of `0.0`, max value of `1.0`.
     *
     * Used to reduce repetitiveness of generated tokens. Similar to `frequency_penalty`, except that this penalty is applied equally to all tokens that have already appeared, regardless of their exact frequencies.
     *
     */
    presencePenalty?: number;
    /** When enabled, the user's prompt will be sent to the model without any pre-processing. */
    rawPrompting?: boolean;
    /**
     * A list of tools that the model can call.
     *
     */
    tools?: Cohere.Tool[];
    /**
     * A list of results from invoking tools. Results are used to generate text and will be referenced in citations. When using `tool_results`, `tools` must be passed as well.
     *
     * ```
     * tool_results = [
     *   {
     *     "call": {
     *         "name": <tool name>,
     *         "parameters": {
     *             <param name>: <param value>
     *         }
     *     },
     *     "outputs": [{"answer": 5}]
     *   },
     *   ...
     * ]
     * ```
     *
     */
    toolResults?: Cohere.ChatStreamRequestToolResultsItem[];
}
