/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "..";
import * as Cohere from "../../api";
import * as core from "../../core";

export const DeleteConnectorResponse: core.serialization.Schema<
    serializers.DeleteConnectorResponse.Raw,
    Cohere.DeleteConnectorResponse
> = core.serialization.record(core.serialization.string(), core.serialization.unknown());

export declare namespace DeleteConnectorResponse {
    type Raw = Record<string, unknown>;
}