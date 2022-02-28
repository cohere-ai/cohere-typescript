export interface cohereResponse<T> {
  statusCode: number | undefined;
  body: T;
}

/*-- function parameters --*/
export interface generate {
  prompt: string;
  max_tokens: number;
  num_generations?: number;
  temperature: number;
  k?: number;
  p?: number;
  presence_penalty?: number;
  stop_sequences?: string[];
  return_likelihoods?: 'GENERATION' | 'ALL' | 'NONE';
}

export interface embed {
  texts: string[];
  truncate?: 'NONE' | 'LEFT' | 'RIGHT';
}

export interface chooseBest {
  query: string;
  options: string[];
  mode: 'PREPEND_OPTION' | 'APPEND_OPTION';
}

export interface classify {
  /** An optional string representing what you'd like the model to do. */
  task?: string;
  /** An array of strings that you would like to classify. */
  texts: string[];
  /** An array of examples representing examples and the corresponding label. */
  examples: { text: string; label: string }[];
  /** An optional string to append onto every example and text prior to the label. */
  prompt?: string;
}

export type cohereParameters = generate | embed | chooseBest | classify;

/* -- responses -- */
export interface text {
  text: string;
  likelihood: number;
  token_likelihoods?: {
    token: string;
    likelihood?: number;
  };
  [key: string]: any;
}

export interface embeddings {
  embeddings: number[][];
  [key: string]: any;
}

export interface scores {
  scores: number[];
  tokens: string[][];
  token_log_likelihoods: number[][];
  [key: string]: any;
}

export interface token_likelihoods {
  likelihood: number;
  token_likelihoods: {
    token: string;
    likelihood?: number;
  };
  [key: string]: any;
}

export interface classifications {
  classifications: {
    /** The text that is being classified. */
    text: string;
    /** The predicted label for the text. */
    prediction: string;
    /** The confidence score for each label. */
    confidences: { label: string; confidence: number }[];
  }[];
}

export interface error {
  message?: string;
  [key: string]: any;
}

export type responseBody =
  | text
  | embeddings
  | scores
  | token_likelihoods
  | classifications
  | error;
