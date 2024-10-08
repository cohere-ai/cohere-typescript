/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../index";
import * as Cohere from "../../api/index";
import * as core from "../../core";
import { ChatMessageV2 } from "./ChatMessageV2";

export const ChatMessages: core.serialization.Schema<serializers.ChatMessages.Raw, Cohere.ChatMessages> =
    core.serialization.list(ChatMessageV2);

export declare namespace ChatMessages {
    type Raw = ChatMessageV2.Raw[];
}
