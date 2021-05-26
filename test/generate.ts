import { expect } from 'chai';
import cohere = require('../index');
require('dotenv').config({ path: __dirname + '/../.env.test' })
const KEY:string = process.env.API_KEY || '';
// describe('The cohere sdk', () => {
//   var response;
//   before(async () => {
//     response = await cohere.generate("baseline-shrimp", {
//       prompt: "hello what is your name",
//       max_tokens: 20,
//       temperature: 1,
//       k: 5,
//       p: 1
//     });
//   });
//   it('Should fail with a 403 when no API key is provided', () => {
//     expect(response).to.have.property('statusCode');
//     expect(response.statusCode).to.equal(403);
//   })
// });
cohere.init(KEY);

describe('The generate endpoint', () => {
  var response:any;
  before(async () => {
    response = await cohere.generate("baseline-shrimp", {
      prompt: "hello what is your name",
      max_tokens: 20,
      temperature: 1,
      k: 5,
      p: 1
    });
  });
  it('Should should have a statusCode of 200', () => {
    expect(response).to.have.property('statusCode');
    expect(response.statusCode).to.equal(200);
  });
  it('Should contain a body property that contains a text property', () => {
    expect(response).to.have.property('body');
    expect(response.body).to.have.property('text');
  });
  it('Should contain text property with a string of length > 2', () => {
    expect(response.body.text).to.be.a.string;
    expect(response.body.text).to.have.length.greaterThan(2);
  });
});