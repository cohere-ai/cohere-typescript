import { expect } from "chai";
import cohere from "../cohere";
import { cohereResponse, tokenizeResponse } from "../models/index";

const KEY: string = process.env.COHERE_API_KEY || "";

describe("The tokenize endpoint", () => {
  let response: cohereResponse<tokenizeResponse>;
  cohere.init(KEY);
  before(async () => {
    response = await cohere.tokenize({ text: "hello world" });
  });
  it("Should should have a statusCode of 200", () => {
    expect(response).to.have.property("statusCode");
    expect(response.statusCode).to.equal(200);
  });
  it("Should contain the correct tokens", () => {
    expect(response).to.have.property("body");
    expect(response.body).to.have.property("tokens");
    expect(response.body.tokens).to.deep.equal([33555, 1114]);
    expect(response.body.token_strings).to.deep.equal(["hello", " world"]);
  });
  it("Should contain a body property that contains meta information", () => {
    expect(response.body).to.have.property("meta");
    expect(response.body.meta).to.have.property("api_version");
    expect(response.body.meta?.api_version).to.have.property("version");
  });
});
