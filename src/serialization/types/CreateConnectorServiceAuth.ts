/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "..";
import * as Cohere from "../../api";
import * as core from "../../core";

export const CreateConnectorServiceAuth: core.serialization.ObjectSchema<
    serializers.CreateConnectorServiceAuth.Raw,
    Cohere.CreateConnectorServiceAuth
> = core.serialization.object({
    type: core.serialization.string(),
    token: core.serialization.string(),
});

export declare namespace CreateConnectorServiceAuth {
    interface Raw {
        type: string;
        token: string;
    }
}