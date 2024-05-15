/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../index";
import * as Cohere from "../../api/index";
import * as core from "../../core";
import { AuthTokenType } from "./AuthTokenType";

export const CreateConnectorServiceAuth: core.serialization.ObjectSchema<
    serializers.CreateConnectorServiceAuth.Raw,
    Cohere.CreateConnectorServiceAuth
> = core.serialization.object({
    type: AuthTokenType,
    token: core.serialization.string(),
});

export declare namespace CreateConnectorServiceAuth {
    interface Raw {
        type: AuthTokenType.Raw;
        token: string;
    }
}
