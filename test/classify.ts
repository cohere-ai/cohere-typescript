import { expect } from 'chai';
import cohere = require('../index');
require('dotenv').config({ path: '.env.test' });
const KEY: string = process.env.API_KEY || '';

describe('The classify endpoint', () => {
  let response: any;
  cohere.init(KEY);

  it('Should should have a statusCode of 200', async () => {
    response = await cohere.classify('medium', {
      examples: [{ text: 'apple', label: 'food' }],
      texts: ['green'],
    });
    expect(response).to.have.property('statusCode');
    expect(response.statusCode).to.equal(200);
  });
  it('Should contain a body property that contains a classifications property', async () => {
    response = await cohere.classify('medium', {
      examples: [{ text: 'apple', label: 'food' }],
      texts: ['green'],
    });
    expect(response).to.have.property('body');
    expect(response.body.classifications).to.be.an('array');
  });
  it('Should contain prediciton for food and color', async () => {
    response = await cohere.classify('medium', {
      examples: [
        { text: 'apple', label: 'food' },
        { text: 'purple', label: 'color' },
        { text: 'orange', label: 'food' },
        { text: 'yellow', label: 'color' },
      ],
      texts: ['green', 'pineapple', 'watermelon'],
    });
    expect(response.body.classifications[0].prediction).to.be('colour'); // green
    expect(response.body.classifications[1].prediction).to.be('food'); // pineapple
    expect(response.body.classifications[2].prediction).to.be('food'); // watermelon
  });

  it('Should classify for all params', async () => {
    response = await cohere.classify('medium', {
      task: 'Classify these words as either a colour or a food.',
      examples: [
        { text: 'apple', label: 'food' },
        { text: 'purple', label: 'color' },
        { text: 'orange', label: 'food' },
        { text: 'yellow', label: 'color' },
      ],
      texts: ['green', 'pineapple', 'watermelon'],
      prompt: 'This is a',
    });
    expect(response.body.classifications[0].prediction).to.be('colour'); // green
    expect(response.body.classifications[1].prediction).to.be('food'); // pineapple
    expect(response.body.classifications[2].prediction).to.be('food'); // watermelon
  });
});
