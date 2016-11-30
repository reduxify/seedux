const chai = require('chai');
const expect = require('chai').expect;
const { testReducers, answerReducers, answerD3Reducers } = require('./fixtures/reduxifyReducerExtractorFixtures');
const { reduxify } = require('./../Library/src/reduxifyExtractor');
const { D3ReducerStructurer } = require('./../Library/src/reduxifyD3Structurer');

describe('reduxify.ReducerExtractor', () => {

const output = reduxify.ReducerExtractor(testReducers);
const outputD3 = D3ReducerStructurer(output);

  it('should be a function', () => {
    expect(reduxify.ReducerExtractor).to.be.a.function;
  })

  it('should return an array composed of objects', () => {
    expect(output).to.be.an('array');
    expect(output[0]).to.be.an('object');
  })

  it('should return an array composed of objects with the keys "name" and "cases"', () => {
    expect(output[0].name).to.exist;
    expect(output[0].cases).to.exist;
  })

  it('should return an array composed of objects with the value types of "string" and "array"', () => {
    expect(output[0].name).to.be.a('string');
    expect(output[0].cases).to.be.an('array');
  })

  it('should return a properly structured output for a given input', () => {
    expect(output).to.deep.equal(answerReducers);
  })

  it('should return a properly structured D3 hierarchical tree output for a given input', () => {
    expect(outputD3).to.deep.equal(answerD3Reducers);
  })

});
