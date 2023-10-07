import { expect } from "chai";
import cohere from "../cohere";
import {
  chatPromptTruncation,
  chatRole,
  error,
  cohereResponse,
  searchQueriesOnlyChatResponse,
  nonStreamedChatResponse,
  streamEndResponse,
  streamStartResponse,
  streamedChatResponse,
  streamedChatResponseEventTypes,
} from "../models/index";

const KEY: string = process.env.COHERE_API_KEY || "";

describe("The chat endpoint", () => {
  before(() => {
    cohere.init(KEY);
  });

  describe("Non Streamed Chat Response", () => {
    let response: cohereResponse<nonStreamedChatResponse>;

    context("With connectors but no conversation_id", () => {
      before(async () => {
        response = (await cohere.chat({
          message: "What are the capabilities of Cohere AI?",
          stream: false,
          search_queries_only: false,
          connectors: [
            {
              id: "web-search",
              options: { site: "cohere.com" },
            },
          ],
        })) as cohereResponse<nonStreamedChatResponse>;
      });

      it("Should have a statusCode of 200", () => {
        expect(response).to.have.property("statusCode");
        expect(response.statusCode).to.equal(200);
      });

      it("Should contain a text", () => {
        expect(response).to.have.property("body");
        expect(response.body).to.have.property("text");
        expect(response.body).to.have.property("generation_id");
        expect(response.body).to.have.property("response_id");
        expect(response.body.text).to.not.be.empty;
        expect(response.body.generation_id).to.not.be.empty;
        expect(response.body.response_id).to.not.be.empty;
      });

      it("Should contain a body property that contains information about the token count", () => {
        expect(response.body).to.have.property("token_count");
        expect(response.body.token_count).to.not.be.empty;
        expect(response.body.token_count).to.have.property("prompt_tokens");
        expect(response.body.token_count.prompt_tokens).to.not.be.empty;
        expect(response.body.token_count).to.have.property("response_tokens");
        expect(response.body.token_count.response_tokens).to.not.be.empty;
        expect(response.body.token_count).to.have.property("total_tokens");
        expect(response.body.token_count.total_tokens).to.not.be.empty;
        expect(response.body.token_count).to.have.property("billed_tokens");
        expect(response.body.token_count.billed_tokens).to.not.be.empty;
      });

      it("Should contain a body property that contains meta information", () => {
        expect(response.body).to.have.property("meta");
        expect(response.body.meta).to.not.be.empty;
        expect(response.body.meta).to.have.property("api_version");
        expect(response.body.meta?.api_version).to.not.be.empty;
        expect(response.body.meta?.api_version).to.have.property("version");
        expect(response.body.meta?.api_version.version).to.not.be.empty;
      });

      it("Should contain a body property that contains citation information", () => {
        expect(response.body).to.have.property("citation");
        expect(response.body.citations).to.not.be.empty;
        expect(response.body.citations).to.be.an("array");
        response.body.citations?.forEach((citation) => {
          expect(citation).to.have.property("start").that.is.an("number");
          expect(citation).to.have.property("end").that.is.an("number");
          expect(citation).to.have.property("text").that.is.a("string");
          expect(citation).to.have.property("document_ids").that.is.an("array");
        });
      });

      it("Should contain a body property that contains documents information", () => {
        expect(response.body).to.have.property("documents");
        expect(response.body.documents).to.not.be.empty;
        expect(response.body.documents).to.be.an("array");
      });

      it("Should contain a body property that contains search results information", () => {
        expect(response.body).to.have.property("search_results");
        expect(response.body.search_results).to.not.be.empty;
        expect(response.body.search_results).to.be.an("array");
        response.body.search_results?.forEach((search_result) => {
          expect(search_result).to.have.property("search_query");
          expect(search_result.search_query).to.not.be.empty;
          expect(search_result).to.have.property("document_ids");
          expect(search_result.document_ids).to.not.be.empty;
          expect(search_result.document_ids).to.be.an("array");
          expect(search_result).to.have.property("connector");
          expect(search_result.connector).to.not.be.empty;
        });
      });

      it("Should contain a body property that contains search query information", () => {
        expect(response.body).to.have.property("search_queries");
        expect(response.body.search_queries).to.not.be.empty;
        expect(response.body.search_queries).to.be.an("array");
        response.body.search_queries?.forEach((search_query) => {
          expect(search_query).to.have.property("text");
          expect(search_query.text).to.not.be.empty;
          expect(search_query).to.have.property("generation_id");
          expect(search_query.generation_id).to.not.be.empty;
        });
      });

      it("Should not contain conversation_id", () => {
        expect(response.body).to.not.have.property("conversation_id");
      });
    });

    context("With documents but no conversation_id", () => {
      before(async () => {
        response = (await cohere.chat({
          message: "What actually caused the 2008 Financial Crisis?",
          stream: false,
          documents: [
            {
              id: "financial-crisis1",
              summary:
                "The 2008 financial crisis began with cheap credit and lax lending standards that fueled a housing bubble. When the bubble burst, the banks were left holding trillions of dollars of worthless investments in subprime mortgages. The Great Recession that followed cost many their jobs, their savings, and their homes.",
              source: "investopedia",
              date: "19 March 2023",
            },
            {
              id: "financial-crisis2",
              summary:
                "The catalysts for the GFC were falling US house prices and a rising number of borrowers unable to repay their loans. House prices in the United States peaked around mid 2006, coinciding with a rapidly rising supply of newly built houses in some areas.",
              source: "Reserve Bank of Australia",
              reporting_country: "Australia",
            },
          ],
        })) as cohereResponse<nonStreamedChatResponse>;
      });

      it("Should have a statusCode of 200", () => {
        expect(response).to.have.property("statusCode");
        expect(response.statusCode).to.equal(200);
      });

      it("Should contain a text", () => {
        expect(response).to.have.property("body");
        expect(response.body).to.have.property("text");
        expect(response.body).to.have.property("generation_id");
        expect(response.body).to.have.property("response_id");
        expect(response.body.text).to.not.be.empty;
        expect(response.body.generation_id).to.not.be.empty;
        expect(response.body.response_id).to.not.be.empty;
      });

      it("Should contain a body property that contains information about the token count", () => {
        expect(response.body).to.have.property("token_count");
        expect(response.body.token_count).to.not.be.empty;
        expect(response.body.token_count).to.have.property("prompt_tokens");
        expect(response.body.token_count.prompt_tokens).to.not.be.empty;
        expect(response.body.token_count).to.have.property("response_tokens");
        expect(response.body.token_count.response_tokens).to.not.be.empty;
        expect(response.body.token_count).to.have.property("total_tokens");
        expect(response.body.token_count.total_tokens).to.not.be.empty;
        expect(response.body.token_count).to.have.property("billed_tokens");
        expect(response.body.token_count.billed_tokens).to.not.be.empty;
      });

      it("Should contain a body property that contains meta information", () => {
        expect(response.body).to.have.property("meta");
        expect(response.body.meta).to.not.be.empty;
        expect(response.body.meta).to.have.property("api_version");
        expect(response.body.meta?.api_version).to.not.be.empty;
        expect(response.body.meta?.api_version).to.have.property("version");
        expect(response.body.meta?.api_version.version).to.not.be.empty;
      });

      it("Should contain a body property that contains citation information", () => {
        expect(response.body).to.have.property("citation");
        expect(response.body.citations).to.not.be.empty;
        expect(response.body.citations).to.be.an("array");
        response.body.citations?.forEach((citation) => {
          expect(citation).to.have.property("start").that.is.an("number");
          expect(citation).to.have.property("end").that.is.an("number");
          expect(citation).to.have.property("text").that.is.a("string");
          expect(citation).to.have.property("document_ids").that.is.an("array");
        });
      });

      it("Should contain a body property that contains documents information", () => {
        expect(response.body).to.have.property("documents");
        expect(response.body.documents).to.not.be.empty;
        expect(response.body.documents).to.be.an("array");
      });

      it("Should not contain search_results or search_queries", () => {
        expect(response.body).to.not.have.property("search_results");
        expect(response.body).to.not.have.property("search_queries");
      });

      it("Should not contain conversation_id", () => {
        expect(response.body).to.not.have.property("conversation_id");
      });
    });

    context("With conversation_id but no connectors or documents", () => {
      before(async () => {
        response = (await cohere.chat({
          message: "Can you tell me about LLMs?",
          stream: false,
          chat_history: [
            { role: chatRole.USER, message: "Hey!", user_name: "test-user" },
            {
              role: chatRole.CHATBOT,
              message: "Hey! How can I help you today?",
              user_name: "test-cohere",
            },
          ],
          conversation_id: "test-convo-id",
        })) as cohereResponse<nonStreamedChatResponse>;
      });

      it("Should have a statusCode of 200", () => {
        expect(response).to.have.property("statusCode");
        expect(response.statusCode).to.equal(200);
      });

      it("Should contain a text", () => {
        expect(response).to.have.property("body");
        expect(response.body).to.have.property("text");
        expect(response.body).to.have.property("generation_id");
        expect(response.body).to.have.property("response_id");
        expect(response.body.text).to.not.be.empty;
        expect(response.body.generation_id).to.not.be.empty;
        expect(response.body.response_id).to.not.be.empty;
      });

      it("Should contain a body property that contains information about the token count", () => {
        expect(response.body).to.have.property("token_count");
        expect(response.body.token_count).to.not.be.empty;
        expect(response.body.token_count).to.have.property("prompt_tokens");
        expect(response.body.token_count.prompt_tokens).to.not.be.empty;
        expect(response.body.token_count).to.have.property("response_tokens");
        expect(response.body.token_count.response_tokens).to.not.be.empty;
        expect(response.body.token_count).to.have.property("total_tokens");
        expect(response.body.token_count.total_tokens).to.not.be.empty;
        expect(response.body.token_count).to.have.property("billed_tokens");
        expect(response.body.token_count.billed_tokens).to.not.be.empty;
      });

      it("Should contain a body property that contains meta information", () => {
        expect(response.body).to.have.property("meta");
        expect(response.body.meta).to.not.be.empty;
        expect(response.body.meta).to.have.property("api_version");
        expect(response.body.meta?.api_version).to.not.be.empty;
        expect(response.body.meta?.api_version).to.have.property("version");
        expect(response.body.meta?.api_version.version).to.not.be.empty;
      });

      it("Should contain a body property that contains the conversation_id", () => {
        expect(response.body).to.have.property("conversation_id");
        expect(response.body.conversation_id).to.not.be.empty;
      });

      it("Should not contain citation, documents, search_results, or search_queries", () => {
        expect(response.body).to.not.have.property("citation");
        expect(response.body).to.not.have.property("documents");
        expect(response.body).to.not.have.property("search_results");
        expect(response.body).to.not.have.property("search_queries");
      });
    });

    context("With both connectors and documents", () => {
      before(async () => {
        response = (await cohere.chat({
          message: "What are the capabilities of Cohere AI?",
          stream: false,
          connectors: [
            {
              id: "web-search",
              options: { site: "cohere.com" },
            },
            {
              id: "web-search",
              options: { site: "techcrunch.com" },
            },
          ],
          documents: [{ id: "some-id", author: "Kyle Wiggins" }],
        })) as cohereResponse<nonStreamedChatResponse>;
      });

      it("Should have a statusCode of 400 as both connectors and documents cannot be specified at the same time", async () => {
        expect(response).to.have.property("statusCode");
        expect(response.statusCode).to.equal(400);
      });

      it("Should contain a body property that contains the error information", () => {
        expect(response).to.have.property("body");
        expect(response.body).to.have.property("message");
        expect(response.body).to.equal({
          message:
            "invalid request: cannot specify both connectors and documents.",
        });
      });
    });

    context("With no message specified", () => {
      before(async () => {
        response = (await cohere.chat({
          message: "",
          stream: false,
          connectors: [
            {
              id: "web-search",
              options: { site: "cohere.com" },
            },
          ],
        })) as cohereResponse<nonStreamedChatResponse>;
      });

      it("Should have a statusCode of 400 as message is a required field", async () => {
        expect(response).to.have.property("statusCode");
        expect(response.statusCode).to.equal(400);
      });

      it("Should contain a body property that contains the error information", () => {
        expect(response).to.have.property("body");
        expect(response.body).to.have.property("message");
        expect(response.body).to.equal({
          message: "invalid request: message must be at least 1 token long.",
        });
      });
    });

    context("With connectors and prompt_truncation OFF", () => {
      before(async () => {
        response = (await cohere.chat({
          message: "What actually caused the 2008 Financial Crisis?",
          stream: false,
          prompt_truncation: chatPromptTruncation.OFF,
          connectors: [{ id: "web-search" }],
        })) as cohereResponse<nonStreamedChatResponse>;
      });

      it("Should have a statusCode of 400 as if there are too many tokens", async () => {
        expect(response).to.have.property("statusCode");
        expect(response.statusCode).to.equal(400);
      });

      it("Should contain a body property that contains the error information", () => {
        expect(response).to.have.property("body");
        expect(response.body).to.have.property("message");
        expect((response.body as error).message).to.include("too many tokens");
      });
    });
  });

  describe("Search Queries Only Chat Response", () => {
    let response: cohereResponse<searchQueriesOnlyChatResponse>;

    before(async () => {
      response = (await cohere.chat({
        message: "What are the capabilities of Cohere AI?",
        stream: false,
        search_queries_only: true,
        connectors: [
          {
            id: "web-search",
            options: { site: "cohere.com" },
          },
        ],
      })) as cohereResponse<searchQueriesOnlyChatResponse>;
    });

    it("Should have a statusCode of 200", () => {
      expect(response).to.have.property("statusCode");
      expect(response.statusCode).to.equal(200);
    });

    it("Should contain a body property that contains meta information", () => {
      expect(response.body).to.have.property("meta");
      expect(response.body.meta).to.not.be.empty;
      expect(response.body.meta).to.have.property("api_version");
      expect(response.body.meta?.api_version).to.not.be.empty;
      expect(response.body.meta?.api_version).to.have.property("version");
      expect(response.body.meta?.api_version.version).to.not.be.empty;
    });

    it("Should contain response_id and is_search_required", () => {
      expect(response.body).to.have.property("response_id");
      expect(response.body.response_id).to.not.be.empty;
      expect(response.body).to.have.property("is_search_required");
      expect(response.body.is_search_required).to.be.a("boolean");
    });

    it("Should contain a body property that contains search query information", () => {
      expect(response.body).to.have.property("search_queries");
      expect(response.body.search_queries).to.not.be.empty;
      expect(response.body.search_queries).to.be.an("array");
      response.body.search_queries?.forEach((search_query) => {
        expect(search_query).to.have.property("text");
        expect(search_query.text).to.not.be.empty;
        expect(search_query).to.have.property("generation_id");
        expect(search_query.generation_id).to.not.be.empty;
      });
    });

    it("Should not contain text, generation_id, token_count, citation, documents, search_results", () => {
      expect(response.body).to.not.have.property("text");
      expect(response.body).to.not.have.property("generation_id");
      expect(response.body).to.not.have.property("token_count");
      expect(response.body).to.not.have.property("citation");
      expect(response.body).to.not.have.property("documents");
      expect(response.body).to.not.have.property("search_results");
    });
  });

  describe("Streamed Chat Response", () => {
    let response: cohereResponse<string>;

    context("With connectors", () => {
      before(async () => {
        response = (await cohere.chat({
          message: "What actually caused the 2008 Financial Crisis?",
          stream: true,
          prompt_truncation: chatPromptTruncation.AUTO,
          connectors: [{ id: "web-search" }],
        })) as cohereResponse<string>;
      });

      it("Should have a statusCode of 200", () => {
        expect(response).to.have.property("statusCode");
        expect(response.statusCode).to.equal(200);
      });

      it("Should contain a body", () => {
        expect(response).to.have.property("body");
        expect(response.body).to.not.be.empty;
      });

      it("Should contain a stream of JSON objects inside the body", () => {
        const jsonStream = response.body.split("\n");
        const jsonObjects: streamedChatResponse[] = [];
        jsonStream.forEach((jsonString: string) => {
          if (jsonString.trim() === "") return; // Skip empty lines

          const jsonObject = JSON.parse(jsonString);
          expect(jsonObject).to.have.property("event_type");
          expect(jsonObject.event_type).to.not.be.empty;
          expect(jsonObject).to.have.property("is_finished");
          expect(jsonObject.is_finished).to.be.a("boolean");
          jsonObjects.push(jsonObject);
        });

        expect((jsonObjects[0] as streamStartResponse).event_type).to.equal(
          streamedChatResponseEventTypes.STREAM_START
        );
        expect((jsonObjects[0] as streamStartResponse).is_finished).to.equal(
          false
        );
        expect((jsonObjects[-1] as streamEndResponse).event_type).to.equal(
          streamedChatResponseEventTypes.STREAM_END
        );
        expect((jsonObjects[-1] as streamEndResponse).is_finished).to.equal(
          true
        );
      });
    });

    context("With documents", () => {
      before(async () => {
        response = (await cohere.chat({
          message: "What actually caused the 2008 Financial Crisis?",
          stream: true,
          search_queries_only: false,
          prompt_truncation: chatPromptTruncation.AUTO,
          documents: [
            {
              id: "financial-crisis1",
              summary:
                "The 2008 financial crisis began with cheap credit and lax lending standards that fueled a housing bubble. When the bubble burst, the banks were left holding trillions of dollars of worthless investments in subprime mortgages. The Great Recession that followed cost many their jobs, their savings, and their homes.",
              source: "investopedia",
              date: "19 March 2023",
            },
            {
              id: "financial-crisis2",
              summary:
                "The catalysts for the GFC were falling US house prices and a rising number of borrowers unable to repay their loans. House prices in the United States peaked around mid 2006, coinciding with a rapidly rising supply of newly built houses in some areas.",
              source: "Reserve Bank of Australia",
              reporting_country: "Australia",
            },
          ],
        })) as cohereResponse<string>;
      });

      it("Should contain a stream of JSON objects inside the body that do not contain search event typesju", () => {
        const jsonStream = response.body.split("\n");
        const jsonObjects: streamedChatResponse[] = [];
        jsonStream.forEach((jsonString: string) => {
          if (jsonString.trim() === "") return; // Skip empty lines

          const jsonObject = JSON.parse(jsonString);
          expect(jsonObject).to.have.property("event_type");
          expect(jsonObject.event_type).to.not.be.empty;
          expect(jsonObject.event_type).to.not.equal(
            streamedChatResponseEventTypes.SEARCH_QUERIES_GENERATION
          );
          expect(jsonObject.event_type).to.not.equal(
            streamedChatResponseEventTypes.SEARCH_RESULTS
          );
          expect(jsonObject).to.have.property("is_finished");
          expect(jsonObject.is_finished).to.be.a("boolean");
          jsonObjects.push(jsonObject);
        });

        expect((jsonObjects[0] as streamStartResponse).event_type).to.equal(
          streamedChatResponseEventTypes.STREAM_START
        );
        expect((jsonObjects[0] as streamStartResponse).is_finished).to.equal(
          false
        );
        expect((jsonObjects[-1] as streamEndResponse).event_type).to.equal(
          streamedChatResponseEventTypes.STREAM_END
        );
        expect((jsonObjects[-1] as streamEndResponse).is_finished).to.equal(
          true
        );
      });
    });
  });
});
