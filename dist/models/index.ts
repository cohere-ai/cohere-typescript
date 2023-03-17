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

export type cohereParameters =
  | generateRequest
  | embedRequest
  | classifyRequest
  | classifyWithPresetRequest
  | tokenizeRequest
  | detokenizeRequest
  | detectLanguageRequest;

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
  | error;
