export interface cohereResponse <T>{
  statusCode: number | undefined;
  body: T;
}

/*-- function parameters --*/
export interface generate {
  prompt: string;
  max_tokens: number;
  temperature: number;
  k?: number;
  p?: number;
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
  [key: string]: any
}

export interface embeddings {
  embeddings: number[][]
  [key: string]: any,
}

export interface likelihoods {
  likelihoods: number[],
  tokens: string[][],
  token_log_likelihoods: number[][],
  [key: string]: any,
}

export interface token_likelihoods {
  likelihood: number,
  token_likelihoods: {
    token: string,
    likelihood?: number
  }
  [key: string]: any,
}

export interface error {
  message ?: string
  [key: string]: any,
}

export type responseBody = text | similarities | embeddings | likelihoods | token_likelihoods | error;