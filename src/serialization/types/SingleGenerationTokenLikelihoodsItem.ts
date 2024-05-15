/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../index";
import * as Cohere from "../../api/index";
import * as core from "../../core";

export const SingleGenerationTokenLikelihoodsItem: core.serialization.ObjectSchema<
    serializers.SingleGenerationTokenLikelihoodsItem.Raw,
    Cohere.SingleGenerationTokenLikelihoodsItem
> = core.serialization.object({
    token: core.serialization.string(),
    likelihood: core.serialization.number(),
});

export declare namespace SingleGenerationTokenLikelihoodsItem {
    interface Raw {
        token: string;
        likelihood: number;
    }
}
