/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../index";
import * as Cohere from "../../api/index";
import * as core from "../../core";

export const ChatRequestCitationQuality: core.serialization.Schema<
    serializers.ChatRequestCitationQuality.Raw,
    Cohere.ChatRequestCitationQuality
> = core.serialization.enum_(["fast", "accurate", "off"]);

export declare namespace ChatRequestCitationQuality {
    type Raw = "fast" | "accurate" | "off";
}
