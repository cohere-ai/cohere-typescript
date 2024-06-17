/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as errors from "../../errors/index";
import * as Cohere from "../index";

export class UnprocessableEntityError extends errors.CohereError {
    constructor(body: Cohere.UnprocessableEntityErrorBody) {
        super({
            message: "UnprocessableEntityError",
            statusCode: 422,
            body: body,
        });
        Object.setPrototypeOf(this, UnprocessableEntityError.prototype);
    }
}
