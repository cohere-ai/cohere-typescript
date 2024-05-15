/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as environments from "../../../../environments";
import * as core from "../../../../core";
import * as Cohere from "../../../index";
import urlJoin from "url-join";
import * as serializers from "../../../../serialization/index";
import * as errors from "../../../../errors/index";

export declare namespace Connectors {
    interface Options {
        environment?: core.Supplier<environments.CohereEnvironment | string>;
        token?: core.Supplier<core.BearerToken | undefined>;
        clientName?: core.Supplier<string | undefined>;
    }

    interface RequestOptions {
        timeoutInSeconds?: number;
        maxRetries?: number;
    }
}

export class Connectors {
    constructor(protected readonly _options: Connectors.Options = {}) {}

    /**
     * Returns a list of connectors ordered by descending creation date (newer first). See ['Managing your Connector'](https://docs.cohere.com/docs/managing-your-connector) for more information.
     *
     * @param {Cohere.ConnectorsListRequest} request
     * @param {Connectors.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Cohere.BadRequestError}
     * @throws {@link Cohere.TooManyRequestsError}
     * @throws {@link Cohere.InternalServerError}
     *
     * @example
     *     await cohere.connectors.list()
     */
    public async list(
        request: Cohere.ConnectorsListRequest = {},
        requestOptions?: Connectors.RequestOptions
    ): Promise<Cohere.ListConnectorsResponse> {
        const { limit, offset } = request;
        const _queryParams: Record<string, string | string[] | object | object[]> = {};
        if (limit != null) {
            _queryParams["limit"] = limit.toString();
        }

        if (offset != null) {
            _queryParams["offset"] = offset.toString();
        }

        const _response = await core.fetcher({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.CohereEnvironment.Production,
                "connectors"
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
                "X-Fern-SDK-Version": "7.10.0",
                "X-Fern-Runtime": core.RUNTIME.type,
                "X-Fern-Runtime-Version": core.RUNTIME.version,
            },
            contentType: "application/json",
            queryParameters: _queryParams,
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 300000,
            maxRetries: requestOptions?.maxRetries,
        });
        if (_response.ok) {
            return await serializers.ListConnectorsResponse.parseOrThrow(_response.body, {
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
                case 429:
                    throw new Cohere.TooManyRequestsError(
                        await serializers.TooManyRequestsErrorBody.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            skipValidation: true,
                            breadcrumbsPrefix: ["response"],
                        })
                    );
                case 500:
                    throw new Cohere.InternalServerError(_response.error.body);
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
                throw new errors.CohereTimeoutError();
            case "unknown":
                throw new errors.CohereError({
                    message: _response.error.errorMessage,
                });
        }
    }

    /**
     * Creates a new connector. The connector is tested during registration and will cancel registration when the test is unsuccessful. See ['Creating and Deploying a Connector'](https://docs.cohere.com/docs/creating-and-deploying-a-connector) for more information.
     *
     * @param {Cohere.CreateConnectorRequest} request
     * @param {Connectors.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Cohere.BadRequestError}
     * @throws {@link Cohere.ForbiddenError}
     * @throws {@link Cohere.TooManyRequestsError}
     * @throws {@link Cohere.InternalServerError}
     *
     * @example
     *     await cohere.connectors.create({
     *         name: "name",
     *         url: "url"
     *     })
     */
    public async create(
        request: Cohere.CreateConnectorRequest,
        requestOptions?: Connectors.RequestOptions
    ): Promise<Cohere.CreateConnectorResponse> {
        const _response = await core.fetcher({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.CohereEnvironment.Production,
                "connectors"
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
                "X-Fern-SDK-Version": "7.10.0",
                "X-Fern-Runtime": core.RUNTIME.type,
                "X-Fern-Runtime-Version": core.RUNTIME.version,
            },
            contentType: "application/json",
            body: await serializers.CreateConnectorRequest.jsonOrThrow(request, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
            }),
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 300000,
            maxRetries: requestOptions?.maxRetries,
        });
        if (_response.ok) {
            return await serializers.CreateConnectorResponse.parseOrThrow(_response.body, {
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
                case 403:
                    throw new Cohere.ForbiddenError(_response.error.body);
                case 429:
                    throw new Cohere.TooManyRequestsError(
                        await serializers.TooManyRequestsErrorBody.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            skipValidation: true,
                            breadcrumbsPrefix: ["response"],
                        })
                    );
                case 500:
                    throw new Cohere.InternalServerError(_response.error.body);
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
                throw new errors.CohereTimeoutError();
            case "unknown":
                throw new errors.CohereError({
                    message: _response.error.errorMessage,
                });
        }
    }

    /**
     * Retrieve a connector by ID. See ['Connectors'](https://docs.cohere.com/docs/connectors) for more information.
     *
     * @param {string} id - The ID of the connector to retrieve.
     * @param {Connectors.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Cohere.BadRequestError}
     * @throws {@link Cohere.NotFoundError}
     * @throws {@link Cohere.TooManyRequestsError}
     * @throws {@link Cohere.InternalServerError}
     *
     * @example
     *     await cohere.connectors.get("id")
     */
    public async get(id: string, requestOptions?: Connectors.RequestOptions): Promise<Cohere.GetConnectorResponse> {
        const _response = await core.fetcher({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.CohereEnvironment.Production,
                `connectors/${encodeURIComponent(id)}`
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
                "X-Fern-SDK-Version": "7.10.0",
                "X-Fern-Runtime": core.RUNTIME.type,
                "X-Fern-Runtime-Version": core.RUNTIME.version,
            },
            contentType: "application/json",
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 300000,
            maxRetries: requestOptions?.maxRetries,
        });
        if (_response.ok) {
            return await serializers.GetConnectorResponse.parseOrThrow(_response.body, {
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
                case 404:
                    throw new Cohere.NotFoundError(_response.error.body);
                case 429:
                    throw new Cohere.TooManyRequestsError(
                        await serializers.TooManyRequestsErrorBody.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            skipValidation: true,
                            breadcrumbsPrefix: ["response"],
                        })
                    );
                case 500:
                    throw new Cohere.InternalServerError(_response.error.body);
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
                throw new errors.CohereTimeoutError();
            case "unknown":
                throw new errors.CohereError({
                    message: _response.error.errorMessage,
                });
        }
    }

    /**
     * Delete a connector by ID. See ['Connectors'](https://docs.cohere.com/docs/connectors) for more information.
     *
     * @param {string} id - The ID of the connector to delete.
     * @param {Connectors.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Cohere.BadRequestError}
     * @throws {@link Cohere.ForbiddenError}
     * @throws {@link Cohere.NotFoundError}
     * @throws {@link Cohere.TooManyRequestsError}
     * @throws {@link Cohere.InternalServerError}
     *
     * @example
     *     await cohere.connectors.delete("id")
     */
    public async delete(
        id: string,
        requestOptions?: Connectors.RequestOptions
    ): Promise<Cohere.DeleteConnectorResponse> {
        const _response = await core.fetcher({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.CohereEnvironment.Production,
                `connectors/${encodeURIComponent(id)}`
            ),
            method: "DELETE",
            headers: {
                Authorization: await this._getAuthorizationHeader(),
                "X-Client-Name":
                    (await core.Supplier.get(this._options.clientName)) != null
                        ? await core.Supplier.get(this._options.clientName)
                        : undefined,
                "X-Fern-Language": "JavaScript",
                "X-Fern-SDK-Name": "cohere-ai",
                "X-Fern-SDK-Version": "7.10.0",
                "X-Fern-Runtime": core.RUNTIME.type,
                "X-Fern-Runtime-Version": core.RUNTIME.version,
            },
            contentType: "application/json",
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 300000,
            maxRetries: requestOptions?.maxRetries,
        });
        if (_response.ok) {
            return await serializers.DeleteConnectorResponse.parseOrThrow(_response.body, {
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
                case 403:
                    throw new Cohere.ForbiddenError(_response.error.body);
                case 404:
                    throw new Cohere.NotFoundError(_response.error.body);
                case 429:
                    throw new Cohere.TooManyRequestsError(
                        await serializers.TooManyRequestsErrorBody.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            skipValidation: true,
                            breadcrumbsPrefix: ["response"],
                        })
                    );
                case 500:
                    throw new Cohere.InternalServerError(_response.error.body);
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
                throw new errors.CohereTimeoutError();
            case "unknown":
                throw new errors.CohereError({
                    message: _response.error.errorMessage,
                });
        }
    }

    /**
     * Update a connector by ID. Omitted fields will not be updated. See ['Managing your Connector'](https://docs.cohere.com/docs/managing-your-connector) for more information.
     *
     * @param {string} id - The ID of the connector to update.
     * @param {Cohere.UpdateConnectorRequest} request
     * @param {Connectors.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Cohere.BadRequestError}
     * @throws {@link Cohere.ForbiddenError}
     * @throws {@link Cohere.NotFoundError}
     * @throws {@link Cohere.TooManyRequestsError}
     * @throws {@link Cohere.InternalServerError}
     *
     * @example
     *     await cohere.connectors.update("id")
     */
    public async update(
        id: string,
        request: Cohere.UpdateConnectorRequest = {},
        requestOptions?: Connectors.RequestOptions
    ): Promise<Cohere.UpdateConnectorResponse> {
        const _response = await core.fetcher({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.CohereEnvironment.Production,
                `connectors/${encodeURIComponent(id)}`
            ),
            method: "PATCH",
            headers: {
                Authorization: await this._getAuthorizationHeader(),
                "X-Client-Name":
                    (await core.Supplier.get(this._options.clientName)) != null
                        ? await core.Supplier.get(this._options.clientName)
                        : undefined,
                "X-Fern-Language": "JavaScript",
                "X-Fern-SDK-Name": "cohere-ai",
                "X-Fern-SDK-Version": "7.10.0",
                "X-Fern-Runtime": core.RUNTIME.type,
                "X-Fern-Runtime-Version": core.RUNTIME.version,
            },
            contentType: "application/json",
            body: await serializers.UpdateConnectorRequest.jsonOrThrow(request, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
            }),
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 300000,
            maxRetries: requestOptions?.maxRetries,
        });
        if (_response.ok) {
            return await serializers.UpdateConnectorResponse.parseOrThrow(_response.body, {
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
                case 403:
                    throw new Cohere.ForbiddenError(_response.error.body);
                case 404:
                    throw new Cohere.NotFoundError(_response.error.body);
                case 429:
                    throw new Cohere.TooManyRequestsError(
                        await serializers.TooManyRequestsErrorBody.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            skipValidation: true,
                            breadcrumbsPrefix: ["response"],
                        })
                    );
                case 500:
                    throw new Cohere.InternalServerError(_response.error.body);
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
                throw new errors.CohereTimeoutError();
            case "unknown":
                throw new errors.CohereError({
                    message: _response.error.errorMessage,
                });
        }
    }

    /**
     * Authorize the connector with the given ID for the connector oauth app. See ['Connector Authentication'](https://docs.cohere.com/docs/connector-authentication) for more information.
     *
     * @param {string} id - The ID of the connector to authorize.
     * @param {Cohere.ConnectorsOAuthAuthorizeRequest} request
     * @param {Connectors.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Cohere.BadRequestError}
     * @throws {@link Cohere.NotFoundError}
     * @throws {@link Cohere.TooManyRequestsError}
     * @throws {@link Cohere.InternalServerError}
     *
     * @example
     *     await cohere.connectors.oAuthAuthorize("id")
     */
    public async oAuthAuthorize(
        id: string,
        request: Cohere.ConnectorsOAuthAuthorizeRequest = {},
        requestOptions?: Connectors.RequestOptions
    ): Promise<Cohere.OAuthAuthorizeResponse> {
        const { afterTokenRedirect } = request;
        const _queryParams: Record<string, string | string[] | object | object[]> = {};
        if (afterTokenRedirect != null) {
            _queryParams["after_token_redirect"] = afterTokenRedirect;
        }

        const _response = await core.fetcher({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.CohereEnvironment.Production,
                `connectors/${encodeURIComponent(id)}/oauth/authorize`
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
                "X-Fern-SDK-Version": "7.10.0",
                "X-Fern-Runtime": core.RUNTIME.type,
                "X-Fern-Runtime-Version": core.RUNTIME.version,
            },
            contentType: "application/json",
            queryParameters: _queryParams,
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 300000,
            maxRetries: requestOptions?.maxRetries,
        });
        if (_response.ok) {
            return await serializers.OAuthAuthorizeResponse.parseOrThrow(_response.body, {
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
                case 404:
                    throw new Cohere.NotFoundError(_response.error.body);
                case 429:
                    throw new Cohere.TooManyRequestsError(
                        await serializers.TooManyRequestsErrorBody.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            skipValidation: true,
                            breadcrumbsPrefix: ["response"],
                        })
                    );
                case 500:
                    throw new Cohere.InternalServerError(_response.error.body);
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
                throw new errors.CohereTimeoutError();
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
