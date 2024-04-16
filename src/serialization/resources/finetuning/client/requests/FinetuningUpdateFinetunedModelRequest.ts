/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../..";
import * as Cohere from "../../../../../api";
import * as core from "../../../../../core";
import { Settings } from "../../resources/finetuning/types/Settings";
import { Status } from "../../resources/finetuning/types/Status";

export const FinetuningUpdateFinetunedModelRequest: core.serialization.Schema<
    serializers.FinetuningUpdateFinetunedModelRequest.Raw,
    Cohere.FinetuningUpdateFinetunedModelRequest
> = core.serialization.object({
    name: core.serialization.string(),
    creatorId: core.serialization.property("creator_id", core.serialization.string().optional()),
    organizationId: core.serialization.property("organization_id", core.serialization.string().optional()),
    settings: Settings,
    status: Status.optional(),
    createdAt: core.serialization.property("created_at", core.serialization.date().optional()),
    updatedAt: core.serialization.property("updated_at", core.serialization.date().optional()),
    completedAt: core.serialization.property("completed_at", core.serialization.date().optional()),
    lastUsed: core.serialization.property("last_used", core.serialization.date().optional()),
});

export declare namespace FinetuningUpdateFinetunedModelRequest {
    interface Raw {
        name: string;
        creator_id?: string | null;
        organization_id?: string | null;
        settings: Settings.Raw;
        status?: Status.Raw | null;
        created_at?: string | null;
        updated_at?: string | null;
        completed_at?: string | null;
        last_used?: string | null;
    }
}
