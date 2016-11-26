const chai = require('chai');
const expect = require('chai').expect;
const { testUI, answerUI } = require('./fixtures/reduxifyActionCreatorExtractorFixtures');
const { reduxifyUIExtractor } = require('./../Library/src/reduxifyExtractor');

describe('reduxify.UIExtractor', () => {

const output = reduxify.UIExtractor(testUI);

  it('should be a function', () => {
    expect(reduxify.UIExtractor).to.be.a.function;
  })

  it('should return an array composed of objects', () => {
    expect(output).to.be.an('array');
    expect(output[0]).to.be.an('object');
  })

  it('should return an array composed of objects with the keys "container" and "propNames"', () => {
    expect(output[0].container).to.exist;
    expect(output[0].propNames).to.exist;
  })

  it('should return an array composed of objects with value types of "string" and "array"', () => {
    expect(output[0].container).to.be.a('string');
    expect(output[0].propNames).to.be.an('array');
  })

  it('should return a properly structured output for a given input', () => {
    expect(output).to.deep.equal(answerUI);
  })

});
