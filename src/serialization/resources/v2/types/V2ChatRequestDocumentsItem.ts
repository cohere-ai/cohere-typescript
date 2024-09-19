/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as Cohere from "../../../../api/index";
import * as core from "../../../../core";
import { Document } from "../../../types/Document";

export const V2ChatRequestDocumentsItem: core.serialization.Schema<
    serializers.V2ChatRequestDocumentsItem.Raw,
    Cohere.V2ChatRequestDocumentsItem
> = core.serialization.undiscriminatedUnion([core.serialization.string(), Document]);

export declare namespace V2ChatRequestDocumentsItem {
    type Raw = string | Document.Raw;
}
