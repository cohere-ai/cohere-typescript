/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Cohere from "..";

export interface Dataset {
    /** The dataset ID */
    id: string;
    /** The name of the dataset */
    name: string;
    /** The creation date */
    createdAt: Date;
    /** The last update date */
    updatedAt: Date;
    datasetType: Cohere.DatasetType;
    validationStatus: Cohere.DatasetValidationStatus;
    /** Errors found during validation */
    validationError?: string;
    /** the avro schema of the dataset */
    schema?: string;
    requiredFields?: string[];
    preserveFields?: string[];
    /** the underlying files that make up the dataset */
    datasetParts?: Cohere.DatasetPart[];
    /** warnings found during validation */
    validationWarnings?: string[];
}