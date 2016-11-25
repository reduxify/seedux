const chai = require('chai');
const expect = require('chai').expect;
const { testActionCreators, answerActions } = require('./fixtures/reduxifyActionExtractorFixtures');
const { reduxify } = require('./../Library/src/reduxifyExtractor');

describe('reduxify.ActionExtractor', () => {

  it('should be a function', () => {
    expect(reduxify.ActionExtractor).to.be.a.function;
  })

  it('should return an array composed of objects', () => {
    expect(reduxify.ActionExtractor(testActionCreators).to.be.an('array'));
    expect(reduxify.ActionExtractor(testActionCreators)[0].to.be.an('object'));
  })

  it('should return an array composed of objects with the keys "name" and "type"', () => {
    expect(reduxify.ActionExtractor(testActionCreators)[0].hasOwnProperty('name').to.be.true);
    expect(reduxify.ActionExtractor(testActionCreators)[0].hasOwnProperty('type').to.be.true);
  })

  it('should return an array composed of objects with keys possessing the types "string" and "string"', () => {
    expect(reduxify.ActionExtractor(testActionCreators)[0].name.to.be.a('string'));
    expect(reduxify.ActionExtractor(testActionCreators)[0].type.to.be.a('string'));
  })

  it('should return a properly structured output for a given input', () => {
    expect(reduxify.ActionExtractor(testActionCreators).to.deep.equal(answerActions));
  })

});