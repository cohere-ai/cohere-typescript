/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../index";
import * as Cohere from "../../api/index";
import * as core from "../../core";
import { Content } from "./Content";

export const UserMessageContent: core.serialization.Schema<
    serializers.UserMessageContent.Raw,
    Cohere.UserMessageContent
> = core.serialization.undiscriminatedUnion([core.serialization.string(), core.serialization.list(Content)]);

export declare namespace UserMessageContent {
    type Raw = string | Content.Raw[];
}
