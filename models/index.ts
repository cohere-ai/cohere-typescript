export interface cohereResponse<T> {
  statusCode: number | undefined;
  body: T;
}

/*-- types --*/
export interface extractEntity {
  type: string;
  value: string;
}

export interface extractExample {
  text: string;
  entities: extractEntity[];
}

export interface extraction {
  id: string;
  text: string;
  entities: extractEntity[];
}

/*-- requests --*/
interface generateBaseRequest {
  /** Denotes the model to be used. Defaults to the best performing model */
  model?: string;
  /** Represents the prompt or text to be completed. */
  prompt?: string;
  /** Denotes the number of tokens to predict per generation. */
  max_tokens?: number;
  /** The share reference of a custom playground preset */
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
  /** A stop sequence will cut off your generation at the end of the sequence. Providing multiple
   * stop sequences in the array will cut the generation at the first stop sequence in the generation,
   * if applicable.
   */
  stop_sequences?: string[];
  /** One of GENERATION|ALL|NONE to specify how and if the token likelihoods are returned with
   * the response. If GENERATION is selected, the token likelihoods will only be provided for generated
   * text. If ALL is selected, the token likelihoods will be provided both for the prompt and the generated
   * text.
   */
  return_likelihoods?: "GENERATION" | "ALL" | "NONE";
}

export interface generateRequest extends generateBaseRequest {
  prompt: string;
  max_tokens: number;
}

export interface generateWithPresetRequest extends generateBaseRequest {
  preset: string;
}

export interface embedRequest {
  /** Denotes the model to be used. Defaults to the best performing model */
  model?: string;
  /** An array of strings for the model to embed. */
  texts: string[];
  /** Specifies how the API will handle inputs longer than the maximum token length. */
  truncate?: "NONE" | "LEFT" | "RIGHT";
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
  /** An optional string to append onto every example and text prior to the label. */
  outputIndicator?: string;
  /** An optional string representing what you'd like the model to do. */
  taskDescription?: string;
}

export interface classifyRequest extends classifyBaseRequest {
  inputs: string[];
  examples: { text: string; label: string }[];
}

export interface classifyWithPresetRequest extends classifyBaseRequest {
  preset: string;
}

export interface tokenizeRequest {
  /** The text to be tokenized */
  text: string;
}

export interface extractRequest {
  examples: extractExample[];
  texts: string[];
}

export type cohereParameters =
  | generateRequest
  | generateWithPresetRequest
  | embedRequest
  | classifyRequest
  | classifyWithPresetRequest
  | extractRequest
  | tokenizeRequest;

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
}

export interface tokenizeResponse {
  /** An array of integers, representing the token ids for the specified text. */
  tokens: number[];
  /** An array of string representations for each token */
  token_strings: string[];
}

export interface embedResponse {
  /** An array of embeddings, where each embedding is an array of floats. The length of the embeddings
   * array will be the same as the length of the original texts array.
   */
  embeddings: number[][];
}

export interface classifyResponse {
  classifications: {
    /** The input that is being classified. */
    input: string;
    /** The predicted label for the input. */
    prediction: string;
    /** The confidence score for each option. */
    confidences: { option: string; confidence: number }[];
  }[];
}

export interface extractResponse {
  results: extraction[];
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
  | error;
