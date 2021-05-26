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
  text: string
}

export interface similarities {
  similarities: number[]
}

export interface embeddings {
  embeddings: number[][]
}

export interface likelihoods {
  likelihoods: number[]
}

export interface token_likelihoods {
  likelihood: number,
  token_likelihoods: {
    token: string,
    likelihood?: number
  }
}

export interface error {
  msg ?: string
}

export type responseBody = text | similarities | embeddings | likelihoods | token_likelihoods | error;