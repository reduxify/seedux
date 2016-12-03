const chai = require('chai');
const expect = require('chai').expect;
const { testUI, testUI2, TestTodoList, TestTodoList2, answerUI } = require('./fixtures/seeduxUIExtractorFixtures');
const { seedux, Node } = require('./../lib/seedux/src/seeduxExtractor');
const output = seedux.uiExtractor(testUI);
const output2 = seedux.uiExtractor(testUI2);

describe('seedux.uiExtractor', () => {

  it('should be a function', () => {
    expect(seedux.uiExtractor).to.be.a.function;
  })

  it('should return an object-typed instance of Node named "Containers"', () => {
    expect(output).to.be.an('object');
    expect(output.constructor).to.deep.equal(Node);
    expect(output.name).to.deep.equal('Containers');
  })


  it('should return a properly structured D3 hierarchical tree output for a given input which has a propNames property', () => {
    expect(TestTodoList.propTypes).to.exist;
    expect(output).to.deep.equal(answerUI);
  })

  it('should return a properly structured D3 hierarchical tree output for a given input without the propNames property', () => {
    expect(TestTodoList2.propTypes).to.not.exist;
    expect(output2).to.deep.equal(answerUI);
  })

});

describe('"Containers" node', () => {

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
