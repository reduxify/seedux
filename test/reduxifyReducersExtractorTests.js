const chai = require('chai');
const expect = require('chai').expect;
const { testReducers, answerReducers } = require('./fixtures/reduxifyReducerExtractorFixtures');
const { reduxify } = require('./../Library/src/reduxifyExtractor');

describe('reduxify.ReducerExtractor', () => {

const output = reduxify.ReducerExtractor(testReducers);

  it('should be a function', () => {
    expect(reduxify.ReducerExtractor).to.be.a.function;
  })

  it('should return an array composed of objects', () => {
    expect(output).to.be.an('array');
    expect(output[0]).to.be.an('object');
  })

  it('should return an array composed of objects with the keys "name" and "type"', () => {
    expect(output[0].name).to.exist;
    expect(output[0].cases).to.exist;
  })

  it('should return an array composed of objects with the key types of "string" and "array"', () => {
    expect(output[0].name).to.be.a('string');
    expect(output[0].cases).to.be.an('array');
  })

  it('should return a properly structured output for a given input', () => {
    expect(output).to.deep.equal(answerReducers);
  })

});
