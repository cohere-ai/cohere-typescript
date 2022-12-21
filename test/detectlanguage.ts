import { expect } from "chai";
import cohere from "../cohere";
import { cohereResponse, detectLanguageResponse } from "../models/index";

const KEY: string = process.env.COHERE_API_KEY || "";

describe("The detect-language endpoint", () => {
  let response: cohereResponse<detectLanguageResponse>;
  cohere.init(KEY);
  before(async () => {
    const en = "Hello world";
    const ru = "Здравствуй, Мир";
    response = await cohere.detectLanguage({ texts: [en, ru] });
  });
  it("Should should have a statusCode of 200", () => {
    expect(response).to.have.property("statusCode");
    expect(response.statusCode).to.equal(200);
  });
  it("Should contain the correct text", () => {
    expect(response).to.have.property("body");
    expect(response.body).to.have.property("results");
    expect(response.body.results[0].language_code).to.equal("en");
    expect(response.body.results[1].language_code).to.equal("ru");
  });
});
