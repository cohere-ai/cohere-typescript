/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../index";
import * as Cohere from "../../../../../api/index";
import * as core from "../../../../../core";
import { EmbedInputType } from "../../../../types/EmbedInputType";
import { EmbeddingType } from "../../../../types/EmbeddingType";
import { CreateEmbedJobRequestTruncate } from "../../types/CreateEmbedJobRequestTruncate";

export const CreateEmbedJobRequest: core.serialization.Schema<
    serializers.CreateEmbedJobRequest.Raw,
    Cohere.CreateEmbedJobRequest
> = core.serialization.object({
    model: core.serialization.string(),
    datasetId: core.serialization.property("dataset_id", core.serialization.string()),
    inputType: core.serialization.property("input_type", EmbedInputType),
    name: core.serialization.string().optional(),
    embeddingTypes: core.serialization.property("embedding_types", core.serialization.list(EmbeddingType).optional()),
    truncate: CreateEmbedJobRequestTruncate.optional(),
});

export declare namespace CreateEmbedJobRequest {
    interface Raw {
        model: string;
        dataset_id: string;
        input_type: EmbedInputType.Raw;
        name?: string | null;
        embedding_types?: EmbeddingType.Raw[] | null;
        truncate?: CreateEmbedJobRequestTruncate.Raw | null;
    }
}
