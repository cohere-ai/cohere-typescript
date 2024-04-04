/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../..";
import * as Cohere from "../../../api";
import * as core from "../../../core";

export const TokenizeRequest: core.serialization.Schema<serializers.TokenizeRequest.Raw, Cohere.TokenizeRequest> =
    core.serialization.object({
        text: core.serialization.string(),
        model: core.serialization.string(),
    });

export declare namespace TokenizeRequest {
    interface Raw {
        text: string;
        model: string;
    }
}
