import { expect } from 'chai';
import cohere = require('../index');
require('dotenv').config({ path: '.env.test' });
const KEY: string = process.env.API_KEY || '';

describe('The embed endpoint', () => {
  let response: any;
  cohere.init(KEY);
  const texts = [
    'co:here',
    'cohere',
    'embed',
    'python',
    'golang',
    'typescript',
    'rust?',
    'ai',
    'nlp',
    'neural',
    'nets',
  ];
  before(async () => {
    response = await cohere.embed({
      texts: texts,
      truncate: 'NONE',
    });
  });
  it('Should should have a statusCode of 200', () => {
    expect(response).to.have.property('statusCode');
    expect(response.statusCode).to.equal(200);
  });
  it('Should contain a body object that contains an embeddings property', () => {
    expect(response).to.have.property('body');
    expect(response.body).to.have.property('embeddings');
  });
  it('Should contain an embeddings array with a length matching the provided amount of embeddings', () => {
    expect(response.body.embeddings).to.be.an('array').of.length(texts.length);
  });
  it('Should contain an embeddings array containing arrays', () => {
    response.body.embeddings.forEach((item: any) => {
      expect(item).to.be.an('array');
    });
  });
});
