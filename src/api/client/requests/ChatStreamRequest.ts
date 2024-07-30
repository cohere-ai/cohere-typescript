/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Cohere from "../../index";

/**
 * @example
 *     {
 *         message: "string",
 *         model: "string",
 *         preamble: "string",
 *         chatHistory: [{
 *                 role: "CHATBOT",
 *                 message: "string",
 *                 toolCalls: [{
 *                         name: "string",
 *                         parameters: {
 *                             "string": {
 *                                 "key": "value"
 *                             }
 *                         }
 *                     }]
 *             }],
 *         conversationId: "string",
 *         promptTruncation: Cohere.ChatStreamRequestPromptTruncation.Off,
 *         connectors: [{
 *                 id: "string",
 *                 userAccessToken: "string",
 *                 continueOnFailure: true,
 *                 options: {
 *                     "string": {
 *                         "key": "value"
 *                     }
 *                 }
 *             }],
 *         searchQueriesOnly: true,
 *         documents: [{
 *                 "string": {
 *                     "key": "value"
 *                 }
 *             }],
 *         citationQuality: Cohere.ChatStreamRequestCitationQuality.Fast,
 *         temperature: 1.1,
 *         maxTokens: 1,
 *         maxInputTokens: 1,
 *         k: 1,
 *         p: 1.1,
 *         seed: 1,
 *         stopSequences: ["string"],
 *         connectorsSearchOptions: {
 *             seed: 1
 *         },
 *         frequencyPenalty: 1.1,
 *         presencePenalty: 1.1,
 *         rawPrompting: true,
 *         returnPrompt: true,
 *         tools: [{
 *                 name: "string",
 *                 description: "string",
 *                 parameterDefinitions: {
 *                     "string": {
 *                         description: "string",
 *                         type: "string",
 *                         required: true
 *                     }
 *                 }
 *             }],
 *         toolResults: [{
 *                 call: {
 *                     name: "string",
 *                     parameters: {
 *                         "string": {
 *                             "key": "value"
 *                         }
 *                     }
 *                 },
 *                 outputs: [{
 *                         "string": {
 *                             "key": "value"
 *                         }
 *                     }]
 *             }],
 *         forceSingleStep: true,
 *         responseFormat: {
 *             type: "text"
 *         }
 *     }
 */
export interface ChatStreamRequest {
    /**
     * Text input for the model to respond to.
     * Compatible Deployments: Cohere Platform, Azure, AWS Sagemaker/Bedrock, Private Deployments
     *
     */
    message: string;
    /**
     * Defaults to `command-r-plus`.
     *
     * The name of a compatible [Cohere model](https://docs.cohere.com/docs/models) or the ID of a [fine-tuned](https://docs.cohere.com/docs/chat-fine-tuning) model.
     * Compatible Deployments: Cohere Platform, Private Deployments
     *
     */
    model?: string;
    /**
     * When specified, the default Cohere preamble will be replaced with the provided one. Preambles are a part of the prompt used to adjust the model's overall behavior and conversation style, and use the `SYSTEM` role.
     *
     * The `SYSTEM` role is also used for the contents of the optional `chat_history=` parameter. When used with the `chat_history=` parameter it adds content throughout a conversation. Conversely, when used with the `preamble=` parameter it adds content at the start of the conversation only.
     * Compatible Deployments: Cohere Platform, Azure, AWS Sagemaker/Bedrock, Private Deployments
     *
     */
    preamble?: string;
    /**
     * A list of previous messages between the user and the model, giving the model conversational context for responding to the user's `message`.
     *
     * Each item represents a single message in the chat history, excluding the current user turn. It has two properties: `role` and `message`. The `role` identifies the sender (`CHATBOT`, `SYSTEM`, or `USER`), while the `message` contains the text content.
     *
     * The chat_history parameter should not be used for `SYSTEM` messages in most cases. Instead, to add a `SYSTEM` role message at the beginning of a conversation, the `preamble` parameter should be used.
     * Compatible Deployments: Cohere Platform, Azure, AWS Sagemaker/Bedrock, Private Deployments
     *
     */
    chatHistory?: Cohere.Message[];
    /**
     * An alternative to `chat_history`.
     *
     * Providing a `conversation_id` creates or resumes a persisted conversation with the specified ID. The ID can be any non empty string.
     * Compatible Deployments: Cohere Platform
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
     * Compatible Deployments: Cohere Platform Only AUTO_PRESERVE_ORDER: Azure, AWS Sagemaker/Bedrock, Private Deployments
     *
     */
    promptTruncation?: Cohere.ChatStreamRequestPromptTruncation;
    /**
     * Accepts `{"id": "web-search"}`, and/or the `"id"` for a custom [connector](https://docs.cohere.com/docs/connectors), if you've [created](https://docs.cohere.com/docs/creating-and-deploying-a-connector) one.
     *
     * When specified, the model's reply will be enriched with information found by querying each of the connectors (RAG).
     * Compatible Deployments: Cohere Platform
     *
     */
    connectors?: Cohere.ChatConnector[];
    /**
     * Defaults to `false`.
     *
     * When `true`, the response will only contain a list of generated search queries, but no search will take place, and no reply from the model to the user's `message` will be generated.
     * Compatible Deployments: Cohere Platform, Azure, AWS Sagemaker/Bedrock, Private Deployments
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
     * Compatible Deployments: Cohere Platform, Azure, AWS Sagemaker/Bedrock, Private Deployments
     *
     */
    documents?: Cohere.ChatDocument[];
    /**
     * Defaults to `"accurate"`.
     *
     * Dictates the approach taken to generating citations as part of the RAG flow by allowing the user to specify whether they want `"accurate"` results, `"fast"` results or no results.
     * Compatible Deployments: Cohere Platform, Azure, AWS Sagemaker/Bedrock, Private Deployments
     *
     */
    citationQuality?: Cohere.ChatStreamRequestCitationQuality;
    /**
     * Defaults to `0.3`.
     *
     * A non-negative float that tunes the degree of randomness in generation. Lower temperatures mean less random generations, and higher temperatures mean more random generations.
     *
     * Randomness can be further maximized by increasing the  value of the `p` parameter.
     * Compatible Deployments: Cohere Platform, Azure, AWS Sagemaker/Bedrock, Private Deployments
     *
     */
    temperature?: number;
    /**
     * The maximum number of tokens the model will generate as part of the response. Note: Setting a low value may result in incomplete generations.
     * Compatible Deployments: Cohere Platform, Azure, AWS Sagemaker/Bedrock, Private Deployments
     *
     */
    maxTokens?: number;
    /**
     * The maximum number of input tokens to send to the model. If not specified, `max_input_tokens` is the model's context length limit minus a small buffer.
     *
     * Input will be truncated according to the `prompt_truncation` parameter.
     * Compatible Deployments: Cohere Platform
     *
     */
    maxInputTokens?: number;
    /**
     * Ensures only the top `k` most likely tokens are considered for generation at each step.
     * Defaults to `0`, min value of `0`, max value of `500`.
     * Compatible Deployments: Cohere Platform, Azure, AWS Sagemaker/Bedrock, Private Deployments
     *
     */
    k?: number;
    /**
     * Ensures that only the most likely tokens, with total probability mass of `p`, are considered for generation at each step. If both `k` and `p` are enabled, `p` acts after `k`.
     * Defaults to `0.75`. min value of `0.01`, max value of `0.99`.
     * Compatible Deployments: Cohere Platform, Azure, AWS Sagemaker/Bedrock, Private Deployments
     *
     */
    p?: number;
    /**
     * If specified, the backend will make a best effort to sample tokens
     * deterministically, such that repeated requests with the same
     * seed and parameters should return the same result. However,
     * determinism cannot be totally guaranteed.
     * Compatible Deployments: Cohere Platform, Azure, AWS Sagemaker/Bedrock, Private Deployments
     *
     */
    seed?: number;
    /**
     * A list of up to 5 strings that the model will use to stop generation. If the model generates a string that matches any of the strings in the list, it will stop generating tokens and return the generated text up to that point not including the stop sequence.
     * Compatible Deployments: Cohere Platform, Azure, AWS Sagemaker/Bedrock, Private Deployments
     *
     */
    stopSequences?: string[];
    /**
     * Defaults to `0.0`, min value of `0.0`, max value of `1.0`.
     *
     * Used to reduce repetitiveness of generated tokens. The higher the value, the stronger a penalty is applied to previously present tokens, proportional to how many times they have already appeared in the prompt or prior generation.
     * Compatible Deployments: Cohere Platform, Azure, AWS Sagemaker/Bedrock, Private Deployments
     *
     */
    frequencyPenalty?: number;
    /**
     * Defaults to `0.0`, min value of `0.0`, max value of `1.0`.
     *
     * Used to reduce repetitiveness of generated tokens. Similar to `frequency_penalty`, except that this penalty is applied equally to all tokens that have already appeared, regardless of their exact frequencies.
     * Compatible Deployments: Cohere Platform, Azure, AWS Sagemaker/Bedrock, Private Deployments
     *
     */
    presencePenalty?: number;
    /**
     * When enabled, the user's prompt will be sent to the model without
     * any pre-processing.
     * Compatible Deployments: Cohere Platform, Azure, AWS Sagemaker/Bedrock, Private Deployments
     *
     */
    rawPrompting?: boolean;
    /** The prompt is returned in the `prompt` response field when this is enabled. */
    returnPrompt?: boolean;
    /**
     * A list of available tools (functions) that the model may suggest invoking before producing a text response.
     *
     * When `tools` is passed (without `tool_results`), the `text` field in the response will be `""` and the `tool_calls` field in the response will be populated with a list of tool calls that need to be made. If no calls need to be made, the `tool_calls` array will be empty.
     * Compatible Deployments: Cohere Platform, Azure, AWS Sagemaker/Bedrock, Private Deployments
     *
     */
    tools?: Cohere.Tool[];
    /**
     * A list of results from invoking tools recommended by the model in the previous chat turn. Results are used to produce a text response and will be referenced in citations. When using `tool_results`, `tools` must be passed as well.
     * Each tool_result contains information about how it was invoked, as well as a list of outputs in the form of dictionaries.
     *
     * **Note**: `outputs` must be a list of objects. If your tool returns a single object (eg `{"status": 200}`), make sure to wrap it in a list.
     * ```
     * tool_results = [
     *   {
     *     "call": {
     *       "name": <tool name>,
     *       "parameters": {
     *         <param name>: <param value>
     *       }
     *     },
     *     "outputs": [{
     *       <key>: <value>
     *     }]
     *   },
     *   ...
     * ]
     * ```
     * **Note**: Chat calls with `tool_results` should not be included in the Chat history to avoid duplication of the message text.
     * Compatible Deployments: Cohere Platform, Azure, AWS Sagemaker/Bedrock, Private Deployments
     *
     */
    toolResults?: Cohere.ToolResult[];
    /** Forces the chat to be single step. Defaults to `false`. */
    forceSingleStep?: boolean;
    responseFormat?: Cohere.ResponseFormat;
}
