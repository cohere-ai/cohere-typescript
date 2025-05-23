/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as errors from "../../errors/index";

export class GatewayTimeoutError extends errors.CohereError {
    constructor(body?: unknown) {
        super({
            message: "GatewayTimeoutError",
            statusCode: 504,
            body: body,
        });
        Object.setPrototypeOf(this, GatewayTimeoutError.prototype);
    }
}
