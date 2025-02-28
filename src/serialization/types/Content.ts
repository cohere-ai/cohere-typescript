/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../index";
import * as Cohere from "../../api/index";
import * as core from "../../core";
import { TextContent } from "./TextContent";
import { ImageContent } from "./ImageContent";

export const Content: core.serialization.Schema<serializers.Content.Raw, Cohere.Content> = core.serialization
    .union("type", {
        text: TextContent,
        image_url: ImageContent,
    })
    .transform<Cohere.Content>({
        transform: (value) => value,
        untransform: (value) => value,
    });

export declare namespace Content {
    type Raw = Content.Text | Content.ImageUrl;

    interface Text extends TextContent.Raw {
        type: "text";
    }

    interface ImageUrl extends ImageContent.Raw {
        type: "image_url";
    }
}
