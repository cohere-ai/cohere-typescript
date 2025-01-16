/**
 * This file was auto-generated by Fern from our API Definition.
 */

/**
 * The possible types of fine-tuned models.
 *
 * - BASE_TYPE_UNSPECIFIED: Unspecified model.
 * - BASE_TYPE_GENERATIVE: Deprecated: Generative model.
 * - BASE_TYPE_CLASSIFICATION: Classification model.
 * - BASE_TYPE_RERANK: Rerank model.
 * - BASE_TYPE_CHAT: Chat model.
 */
export type BaseType =
    | "BASE_TYPE_UNSPECIFIED"
    | "BASE_TYPE_GENERATIVE"
    | "BASE_TYPE_CLASSIFICATION"
    | "BASE_TYPE_RERANK"
    | "BASE_TYPE_CHAT";
export const BaseType = {
    BaseTypeUnspecified: "BASE_TYPE_UNSPECIFIED",
    BaseTypeGenerative: "BASE_TYPE_GENERATIVE",
    BaseTypeClassification: "BASE_TYPE_CLASSIFICATION",
    BaseTypeRerank: "BASE_TYPE_RERANK",
    BaseTypeChat: "BASE_TYPE_CHAT",
} as const;
