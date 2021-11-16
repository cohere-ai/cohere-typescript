import https = require('https');
import { cohereResponse, cohereParameters, responseBody } from '../models';
import errors from './error_service'

interface APIService {
  init(key: string, version?: string): void;
  post(endpoint: string, data: cohereParameters): Promise<cohereResponse<responseBody>>;
}

enum URL {
  COHERE_API = "api.cohere.ai"
}

class APIImpl implements APIService {
  private COHERE_API_KEY = '';
  private COHERE_VERSION = ''; 

  public init(key: string, version?: string): void {
    this.COHERE_API_KEY = key;

    if (version === undefined) {
      this.COHERE_VERSION = '2021-11-08'; // currently latest, update when we version better
    } else {
      this.COHERE_VERSION = version;
    }
  }

  public async post(endpoint: string, data: cohereParameters): Promise<cohereResponse<responseBody>> {
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
          'Cohere-Version': this.COHERE_VERSION,
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
