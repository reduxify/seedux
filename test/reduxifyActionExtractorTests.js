const chai = require('chai');
const expect = require('expect');
const { testActionCreators, answerActions } = require('./fixtures/reduxifyActionExtractorFixtures');
const { reduxifyActionExtractor } = require('./../Library/src/reduxifyExtractor');

describe('reduxifyActionExtractor', () => {

  it('should be a function', () => {
    expect(reduxifyActionExtractor).to.be.a.function;
  })

  it('should return an array composed of objects', () => {
    expect(reduxifyActionExtractor(testActionCreators).to.be.a('array'));
    expect(reduxifyActionExtractor(testActionCreators)[0].to.be.an('object'));
  })

  it('should return an array composed of objects with the keys "name" and "type"', () => {
    expect(reduxifyActionExtractor(testActionCreators)[0].hasOwnProperty('name').to.be.true);
    expect(reduxifyActionExtractor(testActionCreators)[0].hasOwnProperty('type').to.be.true);
  })

  it('should return an array composed of objects with keys possessing the types "string" and "string"', () => {
    expect(reduxifyActionExtractor(testActionCreators)[0].name.to.be.a('string'));
    expect(reduxifyActionExtractor(testActionCreators)[0].type.to.be.a('string'));
  })

  it('should return a properly structured output for a given input', () => {
    expect(reduxifyActionExtractor(testActionCreators).to.deep.equal(answerActions));
  })

});