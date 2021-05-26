import https = require('https');
import { cohereResponse, cohereParameters, responseBody } from '../models';
import errors from './error_service'

interface APIService {
  init(key: string): void;
  post(endpoint: string, data: cohereParameters): Promise<cohereResponse<responseBody>>;
}

enum URL {
  COHERE_API = "api.cohere.ai"
}

class APIImpl implements APIService {
  private COHERE_API_KEY = '';

  public init(key: string): void {
    this.COHERE_API_KEY = key;
  }

  public async post(endpoint: string, data: cohereParameters): Promise<cohereResponse<responseBody>> {
    if (!this.COHERE_API_KEY) return new Promise(resolve=> resolve(errors.specificError('API_KEY_MISSING', 403)));
    return new Promise((resolve, reject) => {
      try {
        // workaround for js projects that pass json strings.
        data = JSON.parse(`${data}`);
      } catch(e){}
      const reqData = JSON.stringify(data);

      const req = https.request({
        hostname: URL.COHERE_API,
        path: endpoint,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': reqData.length,
          'Authorization': `Bearer ${this.COHERE_API_KEY}`
        },
      }, (res) => {
        const data: Uint8Array[] = [];
        res.on('data', (chunk) => data.push(chunk));
        res.on('end', () => {
          resolve({
            statusCode: res.statusCode,
            body: JSON.parse(Buffer.concat(data).toString())
          })
        })
      })

      req.on('error', (error: Record<string, unknown>) => reject(errors.handleError(error)));

      req.write(reqData);
    })
  }
}

const API = new APIImpl();
export = API;