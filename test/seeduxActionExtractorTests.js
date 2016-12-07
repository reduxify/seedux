const chai = require('chai');
const expect = require('chai').expect;
const { testActionCreators, testActionCreators2, testActionCreators3, testActionCreators4, answerActionCreators, answerActionCreators2, answerActionCreators3, answerActionCreators4 } = require('./fixtures/seeduxActionExtractorFixtures');
const { actionCreatorsExtractor, Node } = require('./../lib/seedux/src/seeduxExtractor');
const output = actionCreatorsExtractor(testActionCreators);
const output2 = actionCreatorsExtractor(testActionCreators2);
const output3 = actionCreatorsExtractor(testActionCreators3);
const output4 = actionCreatorsExtractor(testActionCreators4)

describe('actionCreatorsExtractor', () => {

  it('should be a function', () => {
    expect(actionCreatorsExtractor).to.be.a.function;
  })

  it('should return an object-typed instance of Node named "Action Creators"', () => {
    expect(output).to.be.an('object');
    expect(output.constructor).to.deep.equal(Node);
    expect(output.name).to.deep.equal('Action Creators');
  })


  it('should return a properly structured D3 hierarchical tree output for a given input where type is a string', () => {
    expect(output).to.deep.equal(answerActionCreators);
  })

  it('should return a properly structured D3 hierarchical tree output for a given input where type is a variable', () => {
    expect(output2).to.deep.equal(answerActionCreators2);
  })

  it('should return a properly structured D3 hierarchical tree output for a given input where type is a property of an object', () => {
    expect(output3).to.deep.equal(answerActionCreators3);
  })

  it('should return a properly structured D3 hierarchical tree output for a given input where type is a property of a different object', () => {
    expect(output4).to.deep.equal(answerActionCreators4);
  })

});

describe('"Action Creators" node', () => {

  it('should have an array-typed property named children composed of object-typed Node(s)', () => {
    expect(output.children).to.be.an('array');
    expect(output.children[0]).to.be.an('object');
    expect(output.children[0].constructor).to.deep.equal(Node);
  })

  it('should have child nodes that each possess an array-typed property named children composed of object-typed Node(s)', () => {
    expect(output.children[0].children).to.be.an('array');
    expect(output.children[0].children[0]).to.be.an('object');
    expect(output.children[0].children[0].constructor).to.deep.equal(Node);
  })

});