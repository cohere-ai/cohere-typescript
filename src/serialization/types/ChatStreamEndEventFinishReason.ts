/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../index";
import * as Cohere from "../../api/index";
import * as core from "../../core";

export const ChatStreamEndEventFinishReason: core.serialization.Schema<
    serializers.ChatStreamEndEventFinishReason.Raw,
    Cohere.ChatStreamEndEventFinishReason
> = core.serialization.enum_(["COMPLETE", "ERROR_LIMIT", "MAX_TOKENS", "ERROR", "ERROR_TOXIC"]);

export declare namespace ChatStreamEndEventFinishReason {
    type Raw = "COMPLETE" | "ERROR_LIMIT" | "MAX_TOKENS" | "ERROR" | "ERROR_TOXIC";
}
