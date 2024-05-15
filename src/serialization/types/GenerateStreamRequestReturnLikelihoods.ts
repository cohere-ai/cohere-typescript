/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../index";
import * as Cohere from "../../api/index";
import * as core from "../../core";

export const GenerateStreamRequestReturnLikelihoods: core.serialization.Schema<
    serializers.GenerateStreamRequestReturnLikelihoods.Raw,
    Cohere.GenerateStreamRequestReturnLikelihoods
> = core.serialization.enum_(["GENERATION", "ALL", "NONE"]);

export declare namespace GenerateStreamRequestReturnLikelihoods {
    type Raw = "GENERATION" | "ALL" | "NONE";
}
