/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as Cohere from "../../../../api/index";
import * as core from "../../../../core";
import { Texts } from "./Texts";
import { Images } from "./Images";

export const V2EmbedRequest: core.serialization.Schema<serializers.V2EmbedRequest.Raw, Cohere.V2EmbedRequest> =
    core.serialization
        .union(core.serialization.discriminant("inputType", "input_type"), {
            search_document: Texts,
            search_query: Texts,
            classification: Texts,
            clustering: Texts,
            image: Images,
        })
        .transform<Cohere.V2EmbedRequest>({
            transform: (value) => value,
            untransform: (value) => value,
        });

export declare namespace V2EmbedRequest {
    type Raw =
        | V2EmbedRequest.SearchDocument
        | V2EmbedRequest.SearchQuery
        | V2EmbedRequest.Classification
        | V2EmbedRequest.Clustering
        | V2EmbedRequest.Image;

    interface SearchDocument extends Texts.Raw {
        input_type: "search_document";
    }

    interface SearchQuery extends Texts.Raw {
        input_type: "search_query";
    }

    interface Classification extends Texts.Raw {
        input_type: "classification";
    }

    interface Clustering extends Texts.Raw {
        input_type: "clustering";
    }

    interface Image extends Images.Raw {
        input_type: "image";
    }
}