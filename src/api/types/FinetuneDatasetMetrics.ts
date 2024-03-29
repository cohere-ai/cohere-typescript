/**
 * This file was auto-generated by Fern from our API Definition.
 */

export interface FinetuneDatasetMetrics {
    /** The number of tokens of valid examples that can be used for training. */
    trainableTokenCount?: string;
    /** The overall number of examples. */
    totalExamples?: string;
    /** The number of training examples. */
    trainExamples?: string;
    /** The size in bytes of all training examples. */
    trainSizeBytes?: string;
    /** Number of evaluation examples. */
    evalExamples?: string;
    /** The size in bytes of all eval examples. */
    evalSizeBytes?: string;
}
