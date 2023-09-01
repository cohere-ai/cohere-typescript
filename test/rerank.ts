import { expect } from "chai";
import cohere from "../cohere";
import { cohereResponse, rerankResponse } from "../models/index";

const KEY: string = process.env.COHERE_API_KEY || "";

describe("The reranking endpoint", () => {
  let response: cohereResponse<rerankResponse>;
  cohere.init(KEY);
  before(async () => {
    response = await cohere.rerank({
      query: "Greetings, what is your name?",
      model: "rerank-multilingual-v2.0",
      top_n: 1,
      documents: [
        "The quick brown fox jumps over the lazy dog.",
        "hello what is your name. £ symbols sometimes cause problems",
      ],
    });
    console.log(response.body.results);
  });
  it("Should should have a statusCode of 200", () => {
    expect(response).to.have.property("statusCode");
    expect(response.statusCode).to.equal(200);
  });
  it("Should contain a result with a single entry", () => {
    expect(response).to.have.property("body");
    expect(response.body).to.have.property("id");
    expect(response.body).to.have.property("results");
    expect(response.body.id).to.not.be.empty;
    expect(response.body.results).to.not.be.empty;
    expect(response.body.results).to.have.lengthOf(1);
    expect(response.body.results[0]).to.have.property("index");
    expect(response.body.results[0]).to.have.property("relevance_score");
    expect(response.body.results[0].index).to.not.be.empty;
    expect(response.body.results[0].relevance_score).to.not.be.empty;
  });
});
