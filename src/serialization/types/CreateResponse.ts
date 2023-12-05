/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "..";
import * as Cohere from "../../api";
import * as core from "../../core";

export const CreateResponse: core.serialization.ObjectSchema<serializers.CreateResponse.Raw, Cohere.CreateResponse> =
    core.serialization.object({
        connector: core.serialization.lazyObject(async () => (await import("..")).Connector),
    });

export declare namespace CreateResponse {
    interface Raw {
        connector: serializers.Connector.Raw;
    }
}
