import { expect } from "chai";
import cohere from "../cohere";
import { cohereResponse, summarizeResponse } from "../models/index";

const KEY: string = process.env.COHERE_API_KEY || "";

describe("The summarize endpoint", () => {
  let response: cohereResponse<summarizeResponse>;
  cohere.init(KEY);
  before(async () => {
    const en = "Hello world";
    const ru = "Здравствуй, Мир";
    response = await cohere.summarize({
      text: "If you want to get classic Angry Birds from Google Play — the version that costs just a buck and isn’t laden with microtransactions — you’d better get it quick. Rovio Classics: Angry Birds, a rebuilt version of the original mobile hit, will be delisted from Google’s app store on Thursday due to “the game’s impact on our wider games portfolio,” developer Rovio announced on Tuesday. Oddly, the App Store version will still be available, though Rovio’s plan is to change the game’s name to Red’s First Flight.\n\nMy guess is that Rovio is delisting this remake of Angry Birds to push people toward its free-to-play games in the series that make money off microtransactions. As a $1 one-time purchase, the Rovio Classics version of the game likely doesn’t make nearly the same amount of money as its other Angry Birds titles do. That $1 price may also be enough to keep players away from other games in the series, which means Rovio might feel like it’s leaving money on the table by still offering Rovio Classics: Angry Birds on Google Play.\n\nThat said, I don’t know why Rovio isn’t just changing the name of the game on Google Play like it is on the App Store. While the change to Red’s First Flight will likely make the game much harder to find unless you know exactly what you’re looking for, it will at least still be there as an option. Rovio didn’t immediately respond to a request for comment.\n\nHere is a transcribed version of Rovio’s full Twitter message about the change, which is a little difficult to read in the tweet:\n\nWe have reviewed the business case of Rovio Classics: Angry Birds, and due to the game’s impact on our wider games portfolio, we have decided that Rovio Classics: Angry Birds will be unlisted from the Google Play Store on Thursday, February 23. Additionally, the game will be renamed to Red’s First Flight in the App Store pending further review. Rovio Classics: Angry Birds will remain playable on devices on which the game has been downloaded, even after it has been unlisted.\n\nWe understand that this is sad news for many fans, as well as the team that has worked hard to make Rovio Classics: Angry Birds a reality. We are extremely grateful to the Angry Birds fans who have shown their love of the brand and this game from the beginning. We hope those fans can continue to bring that passion to our live Angry Birds slingshot games such as Angry Birds 2, Angry Birds Friends, and Angry Birds Journey, where our goal every day is to craft the best possible experience for players.\n\nIf you want to get Rovio Classics: Angry Birds before the changes, you can still buy it as of this writing on Google Play and the App Store. On both app stores, it’s technically listed as Rovio Classics: AB — which, to me, feels like a further attempt from Rovio to bury the game.",
    });
  });
  it("Should should have a statusCode of 200", () => {
    expect(response).to.have.property("statusCode");
    expect(response.statusCode).to.equal(200);
  });
  it("Should contain a summary", () => {
    expect(response).to.have.property("body");
    expect(response.body).to.have.property("id");
    expect(response.body).to.have.property("summary");
    expect(response.body.summary).to.not.be.empty;
    expect(response.body.id).to.not.be.empty;
  });
});
