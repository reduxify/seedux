const chai = require('chai');
const expect = require('chai').expect;
const { testActionCreators, testActionCreators2, testActionCreators3, testActionCreators4, testActionCreators5, testActionCreators6, answerActionCreators, answerActionCreators2, answerActionCreators3, answerActionCreators4, answerActionCreators5 } = require('./fixtures/seeduxActionCreatorsExtractorFixtures');
const { actionCreatorsExtractor } = require('./../lib/seedux/src/seeduxExtractor');
const { Node, resetACHeadNode } = require('./../lib/seedux/src/seeduxAssembler');

describe('actionCreatorsExtractor', () => {

afterEach(() => {
  resetACHeadNode();
});

  it('should be a function', () => {
    expect(actionCreatorsExtractor).to.be.a('function');
  })

  it('should return an object-typed instance of Node named "Action Creators"', () => {
    const output = actionCreatorsExtractor(testActionCreators);
    expect(output).to.be.an('object');
    expect(output.constructor).to.deep.equal(Node);
    expect(output.name).to.deep.equal('Action Creators');
  })


  it('should return a properly structured D3 hierarchical tree output for a given object input where type is a string', () => {
    const output = actionCreatorsExtractor(testActionCreators);
    expect(output).to.deep.equal(answerActionCreators);
  })

  it('should return a properly structured D3 hierarchical tree output for a given object input where type is a variable', () => {
    const output2 = actionCreatorsExtractor(testActionCreators2);
    expect(output2).to.deep.equal(answerActionCreators2);
  })

  it('should return a properly structured D3 hierarchical tree output for a given object input where type is a property of an object', () => {
    const output3 = actionCreatorsExtractor(testActionCreators3);
    expect(output3).to.deep.equal(answerActionCreators3);
  })

  it('should return a properly structured D3 hierarchical tree output for a given object input where type is a property of a different object', () => {
    const output4 = actionCreatorsExtractor(testActionCreators4);
    expect(output4).to.deep.equal(answerActionCreators4);
  })

  it('should return a properly structured D3 hierarchical tree output for a given object input where is one of many keys returned in a payload object', () => {
    const output5 = actionCreatorsExtractor(testActionCreators5);
    expect(output5).to.deep.equal(answerActionCreators5);
  })

  it('should return a properly structured D3 hierarchical tree output for a given function input', () => {
    const output6 = actionCreatorsExtractor(testActionCreators6);
    expect(output6).to.deep.equal(answerActionCreators5);
  })

});

describe('"Action Creators" node', () => {

afterEach(() => {
  resetACHeadNode();
});

  it('should have an array-typed property named children composed of object-typed Node(s)', () => {
    const output = actionCreatorsExtractor(testActionCreators);
    expect(output.children).to.be.an('array');
    expect(output.children[0]).to.be.an('object');
    expect(output.children[0].constructor).to.deep.equal(Node);
  })

  it('should have child nodes that each possess an array-typed property named children composed of object-typed Node(s)', () => {
    const output = actionCreatorsExtractor(testActionCreators);
    expect(output.children[0].children).to.be.an('array');
    expect(output.children[0].children[0]).to.be.an('object');
    expect(output.children[0].children[0].constructor).to.deep.equal(Node);
  })

});