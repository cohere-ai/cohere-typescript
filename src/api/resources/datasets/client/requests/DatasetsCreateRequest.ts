/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Cohere from "../../../../index";

/**
 * @example
 *     {
 *         name: "name",
 *         type: "embed-input"
 *     }
 */
export interface DatasetsCreateRequest {
    /**
     * The name of the uploaded dataset.
     */
    name: string;
    /**
     * The dataset type, which is used to validate the data. Valid types are `embed-input`, `reranker-finetune-input`, `single-label-classification-finetune-input`, `chat-finetune-input`, and `multi-label-classification-finetune-input`.
     */
    type: Cohere.DatasetType;
    /**
     * Indicates if the original file should be stored.
     */
    keepOriginalFile?: boolean;
    /**
     * Indicates whether rows with malformed input should be dropped (instead of failing the validation check). Dropped rows will be returned in the warnings field.
     */
    skipMalformedInput?: boolean;
    /**
     * List of names of fields that will be persisted in the Dataset. By default the Dataset will retain only the required fields indicated in the [schema for the corresponding Dataset type](https://docs.cohere.com/docs/datasets#dataset-types). For example, datasets of type `embed-input` will drop all fields other than the required `text` field. If any of the fields in `keep_fields` are missing from the uploaded file, Dataset validation will fail.
     */
    keepFields?: string | string[];
    /**
     * List of names of fields that will be persisted in the Dataset. By default the Dataset will retain only the required fields indicated in the [schema for the corresponding Dataset type](https://docs.cohere.com/docs/datasets#dataset-types). For example, Datasets of type `embed-input` will drop all fields other than the required `text` field. If any of the fields in `optional_fields` are missing from the uploaded file, Dataset validation will pass.
     */
    optionalFields?: string | string[];
    /**
     * Raw .txt uploads will be split into entries using the text_separator value.
     */
    textSeparator?: string;
    /**
     * The delimiter used for .csv uploads.
     */
    csvDelimiter?: string;
    /**
     * flag to enable dry_run mode
     */
    dryRun?: boolean;
}
