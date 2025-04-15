/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Cohere from "../index";

/**
 * Describes the truncation strategy for when the prompt exceeds the context length. Defaults to 'none'
 */
export type TruncationStrategy = Cohere.TruncationStrategy.Auto | Cohere.TruncationStrategy.None;

export namespace TruncationStrategy {
    export interface Auto extends Cohere.TruncationStrategyAutoPreserveOrder {
        type: "auto";
    }

    export interface None extends Cohere.TruncationStrategyNone {
        type: "none";
    }
}
