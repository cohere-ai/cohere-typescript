/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../index";
import * as Cohere from "../../api/index";
import * as core from "../../core";
import { Citation } from "./Citation";

export const CitationStartEventDeltaMessage: core.serialization.ObjectSchema<
    serializers.CitationStartEventDeltaMessage.Raw,
    Cohere.CitationStartEventDeltaMessage
> = core.serialization.object({
    citations: Citation.optional(),
});

export declare namespace CitationStartEventDeltaMessage {
    interface Raw {
        citations?: Citation.Raw | null;
    }
}
