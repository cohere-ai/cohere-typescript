/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as environments from "../../../../environments";
import * as core from "../../../../core";
import * as Cohere from "../../../index";
import * as serializers from "../../../../serialization/index";
import urlJoin from "url-join";
import * as stream from "stream";
import * as errors from "../../../../errors/index";

export declare namespace V2 {
    interface Options {
        environment?: core.Supplier<environments.CohereEnvironment | string>;
        token?: core.Supplier<core.BearerToken | undefined>;
        /** Override the X-Client-Name header */
        clientName?: core.Supplier<string | undefined>;
        fetcher?: core.FetchFunction;
    }

    interface RequestOptions {
        /** The maximum time to wait for a response in seconds. */
        timeoutInSeconds?: number;
        /** The number of times to retry the request. Defaults to 2. */
        maxRetries?: number;
        /** A hook to abort the request. */
        abortSignal?: AbortSignal;
        /** Override the X-Client-Name header */
        clientName?: string | undefined;
        /** Additional headers to include in the request. */
        headers?: Record<string, string>;
    }
}

export class V2 {
    constructor(protected readonly _options: V2.Options = {}) {}

    /**
     * Generates a text response to a user message. To learn how to use the Chat API and RAG follow our [Text Generation guides](https://docs.cohere.com/v2/docs/chat-api).
     *
     * Follow the [Migration Guide](https://docs.cohere.com/v2/docs/migrating-v1-to-v2) for instructions on moving from API v1 to API v2.
     */
    public async chatStream(
        request: Cohere.V2ChatStreamRequest,
        requestOptions?: V2.RequestOptions
    ): Promise<core.Stream<Cohere.StreamedChatResponseV2>> {
        const _response = await (this._options.fetcher ?? core.fetcher)<stream.Readable>({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.CohereEnvironment.Production,
                "v2/chat"
            ),
            method: "POST",
            headers: {
                Authorization: await this._getAuthorizationHeader(),
                "X-Client-Name":
                    (await core.Supplier.get(this._options.clientName)) != null
                        ? await core.Supplier.get(this._options.clientName)
                        : undefined,
                "X-Fern-Language": "JavaScript",
                "X-Fern-SDK-Name": "cohere-ai",
                "X-Fern-SDK-Version": "7.15.4",
                "User-Agent": "cohere-ai/7.15.4",
                "X-Fern-Runtime": core.RUNTIME.type,
                "X-Fern-Runtime-Version": core.RUNTIME.version,
                ...requestOptions?.headers,
            },
            contentType: "application/json",
            requestType: "json",
            body: {
                ...serializers.V2ChatStreamRequest.jsonOrThrow(request, {
                    unrecognizedObjectKeys: "passthrough",
                    allowUnrecognizedUnionMembers: true,
                    allowUnrecognizedEnumValues: true,
                }),
                stream: true,
            },
            responseType: "sse",
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 300000,
            maxRetries: requestOptions?.maxRetries,
            abortSignal: requestOptions?.abortSignal,
        });
        if (_response.ok) {
            return new core.Stream({
                stream: _response.body,
                parse: async (data) => {
                    return serializers.StreamedChatResponseV2.parseOrThrow(data, {
                        unrecognizedObjectKeys: "passthrough",
                        allowUnrecognizedUnionMembers: true,
                        allowUnrecognizedEnumValues: true,
                        skipValidation: true,
                        breadcrumbsPrefix: ["response"],
                    });
                },
                signal: requestOptions?.abortSignal,
                eventShape: {
                    type: "sse",
                    streamTerminator: "[DONE]",
                },
            });
        }

        if (_response.error.reason === "status-code") {
            switch (_response.error.statusCode) {
                case 400:
                    throw new Cohere.BadRequestError(_response.error.body);
                case 401:
                    throw new Cohere.UnauthorizedError(_response.error.body);
                case 403:
                    throw new Cohere.ForbiddenError(_response.error.body);
                case 404:
                    throw new Cohere.NotFoundError(_response.error.body);
                case 422:
                    throw new Cohere.UnprocessableEntityError(_response.error.body);
                case 429:
                    throw new Cohere.TooManyRequestsError(_response.error.body);
                case 498:
                    throw new Cohere.InvalidTokenError(_response.error.body);
                case 499:
                    throw new Cohere.ClientClosedRequestError(_response.error.body);
                case 500:
                    throw new Cohere.InternalServerError(_response.error.body);
                case 501:
                    throw new Cohere.NotImplementedError(_response.error.body);
                case 503:
                    throw new Cohere.ServiceUnavailableError(_response.error.body);
                case 504:
                    throw new Cohere.GatewayTimeoutError(_response.error.body);
                default:
                    throw new errors.CohereError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.body,
                    });
            }
        }

        switch (_response.error.reason) {
            case "non-json":
                throw new errors.CohereError({
                    statusCode: _response.error.statusCode,
                    body: _response.error.rawBody,
                });
            case "timeout":
                throw new errors.CohereTimeoutError("Timeout exceeded when calling POST /v2/chat.");
            case "unknown":
                throw new errors.CohereError({
                    message: _response.error.errorMessage,
                });
        }
    }

    /**
     * Generates a text response to a user message and streams it down, token by token. To learn how to use the Chat API with streaming follow our [Text Generation guides](https://docs.cohere.com/v2/docs/chat-api).
     *
     * Follow the [Migration Guide](https://docs.cohere.com/v2/docs/migrating-v1-to-v2) for instructions on moving from API v1 to API v2.
     *
     * @param {Cohere.V2ChatRequest} request
     * @param {V2.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Cohere.BadRequestError}
     * @throws {@link Cohere.UnauthorizedError}
     * @throws {@link Cohere.ForbiddenError}
     * @throws {@link Cohere.NotFoundError}
     * @throws {@link Cohere.UnprocessableEntityError}
     * @throws {@link Cohere.TooManyRequestsError}
     * @throws {@link Cohere.InvalidTokenError}
     * @throws {@link Cohere.ClientClosedRequestError}
     * @throws {@link Cohere.InternalServerError}
     * @throws {@link Cohere.NotImplementedError}
     * @throws {@link Cohere.ServiceUnavailableError}
     * @throws {@link Cohere.GatewayTimeoutError}
     *
     * @example
     *     await client.v2.chat({
     *         model: "model",
     *         messages: [{
     *                 role: "tool",
     *                 toolCallId: "messages",
     *                 content: "messages"
     *             }]
     *     })
     */
    public async chat(request: Cohere.V2ChatRequest, requestOptions?: V2.RequestOptions): Promise<Cohere.ChatResponse> {
        const _response = await (this._options.fetcher ?? core.fetcher)({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.CohereEnvironment.Production,
                "v2/chat"
            ),
            method: "POST",
            headers: {
                Authorization: await this._getAuthorizationHeader(),
                "X-Client-Name":
                    (await core.Supplier.get(this._options.clientName)) != null
                        ? await core.Supplier.get(this._options.clientName)
                        : undefined,
                "X-Fern-Language": "JavaScript",
                "X-Fern-SDK-Name": "cohere-ai",
                "X-Fern-SDK-Version": "7.15.4",
                "User-Agent": "cohere-ai/7.15.4",
                "X-Fern-Runtime": core.RUNTIME.type,
                "X-Fern-Runtime-Version": core.RUNTIME.version,
                ...requestOptions?.headers,
            },
            contentType: "application/json",
            requestType: "json",
            body: {
                ...serializers.V2ChatRequest.jsonOrThrow(request, {
                    unrecognizedObjectKeys: "passthrough",
                    allowUnrecognizedUnionMembers: true,
                    allowUnrecognizedEnumValues: true,
                }),
                stream: false,
            },
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 300000,
            maxRetries: requestOptions?.maxRetries,
            abortSignal: requestOptions?.abortSignal,
        });
        if (_response.ok) {
            return serializers.ChatResponse.parseOrThrow(_response.body, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
                skipValidation: true,
                breadcrumbsPrefix: ["response"],
            });
        }

        if (_response.error.reason === "status-code") {
            switch (_response.error.statusCode) {
                case 400:
                    throw new Cohere.BadRequestError(_response.error.body);
                case 401:
                    throw new Cohere.UnauthorizedError(_response.error.body);
                case 403:
                    throw new Cohere.ForbiddenError(_response.error.body);
                case 404:
                    throw new Cohere.NotFoundError(_response.error.body);
                case 422:
                    throw new Cohere.UnprocessableEntityError(_response.error.body);
                case 429:
                    throw new Cohere.TooManyRequestsError(_response.error.body);
                case 498:
                    throw new Cohere.InvalidTokenError(_response.error.body);
                case 499:
                    throw new Cohere.ClientClosedRequestError(_response.error.body);
                case 500:
                    throw new Cohere.InternalServerError(_response.error.body);
                case 501:
                    throw new Cohere.NotImplementedError(_response.error.body);
                case 503:
                    throw new Cohere.ServiceUnavailableError(_response.error.body);
                case 504:
                    throw new Cohere.GatewayTimeoutError(_response.error.body);
                default:
                    throw new errors.CohereError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.body,
                    });
            }
        }

        switch (_response.error.reason) {
            case "non-json":
                throw new errors.CohereError({
                    statusCode: _response.error.statusCode,
                    body: _response.error.rawBody,
                });
            case "timeout":
                throw new errors.CohereTimeoutError("Timeout exceeded when calling POST /v2/chat.");
            case "unknown":
                throw new errors.CohereError({
                    message: _response.error.errorMessage,
                });
        }
    }

    /**
     * This endpoint returns text embeddings. An embedding is a list of floating point numbers that captures semantic information about the text that it represents.
     *
     * Embeddings can be used to create text classifiers as well as empower semantic search. To learn more about embeddings, see the embedding page.
     *
     * If you want to learn more how to use the embedding model, have a look at the [Semantic Search Guide](https://docs.cohere.com/docs/semantic-search).
     *
     * @param {Cohere.V2EmbedRequest} request
     * @param {V2.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Cohere.BadRequestError}
     * @throws {@link Cohere.UnauthorizedError}
     * @throws {@link Cohere.ForbiddenError}
     * @throws {@link Cohere.NotFoundError}
     * @throws {@link Cohere.UnprocessableEntityError}
     * @throws {@link Cohere.TooManyRequestsError}
     * @throws {@link Cohere.InvalidTokenError}
     * @throws {@link Cohere.ClientClosedRequestError}
     * @throws {@link Cohere.InternalServerError}
     * @throws {@link Cohere.NotImplementedError}
     * @throws {@link Cohere.ServiceUnavailableError}
     * @throws {@link Cohere.GatewayTimeoutError}
     *
     * @example
     *     await client.v2.embed({
     *         model: "model",
     *         inputType: "search_document",
     *         embeddingTypes: ["float"]
     *     })
     */
    public async embed(
        request: Cohere.V2EmbedRequest,
        requestOptions?: V2.RequestOptions
    ): Promise<Cohere.EmbedByTypeResponse> {
        const _response = await (this._options.fetcher ?? core.fetcher)({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.CohereEnvironment.Production,
                "v2/embed"
            ),
            method: "POST",
            headers: {
                Authorization: await this._getAuthorizationHeader(),
                "X-Client-Name":
                    (await core.Supplier.get(this._options.clientName)) != null
                        ? await core.Supplier.get(this._options.clientName)
                        : undefined,
                "X-Fern-Language": "JavaScript",
                "X-Fern-SDK-Name": "cohere-ai",
                "X-Fern-SDK-Version": "7.15.4",
                "User-Agent": "cohere-ai/7.15.4",
                "X-Fern-Runtime": core.RUNTIME.type,
                "X-Fern-Runtime-Version": core.RUNTIME.version,
                ...requestOptions?.headers,
            },
            contentType: "application/json",
            requestType: "json",
            body: serializers.V2EmbedRequest.jsonOrThrow(request, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
            }),
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 300000,
            maxRetries: requestOptions?.maxRetries,
            abortSignal: requestOptions?.abortSignal,
        });
        if (_response.ok) {
            return serializers.EmbedByTypeResponse.parseOrThrow(_response.body, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
                skipValidation: true,
                breadcrumbsPrefix: ["response"],
            });
        }

        if (_response.error.reason === "status-code") {
            switch (_response.error.statusCode) {
                case 400:
                    throw new Cohere.BadRequestError(_response.error.body);
                case 401:
                    throw new Cohere.UnauthorizedError(_response.error.body);
                case 403:
                    throw new Cohere.ForbiddenError(_response.error.body);
                case 404:
                    throw new Cohere.NotFoundError(_response.error.body);
                case 422:
                    throw new Cohere.UnprocessableEntityError(_response.error.body);
                case 429:
                    throw new Cohere.TooManyRequestsError(_response.error.body);
                case 498:
                    throw new Cohere.InvalidTokenError(_response.error.body);
                case 499:
                    throw new Cohere.ClientClosedRequestError(_response.error.body);
                case 500:
                    throw new Cohere.InternalServerError(_response.error.body);
                case 501:
                    throw new Cohere.NotImplementedError(_response.error.body);
                case 503:
                    throw new Cohere.ServiceUnavailableError(_response.error.body);
                case 504:
                    throw new Cohere.GatewayTimeoutError(_response.error.body);
                default:
                    throw new errors.CohereError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.body,
                    });
            }
        }

        switch (_response.error.reason) {
            case "non-json":
                throw new errors.CohereError({
                    statusCode: _response.error.statusCode,
                    body: _response.error.rawBody,
                });
            case "timeout":
                throw new errors.CohereTimeoutError("Timeout exceeded when calling POST /v2/embed.");
            case "unknown":
                throw new errors.CohereError({
                    message: _response.error.errorMessage,
                });
        }
    }

    /**
     * This endpoint takes in a query and a list of texts and produces an ordered array with each text assigned a relevance score.
     *
     * @param {Cohere.V2RerankRequest} request
     * @param {V2.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Cohere.BadRequestError}
     * @throws {@link Cohere.UnauthorizedError}
     * @throws {@link Cohere.ForbiddenError}
     * @throws {@link Cohere.NotFoundError}
     * @throws {@link Cohere.UnprocessableEntityError}
     * @throws {@link Cohere.TooManyRequestsError}
     * @throws {@link Cohere.InvalidTokenError}
     * @throws {@link Cohere.ClientClosedRequestError}
     * @throws {@link Cohere.InternalServerError}
     * @throws {@link Cohere.NotImplementedError}
     * @throws {@link Cohere.ServiceUnavailableError}
     * @throws {@link Cohere.GatewayTimeoutError}
     *
     * @example
     *     await client.v2.rerank({
     *         model: "model",
     *         query: "query",
     *         documents: ["documents"]
     *     })
     */
    public async rerank(
        request: Cohere.V2RerankRequest,
        requestOptions?: V2.RequestOptions
    ): Promise<Cohere.V2RerankResponse> {
        const _response = await (this._options.fetcher ?? core.fetcher)({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.CohereEnvironment.Production,
                "v2/rerank"
            ),
            method: "POST",
            headers: {
                Authorization: await this._getAuthorizationHeader(),
                "X-Client-Name":
                    (await core.Supplier.get(this._options.clientName)) != null
                        ? await core.Supplier.get(this._options.clientName)
                        : undefined,
                "X-Fern-Language": "JavaScript",
                "X-Fern-SDK-Name": "cohere-ai",
                "X-Fern-SDK-Version": "7.15.4",
                "User-Agent": "cohere-ai/7.15.4",
                "X-Fern-Runtime": core.RUNTIME.type,
                "X-Fern-Runtime-Version": core.RUNTIME.version,
                ...requestOptions?.headers,
            },
            contentType: "application/json",
            requestType: "json",
            body: serializers.V2RerankRequest.jsonOrThrow(request, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
            }),
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 300000,
            maxRetries: requestOptions?.maxRetries,
            abortSignal: requestOptions?.abortSignal,
        });
        if (_response.ok) {
            return serializers.V2RerankResponse.parseOrThrow(_response.body, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
                skipValidation: true,
                breadcrumbsPrefix: ["response"],
            });
        }

        if (_response.error.reason === "status-code") {
            switch (_response.error.statusCode) {
                case 400:
                    throw new Cohere.BadRequestError(_response.error.body);
                case 401:
                    throw new Cohere.UnauthorizedError(_response.error.body);
                case 403:
                    throw new Cohere.ForbiddenError(_response.error.body);
                case 404:
                    throw new Cohere.NotFoundError(_response.error.body);
                case 422:
                    throw new Cohere.UnprocessableEntityError(_response.error.body);
                case 429:
                    throw new Cohere.TooManyRequestsError(_response.error.body);
                case 498:
                    throw new Cohere.InvalidTokenError(_response.error.body);
                case 499:
                    throw new Cohere.ClientClosedRequestError(_response.error.body);
                case 500:
                    throw new Cohere.InternalServerError(_response.error.body);
                case 501:
                    throw new Cohere.NotImplementedError(_response.error.body);
                case 503:
                    throw new Cohere.ServiceUnavailableError(_response.error.body);
                case 504:
                    throw new Cohere.GatewayTimeoutError(_response.error.body);
                default:
                    throw new errors.CohereError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.body,
                    });
            }
        }

        switch (_response.error.reason) {
            case "non-json":
                throw new errors.CohereError({
                    statusCode: _response.error.statusCode,
                    body: _response.error.rawBody,
                });
            case "timeout":
                throw new errors.CohereTimeoutError("Timeout exceeded when calling POST /v2/rerank.");
            case "unknown":
                throw new errors.CohereError({
                    message: _response.error.errorMessage,
                });
        }
    }

    protected async _getAuthorizationHeader(): Promise<string> {
        const bearer = (await core.Supplier.get(this._options.token)) ?? process?.env["CO_API_KEY"];
        if (bearer == null) {
            throw new errors.CohereError({
                message: "Please specify CO_API_KEY when instantiating the client.",
            });
        }

        return `Bearer ${bearer}`;
    }
}
