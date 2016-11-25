const chai = require('chai');
const expect = require('chai').expect;
const { testUI, answerUI } = require('./fixtures/reduxifyActionCreatorExtractorFixtures');
const { reduxifyUIExtractor } = require('./../:ibrary/src/reduxifyExtractor');

describe('reduxifyUIExtractor', () => {

  it('should be a function', () => {
    expect(reduxifyUIExtractor).to.be.a.function;
  })

  it('should return an array composed of objects', () => {
    expect(reduxifyUIExtractor(testUI).to.be.a('array'));
    expect(reduxifyUIExtractor(testUI)[0].to.be.an('object'));
  })

  it('should return an array composed of objects with the keys "name" and "propNames"', () => {
    expect(reduxifyUIExtractor(testUI)[0].hasOwnProperty('name').to.be.true);
    expect(reduxifyUIExtractor(testUI)[0].hasOwnProperty('propNames').to.be.true);
  })

  it('should return an array composed of objects with the key types of "string" and "array"', () => {
    expect(reduxifyUIExtractor(testUI)[0].name.to.be.a('string'));
    expect(reduxifyUIExtractor(testUI)[0].type.to.be.a('array'));
  })

  it('should return a properly structured output for a given input', () => {
    expect(reduxifyUIExtractor(testUI).to.deep.equal(answerUI));
  })

});
