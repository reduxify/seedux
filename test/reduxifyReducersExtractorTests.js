const chai = require('chai');
const expect = require('chai').expect;
const { testReducers, answerReducers } = require('./fixtures/reduxifyReducerExtractorFixtures');
const { reduxify } = require('./../Library/src/reduxifyExtractor');

describe('reduxify.ReducerExtractor', () => {

  it('should be a function', () => {
    expect(reduxify.ReducerExtractor).to.be.a.function;
  })

  it('should return an array composed of objects', () => {
    expect(reduxify.ReducerExtractor(testReducers).to.be.an('array'));
    expect(reduxify.ReducerExtractor(testReducers)[0].to.be.an('object'));
  })

  it('should return an array composed of objects with the keys "name" and "type"', () => {
    expect(reduxify.ReducerExtractor(testReducers)[0].hasOwnProperty('name').to.be.true);
    expect(reduxify.ReducerExtractor(testReducers)[0].hasOwnProperty('cases').to.be.true);
  })

  it('should return an array composed of objects with the key types of "string" and "array"', () => {
    expect(reduxify.ReducerExtractor(testReducers)[0].name.to.be.a('string'));
    expect(reduxify.ReducerExtractor(testReducers)[0].type.to.be.an('array'));
  })

  it('should return a properly structured output for a given input', () => {
    expect(reduxify.ReducerExtractor(testReducers).to.deep.equal(answerReducers));
  })

});
