/**
 * This file was auto-generated by Fern from our API Definition.
 */

export interface LogprobItem {
    /** The text chunk for which the log probabilities was calculated. */
    text?: string;
    /** The token ids of each token used to construct the text chunk. */
    tokenIds: number[];
    /** The log probability of each token used to construct the text chunk. */
    logprobs?: number[];
}
