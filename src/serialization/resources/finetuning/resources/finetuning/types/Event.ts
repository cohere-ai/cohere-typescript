/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../..";
import * as Cohere from "../../../../../../api";
import * as core from "../../../../../../core";
import { Status } from "./Status";

export const Event: core.serialization.ObjectSchema<serializers.finetuning.Event.Raw, Cohere.finetuning.Event> =
    core.serialization.object({
        userId: core.serialization.property("user_id", core.serialization.string().optional()),
        status: Status.optional(),
        createdAt: core.serialization.property("created_at", core.serialization.date().optional()),
    });

export declare namespace Event {
    interface Raw {
        user_id?: string | null;
        status?: Status.Raw | null;
        created_at?: string | null;
    }
}
