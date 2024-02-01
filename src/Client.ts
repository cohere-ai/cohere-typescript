/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as environments from "./environments";
import * as core from "./core";
import * as Cohere from "./api";
import * as serializers from "./serialization";
import urlJoin from "url-join";
import * as stream from "stream";
import * as errors from "./errors";
import { EmbedJobs } from "./api/resources/embedJobs/client/Client";
import { Datasets } from "./api/resources/datasets/client/Client";
import { Connectors } from "./api/resources/connectors/client/Client";

export declare namespace CohereClient {
    interface Options {
        environment?: core.Supplier<environments.CohereEnvironment | string>;
        token: core.Supplier<core.BearerToken>;
        clientName?: core.Supplier<string | undefined>;
    }

    interface RequestOptions {
        timeoutInSeconds?: number;
        maxRetries?: number;
    }
}

export class CohereClient {
    constructor(protected readonly _options: CohereClient.Options) {}

    /**
     * The `chat` endpoint allows users to have conversations with a Large Language Model (LLM) from Cohere. Users can send messages as part of a persisted conversation using the `conversation_id` parameter, or they can pass in their own conversation history using the `chat_history` parameter.
     *
     * The endpoint features additional parameters such as [connectors](https://docs.cohere.com/docs/connectors) and `documents` that enable conversations enriched by external knowledge. We call this ["Retrieval Augmented Generation"](https://docs.cohere.com/docs/retrieval-augmented-generation-rag), or "RAG". For a full breakdown of the Chat API endpoint, document and connector modes, and streaming (with code samples), see [this guide](https://docs.cohere.com/docs/cochat-beta).
     */
    public async chatStream(
        request: Cohere.ChatStreamRequest,
        requestOptions?: CohereClient.RequestOptions
    ): Promise<core.Stream<Cohere.StreamedChatResponse>> {
        const _response = await core.fetcher<stream.Readable>({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.CohereEnvironment.Production,
                "v1/chat"
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
                "X-Fern-SDK-Version": "7.7.5",
            },
            contentType: "application/json",
            body: {
                ...(await serializers.ChatStreamRequest.jsonOrThrow(request, { unrecognizedObjectKeys: "strip" })),
                stream: true,
            },
            responseType: "streaming",
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
        });
        if (_response.ok) {
            return new core.Stream({
                stream: _response.body,
                terminator: "\n",
                parse: async (data) => {
                    return await serializers.StreamedChatResponse.parseOrThrow(data, {
                        unrecognizedObjectKeys: "passthrough",
                        allowUnrecognizedUnionMembers: true,
                        allowUnrecognizedEnumValues: true,
                        skipValidation: true,
                        breadcrumbsPrefix: ["response"],
                    });
                },
            });
        }

        if (_response.error.reason === "status-code") {
            throw new errors.CohereError({
                statusCode: _response.error.statusCode,
                body: _response.error.body,
            });
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
     * The `chat` endpoint allows users to have conversations with a Large Language Model (LLM) from Cohere. Users can send messages as part of a persisted conversation using the `conversation_id` parameter, or they can pass in their own conversation history using the `chat_history` parameter.
     *
     * The endpoint features additional parameters such as [connectors](https://docs.cohere.com/docs/connectors) and `documents` that enable conversations enriched by external knowledge. We call this ["Retrieval Augmented Generation"](https://docs.cohere.com/docs/retrieval-augmented-generation-rag), or "RAG". For a full breakdown of the Chat API endpoint, document and connector modes, and streaming (with code samples), see [this guide](https://docs.cohere.com/docs/cochat-beta).
     *
     * @example
     *     await cohere.chat({
     *         message: "Can you give me a global market overview of solar panels?",
     *         stream: false,
     *         chatHistory: [{
     *                 role: Cohere.ChatMessageRole.Chatbot,
     *                 message: "Hi!"
     *             }, {
     *                 role: Cohere.ChatMessageRole.Chatbot,
     *                 message: "How can I help you today?"
     *             }],
     *         promptTruncation: Cohere.ChatRequestPromptTruncation.Off,
     *         citationQuality: Cohere.ChatRequestCitationQuality.Fast,
     *         temperature: 0.3,
     *         searchOptions: {},
     *         promptOverride: {}
     *     })
     */
    public async chat(
        request: Cohere.ChatRequest,
        requestOptions?: CohereClient.RequestOptions
    ): Promise<Cohere.NonStreamedChatResponse> {
        const _response = await core.fetcher({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.CohereEnvironment.Production,
                "v1/chat"
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
                "X-Fern-SDK-Version": "7.7.5",
            },
            contentType: "application/json",
            body: {
                ...(await serializers.ChatRequest.jsonOrThrow(request, { unrecognizedObjectKeys: "strip" })),
                stream: false,
            },
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
        });
        if (_response.ok) {
            return await serializers.NonStreamedChatResponse.parseOrThrow(_response.body, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
                skipValidation: true,
                breadcrumbsPrefix: ["response"],
            });
        }

        if (_response.error.reason === "status-code") {
            throw new errors.CohereError({
                statusCode: _response.error.statusCode,
                body: _response.error.body,
            });
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
     * This endpoint generates realistic text conditioned on a given input.
     */
    public async generateStream(
        request: Cohere.GenerateStreamRequest,
        requestOptions?: CohereClient.RequestOptions
    ): Promise<core.Stream<Cohere.GenerateStreamedResponse>> {
        const _response = await core.fetcher<stream.Readable>({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.CohereEnvironment.Production,
                "v1/generate"
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
                "X-Fern-SDK-Version": "7.7.5",
            },
            contentType: "application/json",
            body: {
                ...(await serializers.GenerateStreamRequest.jsonOrThrow(request, { unrecognizedObjectKeys: "strip" })),
                stream: true,
            },
            responseType: "streaming",
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
        });
        if (_response.ok) {
            return new core.Stream({
                stream: _response.body,
                terminator: "\n",
                parse: async (data) => {
                    return await serializers.GenerateStreamedResponse.parseOrThrow(data, {
                        unrecognizedObjectKeys: "passthrough",
                        allowUnrecognizedUnionMembers: true,
                        allowUnrecognizedEnumValues: true,
                        skipValidation: true,
                        breadcrumbsPrefix: ["response"],
                    });
                },
            });
        }

        if (_response.error.reason === "status-code") {
            switch (_response.error.statusCode) {
                case 400:
                    throw new Cohere.BadRequestError(_response.error.body);
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
     * This endpoint generates realistic text conditioned on a given input.
     * @throws {@link Cohere.BadRequestError}
     * @throws {@link Cohere.InternalServerError}
     *
     * @example
     *     await cohere.generate({
     *         prompt: "Please explain to me how LLMs work",
     *         stream: false,
     *         truncate: Cohere.GenerateRequestTruncate.None,
     *         preset: "my-preset-a58sbd",
     *         returnLikelihoods: Cohere.GenerateRequestReturnLikelihoods.Generation
     *     })
     */
    public async generate(
        request: Cohere.GenerateRequest,
        requestOptions?: CohereClient.RequestOptions
    ): Promise<Cohere.Generation> {
        const _response = await core.fetcher({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.CohereEnvironment.Production,
                "v1/generate"
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
                "X-Fern-SDK-Version": "7.7.5",
            },
            contentType: "application/json",
            body: {
                ...(await serializers.GenerateRequest.jsonOrThrow(request, { unrecognizedObjectKeys: "strip" })),
                stream: false,
            },
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
        });
        if (_response.ok) {
            return await serializers.Generation.parseOrThrow(_response.body, {
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
     * This endpoint returns text embeddings. An embedding is a list of floating point numbers that captures semantic information about the text that it represents.
     *
     * Embeddings can be used to create text classifiers as well as empower semantic search. To learn more about embeddings, see the embedding page.
     *
     * If you want to learn more how to use the embedding model, have a look at the [Semantic Search Guide](/docs/semantic-search).
     * @throws {@link Cohere.BadRequestError}
     * @throws {@link Cohere.InternalServerError}
     */
    public async embed(
        request: Cohere.EmbedRequest,
        requestOptions?: CohereClient.RequestOptions
    ): Promise<Cohere.EmbedResponse> {
        const _response = await core.fetcher({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.CohereEnvironment.Production,
                "v1/embed"
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
                "X-Fern-SDK-Version": "7.7.5",
            },
            contentType: "application/json",
            body: await serializers.EmbedRequest.jsonOrThrow(request, { unrecognizedObjectKeys: "strip" }),
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
        });
        if (_response.ok) {
            return await serializers.EmbedResponse.parseOrThrow(_response.body, {
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
     * This endpoint takes in a query and a list of texts and produces an ordered array with each text assigned a relevance score.
     *
     * @example
     *     await cohere.rerank({
     *         model: "rerank-english-v2.0",
     *         query: "What is the capital of the United States?",
     *         documents: []
     *     })
     */
    public async rerank(
        request: Cohere.RerankRequest,
        requestOptions?: CohereClient.RequestOptions
    ): Promise<Cohere.RerankResponse> {
        const _response = await core.fetcher({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.CohereEnvironment.Production,
                "v1/rerank"
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
                "X-Fern-SDK-Version": "7.7.5",
            },
            contentType: "application/json",
            body: await serializers.RerankRequest.jsonOrThrow(request, { unrecognizedObjectKeys: "strip" }),
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
        });
        if (_response.ok) {
            return await serializers.RerankResponse.parseOrThrow(_response.body, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
                skipValidation: true,
                breadcrumbsPrefix: ["response"],
            });
        }

        if (_response.error.reason === "status-code") {
            throw new errors.CohereError({
                statusCode: _response.error.statusCode,
                body: _response.error.body,
            });
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
     * This endpoint makes a prediction about which label fits the specified text inputs best. To make a prediction, Classify uses the provided `examples` of text + label pairs as a reference.
     * Note: [Fine-tuned models](https://docs.cohere.com/docs/classify-fine-tuning) trained on classification examples don't require the `examples` parameter to be passed in explicitly.
     * @throws {@link Cohere.BadRequestError}
     * @throws {@link Cohere.InternalServerError}
     *
     * @example
     *     await cohere.classify({
     *         inputs: ["Confirm your email address", "hey i need u to send some $"],
     *         examples: [{
     *                 text: "Dermatologists don't like her!",
     *                 label: "Spam"
     *             }, {
     *                 text: "Hello, open to this?",
     *                 label: "Spam"
     *             }, {
     *                 text: "I need help please wire me $1000 right now",
     *                 label: "Spam"
     *             }, {
     *                 text: "Nice to know you ;)",
     *                 label: "Spam"
     *             }, {
     *                 text: "Please help me?",
     *                 label: "Spam"
     *             }, {
     *                 text: "Your parcel will be delivered today",
     *                 label: "Not spam"
     *             }, {
     *                 text: "Review changes to our Terms and Conditions",
     *                 label: "Not spam"
     *             }, {
     *                 text: "Weekly sync notes",
     *                 label: "Not spam"
     *             }, {
     *                 text: "Re: Follow up from today\u2019s meeting",
     *                 label: "Not spam"
     *             }, {
     *                 text: "Pre-read for tomorrow",
     *                 label: "Not spam"
     *             }],
     *         preset: "my-preset-a58sbd",
     *         truncate: Cohere.ClassifyRequestTruncate.None
     *     })
     */
    public async classify(
        request: Cohere.ClassifyRequest,
        requestOptions?: CohereClient.RequestOptions
    ): Promise<Cohere.ClassifyResponse> {
        const _response = await core.fetcher({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.CohereEnvironment.Production,
                "v1/classify"
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
                "X-Fern-SDK-Version": "7.7.5",
            },
            contentType: "application/json",
            body: await serializers.ClassifyRequest.jsonOrThrow(request, { unrecognizedObjectKeys: "strip" }),
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
        });
        if (_response.ok) {
            return await serializers.ClassifyResponse.parseOrThrow(_response.body, {
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
     * This endpoint generates a summary in English for a given text.
     *
     * @example
     *     await cohere.summarize({
     *         text: "Ice cream is a sweetened frozen food typically eaten as a snack or dessert. It may be made from milk or cream and is flavoured with a sweetener, either sugar or an alternative, and a spice, such as cocoa or vanilla, or with fruit such as strawberries or peaches. It can also be made by whisking a flavored cream base and liquid nitrogen together. Food coloring is sometimes added, in addition to stabilizers. The mixture is cooled below the freezing point of water and stirred to incorporate air spaces and to prevent detectable ice crystals from forming. The result is a smooth, semi-solid foam that is solid at very low temperatures (below 2 \u00B0C or 35 \u00B0F). It becomes more malleable as its temperature increases.\n\nThe meaning of the name \"ice cream\" varies from one country to another. In some countries, such as the United States, \"ice cream\" applies only to a specific variety, and most governments regulate the commercial use of the various terms according to the relative quantities of the main ingredients, notably the amount of cream. Products that do not meet the criteria to be called ice cream are sometimes labelled \"frozen dairy dessert\" instead. In other countries, such as Italy and Argentina, one word is used fo\r all variants. Analogues made from dairy alternatives, such as goat's or sheep's milk, or milk substitutes (e.g., soy, cashew, coconut, almond milk or tofu), are available for those who are lactose intolerant, allergic to dairy protein or vegan.",
     *         length: Cohere.SummarizeRequestLength.Short,
     *         format: Cohere.SummarizeRequestFormat.Paragraph,
     *         extractiveness: Cohere.SummarizeRequestExtractiveness.Low
     *     })
     */
    public async summarize(
        request: Cohere.SummarizeRequest,
        requestOptions?: CohereClient.RequestOptions
    ): Promise<Cohere.SummarizeResponse> {
        const _response = await core.fetcher({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.CohereEnvironment.Production,
                "v1/summarize"
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
                "X-Fern-SDK-Version": "7.7.5",
            },
            contentType: "application/json",
            body: await serializers.SummarizeRequest.jsonOrThrow(request, { unrecognizedObjectKeys: "strip" }),
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
        });
        if (_response.ok) {
            return await serializers.SummarizeResponse.parseOrThrow(_response.body, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
                skipValidation: true,
                breadcrumbsPrefix: ["response"],
            });
        }

        if (_response.error.reason === "status-code") {
            throw new errors.CohereError({
                statusCode: _response.error.statusCode,
                body: _response.error.body,
            });
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
     * This endpoint splits input text into smaller units called tokens using byte-pair encoding (BPE). To learn more about tokenization and byte pair encoding, see the tokens page.
     * @throws {@link Cohere.BadRequestError}
     * @throws {@link Cohere.InternalServerError}
     *
     * @example
     *     await cohere.tokenize({
     *         text: "tokenize me! :D",
     *         model: "command"
     *     })
     */
    public async tokenize(
        request: Cohere.TokenizeRequest,
        requestOptions?: CohereClient.RequestOptions
    ): Promise<Cohere.TokenizeResponse> {
        const _response = await core.fetcher({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.CohereEnvironment.Production,
                "v1/tokenize"
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
                "X-Fern-SDK-Version": "7.7.5",
            },
            contentType: "application/json",
            body: await serializers.TokenizeRequest.jsonOrThrow(request, { unrecognizedObjectKeys: "strip" }),
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
        });
        if (_response.ok) {
            return await serializers.TokenizeResponse.parseOrThrow(_response.body, {
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
     * This endpoint takes tokens using byte-pair encoding and returns their text representation. To learn more about tokenization and byte pair encoding, see the tokens page.
     *
     * @example
     *     await cohere.detokenize({
     *         tokens: [10104, 12221, 1315, 34, 1420, 69]
     *     })
     */
    public async detokenize(
        request: Cohere.DetokenizeRequest,
        requestOptions?: CohereClient.RequestOptions
    ): Promise<Cohere.DetokenizeResponse> {
        const _response = await core.fetcher({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.CohereEnvironment.Production,
                "v1/detokenize"
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
                "X-Fern-SDK-Version": "7.7.5",
            },
            contentType: "application/json",
            body: await serializers.DetokenizeRequest.jsonOrThrow(request, { unrecognizedObjectKeys: "strip" }),
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
        });
        if (_response.ok) {
            return await serializers.DetokenizeResponse.parseOrThrow(_response.body, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
                skipValidation: true,
                breadcrumbsPrefix: ["response"],
            });
        }

        if (_response.error.reason === "status-code") {
            throw new errors.CohereError({
                statusCode: _response.error.statusCode,
                body: _response.error.body,
            });
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

    protected _embedJobs: EmbedJobs | undefined;

    public get embedJobs(): EmbedJobs {
        return (this._embedJobs ??= new EmbedJobs(this._options));
    }

    protected _datasets: Datasets | undefined;

    public get datasets(): Datasets {
        return (this._datasets ??= new Datasets(this._options));
    }

    protected _connectors: Connectors | undefined;

    public get connectors(): Connectors {
        return (this._connectors ??= new Connectors(this._options));
    }

    protected async _getAuthorizationHeader() {
        return `Bearer ${await core.Supplier.get(this._options.token)}`;
    }
}
