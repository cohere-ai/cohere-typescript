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
  handleError(error: cohereError): cohereResponse<error>;
}

class errorImpl implements errorService {
  public handleError(error: cohereError): cohereResponse<error> {
    const status = error.response?.status || 500;
    const message = error.response?.data?.message || error.message;
    return {
      statusCode: status,
      body: {
        message: message,
      }
    };
  }
}

const errors = new errorImpl();
export = errors;
