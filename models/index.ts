export interface cohereResponse <T>{
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
  return_likelihoods?: "GENERATION" | "ALL" | "NONE";
}

export interface similarity {
  anchor: string;
  targets: string[];
}

export interface embed {
  texts: string[];
}

export interface chooseBest {
  query: string;
  options: string[];
  mode: "PREPEND_OPTION" | "APPEND_OPTION";
}

export interface likelihood {
  text: string;
}

export type cohereParameters = | generate | similarity | embed | chooseBest | likelihood;

/* -- responses -- */
export interface text {
  text: string,
  token_likelihoods?: {
    token: string,
    likelihood?: number
  },
  [key: string]: any,
}

export interface similarities {
  similarities: number[],
  [key: string]: any,
}

export interface embeddings {
  embeddings: number[][],
  [key: string]: any,
}

export interface scores {
  scores: number[],
  tokens: string[][],
  token_log_likelihoods: number[][],
  [key: string]: any,
}

export interface token_likelihoods {
  likelihood: number,
  token_likelihoods: {
    token: string,
    likelihood?: number,
  }
  [key: string]: any,
}

export interface error {
  message ?: string,
  [key: string]: any,
}

export type responseBody = text | similarities | embeddings | scores | token_likelihoods | error;
