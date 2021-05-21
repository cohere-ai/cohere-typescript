
export interface cohereResponse {
  statusCode: number | undefined;
  body: object;
}

export interface cohereError {
  response?: {
    status?: number,
    data?: {
      message?: string
    }
  };
  message?: string;
}


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
