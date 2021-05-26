const https = require('https');
import { cohereResponse, responseBody } from '../models';
import errors from './error_service'

interface APIService {
  init(key: string): void;
  post(endpoint: string, data: object): Promise<cohereResponse<responseBody>>;
}

enum URL {
  COHERE_API = "api.cohere.ai"
}

class APIImpl implements APIService {
  private COHERE_API_KEY: string = '';

  public init(key: string): void {
    this.COHERE_API_KEY = key;
  }

  public async post(endpoint: string, data: any): Promise<cohereResponse<responseBody>> {
    if (!this.COHERE_API_KEY) return new Promise(resolve=> resolve(errors.specificError('API_KEY_MISSING', 403)));
    return new Promise((resolve, reject) => {
      try {
        data = JSON.parse(data);
      } catch (e) {};
      const reqData = JSON.stringify(data);

      let req = https.request({
        hostname: URL.COHERE_API,
        path: endpoint,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': reqData.length,
          'Authorization': `Bearer ${this.COHERE_API_KEY}`
        },
      }, (res: any) => {
        let data: any[] = [];
        res.on('data', (chunk: any) => data.push(chunk));
        res.on('end', () => {
          resolve({
            statusCode: res.statusCode,
            body: JSON.parse(Buffer.concat(data).toString())
          })
        })
      })

      req.on('error', (error: object) => reject(errors.handleError(error)));

      req.write(reqData);
    })
  }
}

let API = new APIImpl();
export = API;