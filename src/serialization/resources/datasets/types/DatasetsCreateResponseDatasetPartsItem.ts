/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as Cohere from "../../../../api/index";
import * as core from "../../../../core";

export const DatasetsCreateResponseDatasetPartsItem: core.serialization.ObjectSchema<
    serializers.DatasetsCreateResponseDatasetPartsItem.Raw,
    Cohere.DatasetsCreateResponseDatasetPartsItem
> = core.serialization.object({
    name: core.serialization.string().optional(),
    numRows: core.serialization.property("num_rows", core.serialization.number().optional()),
    samples: core.serialization.list(core.serialization.string()).optional(),
    partKind: core.serialization.property("part_kind", core.serialization.string().optional()),
});

export declare namespace DatasetsCreateResponseDatasetPartsItem {
    interface Raw {
        name?: string | null;
        num_rows?: number | null;
        samples?: string[] | null;
        part_kind?: string | null;
    }
}