/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "..";
import * as Cohere from "../../api";
import * as core from "../../core";

export const Connector: core.serialization.ObjectSchema<serializers.Connector.Raw, Cohere.Connector> =
    core.serialization.object({
        id: core.serialization.string(),
        organizationId: core.serialization.property("organization_id", core.serialization.string().optional()),
        name: core.serialization.string(),
        description: core.serialization.string().optional(),
        url: core.serialization.string().optional(),
        createdAt: core.serialization.property("created_at", core.serialization.date()),
        updatedAt: core.serialization.property("updated_at", core.serialization.date()),
        excludes: core.serialization.list(core.serialization.string()).optional(),
        authType: core.serialization.property("auth_type", core.serialization.string().optional()),
        oauth: core.serialization.lazyObject(async () => (await import("..")).ConnectorOAuth).optional(),
        authStatus: core.serialization.property(
            "auth_status",
            core.serialization.lazy(async () => (await import("..")).ConnectorAuthStatus).optional()
        ),
        active: core.serialization.boolean().optional(),
        continueOnFailure: core.serialization.property("continue_on_failure", core.serialization.boolean().optional()),
    });

export declare namespace Connector {
    interface Raw {
        id: string;
        organization_id?: string | null;
        name: string;
        description?: string | null;
        url?: string | null;
        created_at: string;
        updated_at: string;
        excludes?: string[] | null;
        auth_type?: string | null;
        oauth?: serializers.ConnectorOAuth.Raw | null;
        auth_status?: serializers.ConnectorAuthStatus.Raw | null;
        active?: boolean | null;
        continue_on_failure?: boolean | null;
    }
}