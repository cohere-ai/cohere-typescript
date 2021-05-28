import { cohereResponse, error } from '../models'
interface cohereError {
  response?: {
    status?: number,
    data?: {
      message?: string
    }
  };
  message?: string;
}

interface errorService {
  specificError(error: keyof typeof ERROR_MSG, statusCode: number): cohereResponse<error>;
  handleError(error: cohereError): cohereResponse<error>;
}

enum ERROR_MSG {
  GENERIC = "Whoops! Something went wrong with this request.",
  API_KEY_MISSING = "Whoops! You need to provide an API key before making requests. Try cohere.init(YOUR_KEY).",
  PARAMETERS_MISSING_OR_INVALID = "Uh oh. it looks like something is wrong with the parameters you provided."
}

class errorImpl implements errorService {
  public specificError(error: keyof typeof ERROR_MSG, statusCode: number): cohereResponse<error> {
    return {
      statusCode,
      body: {
        message: ERROR_MSG[error]
      }
    }
  }

  public handleError(error: cohereError): cohereResponse<error> {
    const status = error.response?.status || 500;
    const message = error.response?.data?.message || error.message || ERROR_MSG.GENERIC;
    return {
      statusCode: status,
      body: {
        message: message
      }
    };
  }
}

const errors = new errorImpl();
export = errors;
