const chai = require('chai');
const expect = require('chai').expect;
const { testActionCreators, answerActions, answerD3Actions } = require('./fixtures/reduxifyActionExtractorFixtures');
const { reduxify } = require('./../Library/src/reduxifyExtractor');
const { D3ActionCreatorStructurer } = require('./../Library/src/reduxifyD3Structurer');

describe('reduxify.ActionExtractor', () => {

const output = reduxify.ActionExtractor(testActionCreators);
const outputD3 = D3ActionCreatorStructurer(output);

  it('should be a function', () => {
    expect(reduxify.ActionExtractor).to.be.a.function;
  })

  it('should return an array composed of objects', () => {
    expect(output).to.be.an('array');
    expect(output[0]).to.be.an('object');
  })

  it('should return an array composed of objects with the keys "name" and "type"', () => {
    expect(output[0].name).to.exist;
    expect(output[0].type).to.exist;
  })

  it('should return an array composed of objects with value types of "string"', () => {
    expect(output[0].name).to.be.a('string');
    expect(output[0].type).to.be.a('string');
  })

  it('should return a properly structured output for a given input', () => {
    expect(output).to.deep.equal(answerActions);
  })

  it('should return a properly structured D3 hierarchical tree output for a given input', () => {
    expect(outputD3).to.deep.equal(answerD3Actions);
  })

});