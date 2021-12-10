import { expect } from 'chai';
import cohere = require('../index');
require('dotenv').config({ path: '.env.test' })
const KEY: string = process.env.API_KEY || '';

describe('The likelihood endpoint', () => {
  var response: any;
  cohere.init(KEY);
  before(async () => {
    response = await cohere.likelihood("small", {
      text: "So I crept up the basement stairs and BOOOO!",
    });
  });
  it('Should should have a statusCode of 200', () => {
    expect(response).to.have.property('statusCode');
    expect(response.statusCode).to.equal(200);
  });
  it('Should contain the correct properties', () => {
    expect(response).to.have.property('body');
    expect(response.body).to.have.property('likelihood');
    expect(response.body.likelihood).to.be.a('number')
    expect(response.body).to.have.property('token_likelihoods');
    expect(response.body.token_likelihoods).to.be.an('array')
  });
  it('Should contain an array of objects with tokens', () => {
    response.body.token_likelihoods.forEach((item: any) => {
      expect(item).to.have.property('token');
    });
  });
});
