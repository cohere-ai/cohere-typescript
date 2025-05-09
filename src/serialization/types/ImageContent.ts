/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../index";
import * as Cohere from "../../api/index";
import * as core from "../../core";
import { ImageUrl } from "./ImageUrl";

export const ImageContent: core.serialization.ObjectSchema<serializers.ImageContent.Raw, Cohere.ImageContent> =
    core.serialization.object({
        imageUrl: core.serialization.property("image_url", ImageUrl),
    });

export declare namespace ImageContent {
    interface Raw {
        image_url: ImageUrl.Raw;
    }
}
