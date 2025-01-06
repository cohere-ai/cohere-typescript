/**
 * This file was auto-generated by Fern from our API Definition.
 */

/**
 * Specifies the type of input passed to the model. Required for embedding models v3 and higher.
 *
 * - `"search_document"`: Used for embeddings stored in a vector database for search use-cases.
 * - `"search_query"`: Used for embeddings of search queries run against a vector DB to find relevant documents.
 * - `"classification"`: Used for embeddings passed through a text classifier.
 * - `"clustering"`: Used for the embeddings run through a clustering algorithm.
 * - `"image"`: Used for embeddings with image input.
 */
export type EmbedInputType = "search_document" | "search_query" | "classification" | "clustering" | "image";
export const EmbedInputType = {
    SearchDocument: "search_document",
    SearchQuery: "search_query",
    Classification: "classification",
    Clustering: "clustering",
    Image: "image",
} as const;
