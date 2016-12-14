const chai = require('chai');
const expect = require('chai').expect;
const { testReducers, testReducers2, testReducers3, testReducers4, testReducers5, testReducers6, answerReducers, answerReducers2, answerReducers3, answerReducers4, answerReducers5, answerReducers6 } = require('./fixtures/seeduxReducerExtractorFixtures');
const { reducersExtractor } = require('./../lib/seedux/src/seeduxExtractor');
// const { Node } = require('./../lib/seedux/src/seeduxAssembler');
const assemblerUtils = require('./../lib/seedux/src/seeduxAssembler');
const output = reducersExtractor(testReducers);
const output2 = reducersExtractor(testReducers2);
const output3 = reducersExtractor(testReducers3);
const output4 = reducersExtractor(testReducers4);
const output5 = reducersExtractor(testReducers5);
const output6 = reducersExtractor(testReducers6);

describe('reducersExtractor', () => {

  it('should be a function', () => {
    expect(reducersExtractor).to.be.a('function');
  })

  it('should return an object-typed instance of Node named "Reducers"', () => {
    expect(output).to.be.an('object');
    expect(output.constructor).to.deep.equal(assemblerUtils.Node);
    expect(output.name).to.deep.equal('Reducers');
  })


  it('should return a properly structured D3 hierarchical tree output for a given input that uses switch statements', () => {
    expect(output).to.deep.equal(answerReducers);
  })

  it('should return a properly structured D3 hierarchical tree output for a given input that uses switch statements to screen for types that are properties on an object', () => {
    expect(output4).to.deep.equal(answerReducers4);
  })

  it('should return a properly structured D3 hierarchical tree output for a given input that uses ternary statements', () => {
    expect(output2).to.deep.equal(answerReducers2);
  })

  it('should return a properly structured D3 hierarchical tree output for a given input that uses ternary statements to screen for types that are properties on an object', () => {
    expect(output5).to.deep.equal(answerReducers5);
  })

  it('should return a properly structured D3 hierarchical tree output for a given input that uses conditional statements', () => {
    expect(output3).to.deep.equal(answerReducers3);
  })

  it('should return a properly structured D3 hierarchical tree output for a given input that uses conditional statements to screen for types that are properties on an object', () => {
    expect(output6).to.deep.equal(answerReducers6);
  })

});

describe('"Reducers" node', () => {

  it('should have an array-typed property named children composed of object-typed Node(s)', () => {
    expect(output.children).to.be.an('array');
    expect(output.children[0]).to.be.an('object');
    expect(output.children[0].constructor).to.deep.equal(assemblerUtils.Node);
  })

  it('should have child nodes that each possess an array-typed property named children composed of object-typed Node(s)', () => {
    expect(output.children[0].children).to.be.an('array');
    expect(output.children[0].children[0]).to.be.an('object');
    expect(output.children[0].children[0].constructor).to.deep.equal(assemblerUtils.Node);
  })

});
