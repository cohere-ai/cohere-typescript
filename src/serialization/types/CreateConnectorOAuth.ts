/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../index";
import * as Cohere from "../../api/index";
import * as core from "../../core";

export const CreateConnectorOAuth: core.serialization.ObjectSchema<
    serializers.CreateConnectorOAuth.Raw,
    Cohere.CreateConnectorOAuth
> = core.serialization.object({
    clientId: core.serialization.property("client_id", core.serialization.string().optional()),
    clientSecret: core.serialization.property("client_secret", core.serialization.string().optional()),
    authorizeUrl: core.serialization.property("authorize_url", core.serialization.string().optional()),
    tokenUrl: core.serialization.property("token_url", core.serialization.string().optional()),
    scope: core.serialization.string().optional(),
});

export declare namespace CreateConnectorOAuth {
    interface Raw {
        client_id?: string | null;
        client_secret?: string | null;
        authorize_url?: string | null;
        token_url?: string | null;
        scope?: string | null;
    }
}
