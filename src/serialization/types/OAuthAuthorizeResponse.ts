/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../index";
import * as Cohere from "../../api/index";
import * as core from "../../core";

export const OAuthAuthorizeResponse: core.serialization.ObjectSchema<
    serializers.OAuthAuthorizeResponse.Raw,
    Cohere.OAuthAuthorizeResponse
> = core.serialization.object({
    redirectUrl: core.serialization.property("redirect_url", core.serialization.string().optional()),
});

export declare namespace OAuthAuthorizeResponse {
    interface Raw {
        redirect_url?: string | null;
    }
}
