import { CohereClient } from "./Client";

export class CustomClient extends CohereClient {
    constructor(options: CohereClient.Options = {}) {
        try {
            // if url ends with /v1, drop it for back compat
            const match = /\/v1\/?$/
            const fixed = options.environment?.toString().replace(match, "");
            if (fixed !== options.environment?.toString()) {
                options.environment = fixed
            }
        } catch { }

        super(options)
    }
}