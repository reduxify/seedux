const chai = require('chai');
const expect = require('chai').expect;
const { testUI, answerUI, answerD3UI } = require('./fixtures/reduxifyUIExtractorFixtures');
const { reduxify } = require('./../Library/src/reduxifyExtractor');
const { D3UIStructurer } = require('./../Library/src/reduxifyD3Structurer');

describe('reduxify.UIExtractor', () => {

const output = reduxify.UIExtractor(testUI);
const outputD3 = D3UIStructurer(output);

  it('should be a function', () => {
    expect(reduxify.UIExtractor).to.be.a.function;
  })

  it('should return an array composed of objects', () => {
    expect(output).to.be.an('array');
    expect(output[0]).to.be.an('object');
  })

  it('should return an array composed of objects with the keys "name" and "propNames"', () => {
    expect(output[0].name).to.exist;
    expect(output[0].propNames).to.exist;
  })

  it('should return an array composed of objects with value types of "string" and "array"', () => {
    expect(output[0].name).to.be.a('string');
    expect(output[0].propNames).to.be.an('array');
  })

  it('should return a properly structured output for a given input', () => {
    expect(output).to.deep.equal(answerUI);
  })

  it('should return a properly structured D3 hierarchical tree output for a given input', () => {
    expect(outputD3).to.deep.equal(answerD3UI);
  })

});
