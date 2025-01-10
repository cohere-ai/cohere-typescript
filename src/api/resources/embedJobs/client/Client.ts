/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as environments from "../../../../environments";
import * as core from "../../../../core";
import * as Cohere from "../../../index";
import urlJoin from "url-join";
import * as serializers from "../../../../serialization/index";
import * as errors from "../../../../errors/index";

export declare namespace EmbedJobs {
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

export class EmbedJobs {
    constructor(protected readonly _options: EmbedJobs.Options = {}) {}

    /**
     * The list embed job endpoint allows users to view all embed jobs history for that specific user.
     *
     * @param {EmbedJobs.RequestOptions} requestOptions - Request-specific configuration.
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
     *     await client.embedJobs.list()
     */
    public async list(requestOptions?: EmbedJobs.RequestOptions): Promise<Cohere.ListEmbedJobResponse> {
        const _response = await (this._options.fetcher ?? core.fetcher)({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.CohereEnvironment.Production,
                "v1/embed-jobs"
            ),
            method: "GET",
            headers: {
                Authorization: await this._getAuthorizationHeader(),
                "X-Client-Name":
                    (await core.Supplier.get(this._options.clientName)) != null
                        ? await core.Supplier.get(this._options.clientName)
                        : undefined,
                "X-Fern-Language": "JavaScript",
                "X-Fern-SDK-Name": "cohere-ai",
                "X-Fern-SDK-Version": "7.15.3",
                "User-Agent": "cohere-ai/7.15.3",
                "X-Fern-Runtime": core.RUNTIME.type,
                "X-Fern-Runtime-Version": core.RUNTIME.version,
                ...requestOptions?.headers,
            },
            contentType: "application/json",
            requestType: "json",
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 300000,
            maxRetries: requestOptions?.maxRetries,
            abortSignal: requestOptions?.abortSignal,
        });
        if (_response.ok) {
            return serializers.ListEmbedJobResponse.parseOrThrow(_response.body, {
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
                throw new errors.CohereTimeoutError("Timeout exceeded when calling GET /v1/embed-jobs.");
            case "unknown":
                throw new errors.CohereError({
                    message: _response.error.errorMessage,
                });
        }
    }

    /**
     * This API launches an async Embed job for a [Dataset](https://docs.cohere.com/docs/datasets) of type `embed-input`. The result of a completed embed job is new Dataset of type `embed-output`, which contains the original text entries and the corresponding embeddings.
     *
     * @param {Cohere.CreateEmbedJobRequest} request
     * @param {EmbedJobs.RequestOptions} requestOptions - Request-specific configuration.
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
     *     await client.embedJobs.create({
     *         model: "model",
     *         datasetId: "dataset_id",
     *         inputType: "search_document"
     *     })
     */
    public async create(
        request: Cohere.CreateEmbedJobRequest,
        requestOptions?: EmbedJobs.RequestOptions
    ): Promise<Cohere.CreateEmbedJobResponse> {
        const _response = await (this._options.fetcher ?? core.fetcher)({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.CohereEnvironment.Production,
                "v1/embed-jobs"
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
                "X-Fern-SDK-Version": "7.15.3",
                "User-Agent": "cohere-ai/7.15.3",
                "X-Fern-Runtime": core.RUNTIME.type,
                "X-Fern-Runtime-Version": core.RUNTIME.version,
                ...requestOptions?.headers,
            },
            contentType: "application/json",
            requestType: "json",
            body: serializers.CreateEmbedJobRequest.jsonOrThrow(request, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
            }),
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 300000,
            maxRetries: requestOptions?.maxRetries,
            abortSignal: requestOptions?.abortSignal,
        });
        if (_response.ok) {
            return serializers.CreateEmbedJobResponse.parseOrThrow(_response.body, {
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
                throw new errors.CohereTimeoutError("Timeout exceeded when calling POST /v1/embed-jobs.");
            case "unknown":
                throw new errors.CohereError({
                    message: _response.error.errorMessage,
                });
        }
    }

    /**
     * This API retrieves the details about an embed job started by the same user.
     *
     * @param {string} id - The ID of the embed job to retrieve.
     * @param {EmbedJobs.RequestOptions} requestOptions - Request-specific configuration.
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
     *     await client.embedJobs.get("id")
     */
    public async get(id: string, requestOptions?: EmbedJobs.RequestOptions): Promise<Cohere.EmbedJob> {
        const _response = await (this._options.fetcher ?? core.fetcher)({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.CohereEnvironment.Production,
                `v1/embed-jobs/${encodeURIComponent(id)}`
            ),
            method: "GET",
            headers: {
                Authorization: await this._getAuthorizationHeader(),
                "X-Client-Name":
                    (await core.Supplier.get(this._options.clientName)) != null
                        ? await core.Supplier.get(this._options.clientName)
                        : undefined,
                "X-Fern-Language": "JavaScript",
                "X-Fern-SDK-Name": "cohere-ai",
                "X-Fern-SDK-Version": "7.15.3",
                "User-Agent": "cohere-ai/7.15.3",
                "X-Fern-Runtime": core.RUNTIME.type,
                "X-Fern-Runtime-Version": core.RUNTIME.version,
                ...requestOptions?.headers,
            },
            contentType: "application/json",
            requestType: "json",
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 300000,
            maxRetries: requestOptions?.maxRetries,
            abortSignal: requestOptions?.abortSignal,
        });
        if (_response.ok) {
            return serializers.EmbedJob.parseOrThrow(_response.body, {
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
                throw new errors.CohereTimeoutError("Timeout exceeded when calling GET /v1/embed-jobs/{id}.");
            case "unknown":
                throw new errors.CohereError({
                    message: _response.error.errorMessage,
                });
        }
    }

    /**
     * This API allows users to cancel an active embed job. Once invoked, the embedding process will be terminated, and users will be charged for the embeddings processed up to the cancellation point. It's important to note that partial results will not be available to users after cancellation.
     *
     * @param {string} id - The ID of the embed job to cancel.
     * @param {EmbedJobs.RequestOptions} requestOptions - Request-specific configuration.
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
     *     await client.embedJobs.cancel("id")
     */
    public async cancel(id: string, requestOptions?: EmbedJobs.RequestOptions): Promise<void> {
        const _response = await (this._options.fetcher ?? core.fetcher)({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.CohereEnvironment.Production,
                `v1/embed-jobs/${encodeURIComponent(id)}/cancel`
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
                "X-Fern-SDK-Version": "7.15.3",
                "User-Agent": "cohere-ai/7.15.3",
                "X-Fern-Runtime": core.RUNTIME.type,
                "X-Fern-Runtime-Version": core.RUNTIME.version,
                ...requestOptions?.headers,
            },
            contentType: "application/json",
            requestType: "json",
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 300000,
            maxRetries: requestOptions?.maxRetries,
            abortSignal: requestOptions?.abortSignal,
        });
        if (_response.ok) {
            return;
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
                throw new errors.CohereTimeoutError("Timeout exceeded when calling POST /v1/embed-jobs/{id}/cancel.");
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
