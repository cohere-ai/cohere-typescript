/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../index";
import * as Cohere from "../../api/index";
import * as core from "../../core";
import { TextResponseFormat } from "./TextResponseFormat";
import { JsonResponseFormat } from "./JsonResponseFormat";

export const ResponseFormat: core.serialization.Schema<serializers.ResponseFormat.Raw, Cohere.ResponseFormat> =
    core.serialization
        .union("type", {
            text: TextResponseFormat,
            json_object: JsonResponseFormat,
        })
        .transform<Cohere.ResponseFormat>({
            transform: (value) => value,
            untransform: (value) => value,
        });

export declare namespace ResponseFormat {
    type Raw = ResponseFormat.Text | ResponseFormat.JsonObject;

    interface Text extends TextResponseFormat.Raw {
        type: "text";
    }

    interface JsonObject extends JsonResponseFormat.Raw {
        type: "json_object";
    }
}
