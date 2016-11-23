const chai = require('chai');
const expect = require('expect');
const { testReducers, answerReducers } = require('./fixtures/reduxifyReducerExtractorFixtures');
const { reduxifyReducerExtractor } = require('./../Library/src/reduxifyExtractor');

describe('reduxifyReducerExtractor', () => {

  it('should be a function', () => {
    expect(reduxifyReducerExtractor).to.be.a.function;
  })

  it('should return an array composed of objects', () => {
    expect(reduxifyReducerExtractor(testReducers).to.be.a('array'));
    expect(reduxifyReducerExtractor(testReducers)[0].to.be.an('object'));
  })

  it('should return an array composed of objects with the keys "name" and "type"', () => {
    expect(reduxifyReducerExtractor(testReducers)[0].hasOwnProperty('name').to.be.true);
    expect(reduxifyReducerExtractor(testReducers)[0].hasOwnProperty('cases').to.be.true);
  })

  it('should return an array composed of objects with the key types of "string" and "array"', () => {
    expect(reduxifyReducerExtractor(testReducers)[0].name.to.be.a('string'));
    expect(reduxifyReducerExtractor(testReducers)[0].type.to.be.a('array'));
  })

  it('should return a properly structured output for a given input', () => {
    expect(reduxifyReducerExtractor(testReducers).to.deep.equal(answerReducers));
  })

});
