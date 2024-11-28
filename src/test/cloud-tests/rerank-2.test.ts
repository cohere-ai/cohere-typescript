import { test } from "@jest/globals";
import { cohere, skipIfTestTypeIsnt } from "./utils";

skipIfTestTypeIsnt("rerank-2")("rerank-2", () => {
    test.concurrent("works", async () => {
        const rerank = await cohere.v2.rerank({
            documents: [
                "Carson City is the capital city of the American state of Nevada.",
                "The Commonwealth of the Northern Mariana Islands is a group of islands in the Pacific Ocean. Its capital is Saipan.",
                "Washington, D.C. (also known as simply Washington or D.C., and officially as the District of Columbia) is the capital of the United States. It is a federal district.",
                "Capital punishment (the death penalty) has existed in the United States since beforethe United States was a country. As of 2017, capital punishment is legal in 30 of the 50 states."
            ],
            query: "What is the capital of the United States?",
            topN: 3,
            model: "rerank-english-v3.0"
        });

        expect(rerank.results).toBeDefined();
    });
});
