/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as errors from "../../errors";

export class ForbiddenError extends errors.CohereError {
    constructor(body?: unknown) {
        super({
            message: "ForbiddenError",
            statusCode: 403,
            body: body,
        });
        Object.setPrototypeOf(this, ForbiddenError.prototype);
    }
}
