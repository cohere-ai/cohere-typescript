import { expect } from 'chai';
import cohere = require('../index');
require('dotenv').config({ path: '.env.test' })

describe('The similarity endpoint', () => {
  var response: any;
  cohere.init(process.env.API_KEY);
  const targets = ["greeting", "request for assistance"];
  before(async () => {
    response = await cohere.similarity("baseline-shrimp", {
      anchor: "Hi how are you doing today?",
      targets
    });
  });
  it('Should should have a statusCode of 200', () => {
    expect(response).to.have.property('statusCode');
    expect(response.statusCode).to.equal(200);
  });
  it('Should contain a body property that contains a similarities property', () => {
    expect(response).to.have.property('body');
    expect(response.body).to.have.property('similarities');
  });
  it('Should contain a similarities array with a length matching the provided amount of targets', () => {
    expect(response.body.similarities).to.be.an('array').of.length(targets.length)
  });

  it('Should contain a similarities array containing only number values', () => {
    response.body.similarities.forEach((item: any) => {
      expect(item).to.be.a('number');
    });
  });
});