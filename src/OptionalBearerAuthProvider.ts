import { BearerAuthProvider } from "./auth/BearerAuthProvider";
import * as core from "./core";

/**
 * Auth provider that sends no `Authorization` header when the token is an empty string.
 *
 * Clients created with `new CohereClient({ token: "" })` can talk to a proxy or a self-hosted
 * deployment that performs its own authentication. Any other token behaves exactly like the
 * generated {@link BearerAuthProvider}.
 */
export class OptionalBearerAuthProvider implements core.AuthProvider {
    constructor(private readonly options: BearerAuthProvider.Options) {}

    public async getAuthRequest(args: { endpointMetadata?: core.EndpointMetadata } = {}): Promise<core.AuthRequest> {
        const token = (await core.Supplier.get(this.options.token)) ?? process.env?.CO_API_KEY;
        if (token === "") {
            return { headers: {} };
        }
        // Delegate with the already-resolved token so that a token supplier is invoked exactly
        // once per request. Resolving here and then letting BearerAuthProvider resolve again would
        // double the calls to e.g. `token: async () => refreshOAuthToken()`, and a supplier whose
        // value changed between the two calls would send `Bearer ` after passing the check above.
        // BearerAuthProvider still owns the env fallback, the missing-auth error and the header.
        return new BearerAuthProvider({ ...this.options, token }).getAuthRequest(args);
    }
}

/**
 * Resolves auth through {@link OptionalBearerAuthProvider} unless the caller supplied their own
 * auth provider.
 */
export function withOptionalAuth<T extends { token?: unknown; authProvider?: core.AuthProvider }>(
    options: T | undefined,
): T {
    const resolved = (options ?? {}) as T;
    return {
        ...resolved,
        authProvider: resolved.authProvider ?? new OptionalBearerAuthProvider(resolved as BearerAuthProvider.Options),
    };
}
