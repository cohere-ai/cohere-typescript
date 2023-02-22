import { expect } from "chai";
import cohere from "../cohere";
import { cohereResponse, generateResponse } from "../models/index";

const KEY: string = process.env.COHERE_API_KEY || "";
cohere.init(KEY);

describe("The generate endpoint successfully completes", () => {
  let response: cohereResponse<generateResponse>;
  before(async function () {
    this.timeout(5000);
    response = await cohere.generate({
      model: "medium",
      prompt: "hello what is your name. £ symbols sometimes cause problems.",
      max_tokens: 20,
      temperature: 1,
      k: 5,
      p: 1,
    });
  });
  it("Should should have a statusCode of 200", () => {
    expect(response).to.have.property("statusCode");
    expect(response.statusCode).to.equal(200);
  });
  it("Should contain a body property that contains a generations array of length one that contains a text property", () => {
    expect(response).to.have.property("body");
    expect(response.body).to.have.property("generations");
    expect(response.body.generations).to.have.lengthOf(1);
    expect(response.body.generations[0]).to.have.property("text");
  });
  it("Should contain text property with a string of length > 20", () => {
    expect(response.body.generations[0].text).to.have.length.greaterThan(20);
  });
});

describe("The generate endpoint successfully completes with multiple generations", () => {
  let response: cohereResponse<generateResponse>;
  before(async function () {
    this.timeout(5000);
    response = await cohere.generate({
      model: "medium",
      prompt: "hello what is your name",
      max_tokens: 20,
      temperature: 1,
      k: 5,
      num_generations: 2,
      p: 1,
    });
  });
  it("Should contain a body property that contains a generations array of length two", () => {
    expect(response).to.have.property("body");
    expect(response.body).to.have.property("generations");
    expect(response.body.generations).to.have.lengthOf(2);
  });
});

describe("The generate endpoint with generation return likelihoods successfully returns a likelihood", () => {
  let response: cohereResponse<generateResponse>;
  before(async function () {
    this.timeout(5000);
    response = await cohere.generate({
      model: "medium",
      prompt: "hello what is your name",
      max_tokens: 20,
      temperature: 1,
      k: 5,
      p: 1,
      return_likelihoods: "GENERATION",
    });
  });
  it("Should contain a body property that contains a likelihood", () => {
    expect(response.body.generations[0]).to.have.property("likelihood");
  });
});

describe("The generate endpoint with all return likelihoods successfully returns a likelihood", () => {
  let response: cohereResponse<generateResponse>;
  before(async function () {
    this.timeout(5000);
    response = await cohere.generate({
      model: "medium",
      prompt: "hello what is your name",
      max_tokens: 20,
      temperature: 1,
      k: 5,
      p: 1,
      return_likelihoods: "ALL",
    });
  });
  it("Should contain a body property that contains a likelihood", () => {
    expect(response.body.generations[0]).to.have.property("likelihood");
  });
});

describe("The generate endpoint with no return likelihoods does not return a likelihood", () => {
  let response: cohereResponse<generateResponse>;
  before(async function () {
    this.timeout(5000);
    response = await cohere.generate({
      model: "medium",
      prompt: "hello what is your name",
      max_tokens: 20,
      temperature: 1,
      k: 5,
      p: 1,
      return_likelihoods: "NONE",
    });
  });
  it("Should not contain a body property that contains a likelihood", () => {
    expect(response.body.generations[0]).to.not.have.property("likelihood");
  });
});

describe("The generate endpoint successfully completes with a preset", () => {
  let response: cohereResponse<generateResponse>;
  before(async function () {
    this.timeout(5000);
    response = await cohere.generate({
      preset: "SDK-TESTS-PRESET-cq2r57",
    });
  });
  it("Should should have a statusCode of 200", () => {
    expect(response).to.have.property("statusCode");
    expect(response.statusCode).to.equal(200);
  });
});

describe("The generate endpoint successfully completes with logit bias ", () => {
  let response: cohereResponse<generateResponse>;
  before(async function () {
    this.timeout(5000);
    response = await cohere.generate({
      model: "medium",
      prompt: "hello what is your name",
      max_tokens: 20,
      logit_bias: { 11: -5.5 },
    });
  });
  it("Should should have a statusCode of 200", () => {
    expect(response).to.have.property("statusCode");
    expect(response.statusCode).to.equal(200);
  });
});
