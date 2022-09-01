import { expect } from "chai";
import cohere from "../cohere";
import { cohereResponse, detokenizeResponse } from "../models/index";

const KEY: string = process.env.COHERE_API_KEY || "";

describe("The detokenize endpoint", () => {
  let response: cohereResponse<detokenizeResponse>;
  cohere.init(KEY);
  before(async () => {
    response = await cohere.detokenize({ tokens: [33555, 1114] });
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
});
