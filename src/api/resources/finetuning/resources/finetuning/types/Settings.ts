/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Cohere from "../../../../../index";

/**
 * The configuration used for fine-tuning.
 */
export interface Settings {
    /** The base model to fine-tune. */
    baseModel: Cohere.finetuning.BaseModel;
    /** The data used for training and evaluating the fine-tuned model. */
    datasetId: string;
    /** Fine-tuning hyper-parameters. */
    hyperparameters?: Cohere.finetuning.Hyperparameters;
    /** read-only. Whether the model is single-label or multi-label (only for classification). */
    multiLabel?: boolean;
}
