/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as Cohere from "../../../../api/index";
import * as core from "../../../../core";
import { EmbeddingType } from "../../../types/EmbeddingType";

export const Images: core.serialization.ObjectSchema<serializers.Images.Raw, Cohere.Images> = core.serialization.object(
    {
        images: core.serialization.list(core.serialization.string()),
        model: core.serialization.string(),
        embeddingTypes: core.serialization.property(
            "embedding_types",
            core.serialization.list(EmbeddingType).optional()
        ),
    }
);

export declare namespace Images {
    interface Raw {
        images: string[];
        model: string;
        embedding_types?: EmbeddingType.Raw[] | null;
    }
}
