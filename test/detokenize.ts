import { expect } from "chai";
import cohere from "../cohere";
import { cohereResponse, detokenizeResponse } from "../models/index";

const KEY: string = process.env.COHERE_API_KEY || "";

describe("The detokenize endpoint", () => {
  let response: cohereResponse<detokenizeResponse>;
  cohere.init(KEY);
  before(async () => {
    response = await cohere.detokenize({ tokens: [25736, 2552] });
  });
  it("Should should have a statusCode of 200", () => {
    expect(response).to.have.property("statusCode");
    expect(response.statusCode).to.equal(200);
  });
  it("Should contain the correct text", () => {
    expect(response).to.have.property("body");
    expect(response.body).to.have.property("text");
    expect(response.body.text).to.equal("hello world");
  });
  it("Should contain a body property that contains meta information", () => {
    expect(response.body).to.have.property("meta");
    expect(response.body.meta).to.have.property("api_version");
    expect(response.body.meta?.api_version).to.have.property("version");
  });
});
