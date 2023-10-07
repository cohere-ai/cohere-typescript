export interface cohereResponse<T> {
  statusCode: number | undefined;
  body: T;
}

/*-- requests --*/
interface generateBaseRequest {
  /** Denotes the model to be used. Defaults to the best performing model */
  model?: string;
  /** Represents the prompt or text to be completed. */
  prompt?: string;
  /** Denotes the number of tokens to predict per generation. */
  max_tokens?: number;
  /** An optional string representing the ID of a custom playground preset. */
  preset?: string;
  /** Denotes the maximum number of generations that will be returned. Defaults to 1, max value of 5. */
  num_generations?: number;
  /** A non-negative float that tunes the degree of randomness in generation. */
  temperature?: number;
  /** If set to a positive integer, it ensures only the top k most likely tokens are considered for generation at each step. */
  k?: number;
  /** If set to a probability 0.0 < p < 1.0, it ensures that only the most likely tokens,
   * with total probability mass of p, are considered for generation at each step. If both k and
   * p are enabled, p acts after k. Max value of 1.0.
   */
  p?: number;
  /** Can be used to reduce repetitiveness of generated tokens. Similar to frequency_penalty,
   * except that this penalty is applied equally to all tokens that have already appeared, regardless
   * of their exact frequencies. Max value of 1.0.
   */
  presence_penalty?: number;
  /** Can be used to reduce repetitiveness of generated tokens. The higher the value,
   * the stronger a penalty is applied to previously present tokens, proportional to how many
   * times they have already appeared in the prompt or prior generation. Max value of 1.0.
   */
  frequency_penalty?: number;
  /** The generated text will be cut at the beginning of the earliest occurence of an end sequence.
   * The sequence will be excluded from the text.
   */
  end_sequences?: string[];
  /** The generated text will be cut at the end of the earliest occurence of a stop sequence. The sequence
   * will be included the text.
   */
  stop_sequences?: string[];
  /** One of GENERATION|ALL|NONE to specify how and if the token likelihoods are returned with
   * the response. If GENERATION is selected, the token likelihoods will only be provided for generated
   * text. If ALL is selected, the token likelihoods will be provided both for the prompt and the generated
   * text.
   */
  return_likelihoods?: "GENERATION" | "ALL" | "NONE";

  /** Used to prevent the model from generating unwanted tokens or to incentivize it to include desired tokens
   * A map of token ids to biases where bias is a float between -10 and +10
   * Negative values will disincentivize that token from appearing while positivse values will encourage them
   * Token ids can be obtained from text using the tokenizer
   * Note: logit bias may not be supported for all finetune models
   */
  logit_bias?: { [token_id: number]: number };

  /** Specifies how the API will handle inputs longer than the maximum token length.
   * Passing START will discard the start of the input and END will discard the end of the input.
   * Defaults to NONE, which will return an error if the input is too long. */
  truncate?: "NONE" | "START" | "END";
}

interface generateWithPromptRequest extends generateBaseRequest {
  prompt: string;
  max_tokens: number;
}

interface generateWithPresetRequest extends generateBaseRequest {
  preset: string;
}

export type generateRequest =
  | generateWithPromptRequest
  | generateWithPresetRequest;

export interface embedRequest {
  /** Denotes the model to be used. Defaults to the best performing model */
  model?: string;
  /** An array of strings for the model to embed. */
  texts: string[];
  /** Specifies how the API will handle inputs longer than the maximum token length. */
  truncate?: "NONE" | "START" | "END";
}

interface classifyBaseRequest {
  /** Denotes the model to be used. Defaults to the best performing model */
  model?: string;
  /** An array of strings that you would like to classify. */
  inputs?: string[];
  /** An array of examples representing examples and the corresponding label. */
  examples?: { text: string; label: string }[];
  /** An optional string representing the ID of a custom playground preset. */
  preset?: string;
  /** Specifies how the API will handle inputs longer than the maximum token length.
   * Passing START will discard the start of the input and END will discard the end of the input.
   * Defaults to NONE, which will return an error if the input is too long. */
  truncate?: "NONE" | "START" | "END";
}

interface classifyWithInputsRequest extends classifyBaseRequest {
  inputs: string[];
  examples: { text: string; label: string }[];
}

interface classifyWithPresetRequest extends classifyBaseRequest {
  preset: string;
}

export type classifyRequest =
  | classifyWithInputsRequest
  | classifyWithPresetRequest;

export interface tokenizeRequest {
  /** The text to be tokenized */
  text: string;
}

export interface detokenizeRequest {
  /** The list of tokens to be detokenized */
  tokens: number[];
}

export interface detectLanguageRequest {
  /** Texts to identify the language for */
  texts: string[];
}

export enum summaryLength {
  SHORT = "SHORT",
  MEDIUM = "MEDIUM",
  LONG = "LONG",
}

export enum summaryFormat {
  PARAGRAPH = "PARAGRAPH",
  BULLET_POINTS = "BULLETS",
}

export enum summaryExtractiveness {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

export interface summarizeRequest {
  /** Text to summarize */
  text: string;
  /** Denotes the summarization model to be used. Defaults to the best performing model */
  model?: string;
  /** One of `short`, `medium` or `long`, defaults to `medium`. Indicates the approximate length of the summary.' */
  length?: summaryLength | string;
  /**  'One of `paragraph` or `bullets`, defaults to `paragraph`.
   * Indicates the style in which the summary will be delivered - in a free form
   * paragraph or in bullet points.'
   */
  format?: summaryFormat | string;
  /** One of `low`, `medium` or `high`, defaults to `low`. Controls how close to the original text the summary is.
   * `high` extractiveness summaries will lean towards reusing sentences verbatim, while `low` extractiveness
   * summaries will tend to paraphrase more.'
   */
  extractiveness?: summaryExtractiveness | string;
  /** Ranges from 0 to 5. Controls the randomness of the output. Lower values tend to generate more “predictable” output,
   * while higher values tend to generate more “creative” output. The sweet spot is typically between 0 and 1.
   */
  temperature?: number;
  /** A free-form instruction for modifying how the summaries get generated. Should complete the sentence "Generate a summary _".
   * Eg. "focusing on the next steps" or "written by Yoda"
   */
  additional_command?: string;
}

export enum chatRole {
  CHATBOT = "CHATBOT",
  USER = "USER",
}

interface chatHistory {
  role: chatRole;
  message: string;
  user_name?: string;
}

interface chatConnector {
  id: "web-search";
  options?: {
    [site: string]: string | undefined;
  };
}

interface chatDocument {
  id: string;
  [key: string]: string | undefined;
}

export enum chatModel {
  COMMAND = "command",
  COMMAND_LIGHT = "command-light",
  COMMAND_NIGHTLY = "command-nightly",
  COMMAND_LIGHT_NIGHTLY = "command-light-nightly",
}

export enum chatPromptTruncation {
  AUTO = "AUTO",
  OFF = "OFF",
}

export enum chatCitationQuality {
  ACCURATE = "accurate",
  FAST = "fast",
}

export interface chatRequest {
  /** The chat message from the user to the model. */
  message: string;
  /**
   * Denotes the model to be used. Defaults to command.
   * The identifier of the model, which can be one of the existing Cohere models or the full ID for a finetuned custom model.
   * Compatible Cohere models are command and command-light as well as the experimental command-nightly and command-light-nightly variants.
   */
  model?: chatModel;
  /**
   * Denotes whether streaming will be used. Defaults to false.
   * When true, the response will be a JSON stream of events.
   * The final event will contain the complete response, and will have an event_type of "stream-end".
   */
  stream?: boolean;
  /** When specified, the default Cohere preamble will be replaced with the provided one. */
  preamble_override?: string;
  /** A list of previous messages between the user and the model,
   * meant to give the model conversational context for responding to the user's message.
   */
  chat_history?: chatHistory[];
  /**
   * An alternative to chat_history. Previous conversations can be resumed by providing the conversation's identifier.
   * The contents of message and the model's response will be stored as part of this conversation.
   * If a conversation with this id does not already exist, a new conversation will be created.
   */
  conversation_id?: string;
  /**
   * Dictates how the prompt will be constructed. Defaults to AUTO when connectors are specified and OFF in all other cases.
   * With prompt_truncation set to "AUTO", some elements from chat_history and documents will be dropped in an attempt to construct
   * a prompt that fits within the model's context length limit.
   * With prompt_truncation set to "OFF", no elements will be dropped. If the sum of the inputs exceeds the model's context length limit,
   * a TooManyTokens error will be returned.
   */
  prompt_truncation?: chatPromptTruncation;
  /**
   * Currently only accepts {"id": "web-search"}.
   * When specified, the model's reply will be enriched with information found by quering each of the connectors (RAG).
   */
  connectors?: chatConnector[];
  /**
   * Defaults to false.
   * When true, the response will only contain a list of generated search queries, but no search will take place,
   * and no reply from the model to the user's message will be generated.
   */
  search_queries_only?: boolean;

  documents?: chatDocument[];
  /**
   * Defaults to "accurate".
   * Dictates the approach taken to generating citations as part of the RAG flow by allowing the user to specify whether
   * they want "accurate" results or "fast" results.
   */
  citation_quality?: chatCitationQuality;
  /**
   * Defaults to 0.3
   * A non-negative float that tunes the degree of randomness in generation.
   * Lower temperatures mean less random generations, and higher temperatures mean more random generations.
   */
  temperature?: number;
}

export type cohereParameters =
  | generateRequest
  | embedRequest
  | classifyRequest
  | classifyWithPresetRequest
  | tokenizeRequest
  | detokenizeRequest
  | detectLanguageRequest
  | chatRequest;

/* -- responses -- */
export interface generateResponse {
  generations: {
    text: string;
    likelihood?: number;
    token_likelihoods?: [
      {
        token: string;
        likelihood: number;
      }
    ];
  }[];
  meta?: metaResponse;
}

export interface tokenizeResponse {
  /** An array of integers, representing the token ids for the specified text. */
  tokens: number[];
  /** An array of string representations for each token */
  token_strings: string[];
  meta?: metaResponse;
}

export interface detokenizeResponse {
  /** A string representing the list of tokens. */
  text: string;
  meta?: metaResponse;
}

export interface embedResponse {
  /** An array of embeddings, where each embedding is an array of floats. The length of the embeddings
   * array will be the same as the length of the original texts array.
   */
  embeddings: number[][];
  meta?: metaResponse;
}

export interface classifyResponse {
  classifications: {
    /** The input that is being classified. */
    input: string;
    /** The predicted label for the input. */
    prediction: string;
    /** Confidence score for the predicted label. */
    confidence: number;
    /** A map of predictions for each option. */
    labels: { [label: string]: { confidence: number } };
  }[];
  meta?: metaResponse;
}

export interface detectLanguageResponse {
  results: {
    /** Code of the language eg. "fr". */
    language_code: string;
    /** Name of the language eg. "French". */
    language_name: string;
  }[];
  meta?: metaResponse;
}

export interface summarizeResponse {
  id: string;
  summary: string;
  meta?: metaResponse;
}

interface chatCitationResponse {
  start: number;
  end: number;
  text: string;
  document_ids: string[];
}

interface chatDocumentResponse {
  id: string;
  [key: string]: string | undefined;
}

interface chatSearchQueryResponse {
  text: string;
  generation_id: string;
}

interface chatSearchResultsResponse {
  search_query: chatHistory;
  connector: chatConnector;
  document_ids: string[];
}

interface tokenCount {
  prompt_tokens: number;
  response_tokens: number;
  total_tokens: number;
  billed_tokens: number;
}

interface baseChatResponse {
  response_id: string;
  meta?: metaResponse;
}

export interface nonStreamedChatResponse extends baseChatResponse {
  token_count: tokenCount;
  text: string;
  generation_id: string;
  conversation_id?: string;
  citations?: chatCitationResponse[];
  documents?: chatDocumentResponse[];
  search_queries?: chatSearchQueryResponse[];
  search_results?: chatSearchResultsResponse[];
}

export interface searchQueriesOnlyChatResponse extends baseChatResponse {
  is_search_required: boolean;
  search_queries: chatSearchQueryResponse[];
}

export enum streamedChatResponseEventTypes {
  STREAM_START = "stream-start",
  SEARCH_QUERIES_GENERATION = "search-queries-generation",
  SEARCH_RESULTS = "search-results",
  TEXT_GENERATION = "text-generation",
  CITATION_GENERATION = "citation-generation",
  STREAM_END = "stream-end",
}

interface baseStreamResponse {
  is_finished: boolean;
  event_type: streamedChatResponseEventTypes;
}

export interface streamStartResponse extends baseStreamResponse {
  generation_id: string;
}

export interface searchQueriesGenerationResponse extends baseStreamResponse {
  search_queries: chatSearchQueryResponse[];
}

export interface searchResultsResponse extends baseStreamResponse {
  search_results: chatSearchResultsResponse[];
}

export interface textGenerationResponse extends baseStreamResponse {
  text: string;
}

export interface citationGenerationResponse extends baseStreamResponse {
  citations: chatCitationResponse[];
}

export enum streamFinishReason {
  COMPLETE = "COMPLETE",
  ERROR_LIMIT = "ERROR_LIMIT",
  MAX_TOKENS = "MAX_TOKENS",
  ERROR = "ERROR",
  ERROR_TOXIC = "ERROR_TOXIC",
}
export interface streamEndResponse extends baseStreamResponse {
  finish_reason: streamFinishReason;
  response: nonStreamedChatResponse | searchQueriesOnlyChatResponse;
}

export type streamedChatResponse =
  | streamStartResponse
  | searchQueriesGenerationResponse
  | searchResultsResponse
  | textGenerationResponse
  | citationGenerationResponse
  | streamEndResponse;

export type chatResponse =
  | nonStreamedChatResponse
  | searchQueriesOnlyChatResponse
  | string;

export interface metaResponse {
  api_version: APIVersionMeta;
  warnings?: string[];
}

export interface APIVersionMeta {
  version: string;
  is_deprecated?: boolean;
  is_experimental?: boolean;
}

export interface error {
  /** Text explaining what went wrong. */
  message?: string;
}

export type responseBody =
  | generateResponse
  | embedResponse
  | classifyResponse
  | tokenizeResponse
  | detokenizeResponse
  | detectLanguageResponse
  | summarizeResponse
  | chatResponse
  | error;
