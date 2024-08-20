import { CohereClient } from "./Client";

export class CustomClient extends CohereClient {
    constructor(protected readonly _options: CohereClient.Options = {}) {
        try {
            // if url ends with /v1, drop it for back compat
            const match = /\/v1\/?$/
            const fixed = _options.environment?.toString().replace(match, "");
            if (fixed !== _options.environment?.toString()) {
                _options.environment = fixed
            }
        } catch { }

        super(_options)
    }
}