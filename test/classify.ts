import { expect } from "chai";
import cohere from "../cohere";

const KEY: string = process.env.COHERE_API_KEY || "";

describe("The classify endpoint", () => {
  cohere.init(KEY);

  it("Should throw an error for empty examples", async () => {
    for (const examples of [[], undefined]) {
      try {
        await cohere.classify({
          model: "small",
          examples: examples,
          inputs: ["orange"],
          preset: "SDK-TESTS-PRESET-rfa6h3",
        });
      } catch (e) {
        expect(e)
          .to.be.an("error")
          .to.have.property("message", "`examples` must not be empty");
      }
    }
  });

  it("Should throw an error for empty inputs", async () => {
    for (const inputs of [[], undefined]) {
      try {
        await cohere.classify({
          model: "small",
          examples: [
            { text: "apple", label: "food" },
            { text: "pizza", label: "food" },
          ],
          inputs: inputs,
          preset: "SDK-TESTS-PRESET-rfa6h3",
        });
      } catch (e) {
        expect(e)
          .to.be.an("error")
          .to.have.property("message", "`inputs` must not be empty");
      }
    }
  });

  it("Should have a statusCode of 200", async () => {
    const response = await cohere.classify({
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

    it("Should contain a body property that contains meta information", () => {
      expect(response.body).to.have.property("meta");
      expect(response.body.meta).to.have.property("api_version");
      expect(response.body.meta?.api_version).to.have.property("version");
    });
  });
  it("Should contain a body property that contains a classifications property", async () => {
    const response = await cohere.classify({
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
      truncate: "NONE",
    });
    expect(response).to.have.property("body");
    expect(response.body.classifications).to.be.an("array");
  });
  it("Should contain prediction for food and color", async () => {
    const response = await cohere.classify({
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
      truncate: "START",
    });

    expect(response.body.classifications[0].prediction).to.equal("color"); // pink
    expect(response.body.classifications[1].prediction).to.equal("food"); // eggplant
    expect(response.body.classifications[2].prediction).to.equal("food"); // pasta
  });

  it("Should contain labels", async () => {
    const response = await cohere.classify({
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
      truncate: "END",
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
    const response = await cohere.classify({
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

  it("Should have a statusCode of 200 with a preset", async () => {
    const response = await cohere.classify({
      inputs: ["pineapple"],
      examples: [
        { text: "apple", label: "food" },
        { text: "banana", label: "food" },
        { text: "red", label: "color" },
        { text: "pink", label: "color" },
      ],
      preset: "SDK-TESTS-PRESET-rfa6h3",
    });

    expect(response).to.have.property("statusCode");
    expect(response.statusCode).to.equal(200);
  });
}).timeout(5000);
