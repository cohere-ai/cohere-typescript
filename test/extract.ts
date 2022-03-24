import { expect } from 'chai';
import { extract, extractEntity, extraction } from '../models/index';
import cohere = require('../index');
require('dotenv').config({ path: '.env.test' })
const KEY: string = process.env.API_KEY || '';

describe('The extract endpoint', () => {
    var response: any;
    cohere.init(KEY);
    before(async () => {
        response = await cohere.extract("small", {
            examples: [{
                text: "hello my name is John, and I like to play ping pong",
                entities: [
                    { type: "Name", value: "John" }
                ],
            }],
            texts: ["hello Roberta, how are you doing today?"]
        });
    });
    it('Should should have a statusCode of 200', () => {
        expect(response).to.have.property('statusCode');
        expect(response.statusCode).to.equal(200);
    });
    it('Should contain the correct properties', () => {
        expect(response).to.have.property('body');
        expect(response.body).to.have.property('results');
        expect(response.body.results).to.be.a('array')
    });
    //this is a quality/formatting check more than anything
    it('Should contain the name extracted', () => {
        expect(response.body.results.length).to.above(0);
        const firstExtraction: extraction = response.body.results[0];
        const entity: extractEntity = firstExtraction.entities[0];
        expect(entity.type).to.equal("Name");
        expect(entity.value).to.equal("Roberta");
    });
});

describe('The extract endpoint', () => {
    var response: any;
    cohere.init(KEY);
    before(async () => {
        response = await cohere.extract("small", {
            examples: [],
            texts: ["hello Roberta, how are you doing today?"]
        });
    });
    it('Should should fail when no text are given', () => {
        expect(response).to.have.property('statusCode');
        expect(response.statusCode).to.equal(400);
    });
});

describe('The extract endpoint', () => {
    var response: any;
    cohere.init(KEY);
    before(async () => {
        response = await cohere.extract("small", {
            examples: [{
                text: "",
                entities: [
                    { type: "Name", value: "John" }
                ],
            }],
            texts: ["hello Roberta, how are you doing today?"]
        });
    });
    it('Should should fail when no text is given in examples', () => {
        expect(response).to.have.property('statusCode');
        expect(response.statusCode).to.equal(400);
    });
});

describe('The extract endpoint', () => {
    var response: any;
    cohere.init(KEY);
    before(async () => {
        response = await cohere.extract("small", {
            examples: [{
                text: "hello my name is John, and I like to play ping pong",
                entities: []
            }],
            texts: ["hello Roberta, how are you doing today?"]
        });
    });
    it('Should should fail when no entities are given in examples', () => {
        expect(response).to.have.property('statusCode');
        expect(response.statusCode).to.equal(400);
    });
});

describe('The extract endpoint', () => {
    var response: any;
    cohere.init(KEY);
    before(async () => {
        response = await cohere.extract("small", {
            examples: [{
                text: "hello my name is John, and I like to play ping pong",
                entities: [
                    { type: "Name", value: "John" }
                ],
            }],
            texts: [""]
        });
    });
    it('Should should fail when no text is given', () => {
        expect(response).to.have.property('statusCode');
        expect(response.statusCode).to.equal(400);
    });
});