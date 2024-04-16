/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../..";
import * as Cohere from "../../../api";
import * as core from "../../../core";
import { RerankRequestDocumentsItem } from "../../types/RerankRequestDocumentsItem";

export const RerankRequest: core.serialization.Schema<serializers.RerankRequest.Raw, Cohere.RerankRequest> =
    core.serialization.object({
        model: core.serialization.string().optional(),
        query: core.serialization.string(),
        documents: core.serialization.list(RerankRequestDocumentsItem),
        topN: core.serialization.property("top_n", core.serialization.number().optional()),
        rankFields: core.serialization.property(
            "rank_fields",
            core.serialization.list(core.serialization.string()).optional()
        ),
        returnDocuments: core.serialization.property("return_documents", core.serialization.boolean().optional()),
        maxChunksPerDoc: core.serialization.property("max_chunks_per_doc", core.serialization.number().optional()),
    });

export declare namespace RerankRequest {
    interface Raw {
        model?: string | null;
        query: string;
        documents: RerankRequestDocumentsItem.Raw[];
        top_n?: number | null;
        rank_fields?: string[] | null;
        return_documents?: boolean | null;
        max_chunks_per_doc?: number | null;
    }
}
