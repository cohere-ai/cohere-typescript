import https = require("https");
import { cohereResponse, cohereParameters, responseBody } from "../models";
import errors from "./error_service";

interface APIService {
  init(key: string): void;
  post(
    endpoint: string,
    data: cohereParameters
  ): Promise<cohereResponse<responseBody>>;
}

enum URL {
  COHERE_API = "api.cohere.ai",
}

class APIImpl implements APIService {
  private COHERE_API_KEY = "";
  private COHERE_VERSION = "/v1";

  public init(key: string): void {
    this.COHERE_API_KEY = key;
  }

  public async post(
    endpoint: string,
    data: cohereParameters
  ): Promise<cohereResponse<responseBody>> {
    return new Promise((resolve, reject) => {
      try {
        // workaround for js projects that pass json strings.
        data = JSON.parse(`${data}`);
      } catch (e) {}
      const reqData = JSON.stringify(data);
      const req = https.request(
        {
          hostname: URL.COHERE_API,
          path: this.COHERE_VERSION + endpoint,
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Content-Length": Buffer.byteLength(reqData, "utf8"),
            Authorization: `Bearer ${this.COHERE_API_KEY}`,
            "Request-Source": "node-sdk",
          },
          timeout: 5000,
        },
        (res) => {
          const data: Uint8Array[] = [];
          res.on("data", (chunk) => data.push(chunk));
          res.on("end", () => {
            if ("x-api-warning" in res.headers) {
              const warnHeader = res.headers["x-api-warning"];
              if (typeof warnHeader === "string") {
                console.warn("\x1b[33mWarning: %s\x1b[0m", warnHeader);
              } else {
                for (const warning in warnHeader) {
                  console.warn("\x1b[33mWarning: %s\x1b[0m", warning);
                }
              }
            }
            resolve({
              statusCode: res.statusCode,
              body: JSON.parse(Buffer.concat(data).toString()),
            });
          });
        }
      );

      req.on("error", (error: Record<string, unknown>) =>
        reject(errors.handleError(error))
      );

      req.write(reqData, "utf8");
      req.end();
    });
  }
}

const API = new APIImpl();
export = API;
