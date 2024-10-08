/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../index";
import * as Cohere from "../../api/index";
import * as core from "../../core";
import { ToolContent } from "./ToolContent";

export const ToolMessageV2Content: core.serialization.Schema<
    serializers.ToolMessageV2Content.Raw,
    Cohere.ToolMessageV2Content
> = core.serialization.undiscriminatedUnion([core.serialization.string(), core.serialization.list(ToolContent)]);

export declare namespace ToolMessageV2Content {
    type Raw = string | ToolContent.Raw[];
}
