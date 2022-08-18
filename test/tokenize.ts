import { expect } from 'chai';
import cohere = require('../index');
require('dotenv').config({ path: '.env.test' })
const KEY: string = process.env.API_KEY || '';

describe('The tokenize endpoint', () => {
    var response: any;
    cohere.init(KEY);
    before(async () => {
        response = await cohere.tokenize(
            {text: "hello world"},
        );
    });
    it('Should should have a statusCode of 200', () => {
        expect(response).to.have.property('statusCode');
        expect(response.statusCode).to.equal(200);
    });
    it('Should contain the correct tokens', () => {
        expect(response).to.have.property('body');
        expect(response.body).to.have.property('tokens');
        expect(response.body.tokens).to.deep.equal([33555, 1114])
    });
});
