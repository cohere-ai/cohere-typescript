/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../..";
import * as Cohere from "../../../../../../api";
import * as core from "../../../../../../core";

export const FinetunedModel: core.serialization.ObjectSchema<
    serializers.finetuning.FinetunedModel.Raw,
    Cohere.finetuning.FinetunedModel
> = core.serialization.object({
    id: core.serialization.string().optional(),
    name: core.serialization.string(),
    creatorId: core.serialization.property("creator_id", core.serialization.string().optional()),
    organizationId: core.serialization.property("organization_id", core.serialization.string().optional()),
    settings: core.serialization.lazyObject(async () => (await import("../../../../..")).finetuning.Settings),
    status: core.serialization.lazy(async () => (await import("../../../../..")).finetuning.Status).optional(),
    createdAt: core.serialization.property("created_at", core.serialization.date().optional()),
    updatedAt: core.serialization.property("updated_at", core.serialization.date().optional()),
    completedAt: core.serialization.property("completed_at", core.serialization.date().optional()),
    lastUsed: core.serialization.property("last_used", core.serialization.date().optional()),
});

export declare namespace FinetunedModel {
    interface Raw {
        id?: string | null;
        name: string;
        creator_id?: string | null;
        organization_id?: string | null;
        settings: serializers.finetuning.Settings.Raw;
        status?: serializers.finetuning.Status.Raw | null;
        created_at?: string | null;
        updated_at?: string | null;
        completed_at?: string | null;
        last_used?: string | null;
    }
}
