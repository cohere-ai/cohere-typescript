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
    private readonly bearerAuthProvider: BearerAuthProvider;

    constructor(private readonly options: BearerAuthProvider.Options) {
        this.bearerAuthProvider = new BearerAuthProvider(options);
    }

    public async getAuthRequest(args: { endpointMetadata?: core.EndpointMetadata } = {}): Promise<core.AuthRequest> {
        const token = (await core.Supplier.get(this.options.token)) ?? process.env?.CO_API_KEY;
        if (token === "") {
            return { headers: {} };
        }
        return this.bearerAuthProvider.getAuthRequest(args);
    }
}

/**
 * Resolves auth through {@link OptionalBearerAuthProvider} unless the caller supplied their own
 * auth provider.
 */
export function withOptionalAuth<T extends { token?: unknown; authProvider?: core.AuthProvider }>(options: T): T {
    return {
        ...options,
        authProvider: options.authProvider ?? new OptionalBearerAuthProvider(options as BearerAuthProvider.Options),
    };
}
