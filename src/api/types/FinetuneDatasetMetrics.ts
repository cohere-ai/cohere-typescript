/**
 * This file was auto-generated by Fern from our API Definition.
 */

export interface FinetuneDatasetMetrics {
    /** The number of tokens of valid examples that can be used for training. */
    trainableTokenCount?: number;
    /** The overall number of examples. */
    totalExamples?: number;
    /** The number of training examples. */
    trainExamples?: number;
    /** The size in bytes of all training examples. */
    trainSizeBytes?: number;
    /** Number of evaluation examples. */
    evalExamples?: number;
    /** The size in bytes of all eval examples. */
    evalSizeBytes?: number;
}
