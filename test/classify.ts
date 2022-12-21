import { expect } from "chai";
import cohere from "../cohere";
import { cohereResponse, classifyResponse } from "../models/index";

const KEY: string = process.env.COHERE_API_KEY || "";

describe("The classify endpoint", () => {
  let response: cohereResponse<classifyResponse>;
  cohere.init(KEY);

  it("Should should have a statusCode of 200", async () => {
    response = await cohere.classify({
      model: "small",
      examples: [
        { text: "apple", label: "food" },
        { text: "pizza", label: "food" },
        { text: "hamburger", label: "food" },
        { text: "taco", label: "food" },
        { text: "onion", label: "food" },
        { text: "purple", label: "color" },
        { text: "yellow", label: "color" },
        { text: "red", label: "color" },
        { text: "black", label: "color" },
        { text: "white", label: "color" },
      ],
      inputs: ["orange"],
    });

    expect(response).to.have.property("statusCode");
    expect(response.statusCode).to.equal(200);
  });
  it("Should contain a body property that contains a classifications property", async () => {
    response = await cohere.classify({
      model: "small",
      examples: [
        { text: "apple", label: "food" },
        { text: "pizza", label: "food" },
        { text: "hamburger", label: "food" },
        { text: "taco", label: "food" },
        { text: "onion", label: "food" },
        { text: "purple", label: "color" },
        { text: "yellow", label: "color" },
        { text: "red", label: "color" },
        { text: "black", label: "color" },
        { text: "white", label: "color" },
      ],
      inputs: ["orange"],
    });
    expect(response).to.have.property("body");
    expect(response.body.classifications).to.be.an("array");
  });
  it("Should contain prediciton for food and color", async () => {
    response = await cohere.classify({
      model: "small",
      examples: [
        { text: "apple", label: "food" },
        { text: "pizza", label: "food" },
        { text: "hamburger", label: "food" },
        { text: "taco", label: "food" },
        { text: "onion", label: "food" },
        { text: "purple", label: "color" },
        { text: "yellow", label: "color" },
        { text: "red", label: "color" },
        { text: "black", label: "color" },
        { text: "white", label: "color" },
      ],
      inputs: ["pink", "eggplant", "pasta"],
    });

    expect(response.body.classifications[0].prediction).to.equal("color"); // pink
    expect(response.body.classifications[1].prediction).to.equal("food"); // eggplant
    expect(response.body.classifications[2].prediction).to.equal("food"); // pasta
  });

  it("Should contain labels", async () => {
    response = await cohere.classify({
      model: "small",
      examples: [
        { text: "apple", label: "food" },
        { text: "pizza", label: "food" },
        { text: "hamburger", label: "food" },
        { text: "taco", label: "food" },
        { text: "onion", label: "food" },
        { text: "purple", label: "color" },
        { text: "yellow", label: "color" },
        { text: "red", label: "color" },
        { text: "black", label: "color" },
        { text: "white", label: "color" },
      ],
      inputs: ["brown"],
    });
    expect(response.body.classifications[0].labels).to.be.an("object");
    expect(response.body.classifications[0].labels["color"]).to.have.property(
      "confidence"
    );
    expect(Object.keys(response.body.classifications[0].labels)).to.have.length(
      2
    );
  });

  it("Should classify for all params", async () => {
    response = await cohere.classify({
      model: "small",
      examples: [
        { text: "apple", label: "food" },
        { text: "pizza", label: "food" },
        { text: "hamburger", label: "food" },
        { text: "taco", label: "food" },
        { text: "onion", label: "food" },
        { text: "purple", label: "color" },
        { text: "yellow", label: "color" },
        { text: "red", label: "color" },
        { text: "black", label: "color" },
        { text: "white", label: "color" },
      ],
      inputs: ["blue", "hamburger", "pasta"],
    });
    expect(response.body.classifications[0].prediction).to.equal("color"); // blue
    expect(response.body.classifications[1].prediction).to.equal("food"); // hamburger
    expect(response.body.classifications[2].prediction).to.equal("food"); // pasta
  });

  it("Should should have a statusCode of 200 with a preset", async () => {
    response = await cohere.classify({ preset: "SDK-TESTS-PRESET-rfa6h3" });

    expect(response).to.have.property("statusCode");
    expect(response.statusCode).to.equal(200);
  });
}).timeout(5000);
