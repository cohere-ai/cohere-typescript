/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../index";
import * as Cohere from "../../api/index";
import * as core from "../../core";
import { Texts } from "./Texts";
import { Images } from "./Images";

export const EmbedRequestV2: core.serialization.Schema<serializers.EmbedRequestV2.Raw, Cohere.EmbedRequestV2> =
    core.serialization
        .union(core.serialization.discriminant("inputType", "input_type"), {
            search_document: Texts,
            search_query: Texts,
            classification: Texts,
            clustering: Texts,
            image: Images,
        })
        .transform<Cohere.EmbedRequestV2>({
            transform: (value) => value,
            untransform: (value) => value,
        });

export declare namespace EmbedRequestV2 {
    type Raw =
        | EmbedRequestV2.SearchDocument
        | EmbedRequestV2.SearchQuery
        | EmbedRequestV2.Classification
        | EmbedRequestV2.Clustering
        | EmbedRequestV2.Image;

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
