const chai = require('chai');
const expect = require('chai').expect;
// const { testUI, testUI2, TestTodoList, TestTodoList2, answerUI } = require('./fixtures/seeduxUIExtractorFixtures');
const { uiExtractor, Node } = require('./../lib/seedux/src/seeduxExtractor');
// const output = uiExtractor(testUI);
// const output2 = uiExtractor(testUI2);

xdescribe('uiExtractor (Angular)', () => {

  it('should be a function', () => {
    expect(uiExtractor).to.be.a.function;
  })

  it('should return an object-typed instance of Node named "Controllers"', () => {
    expect(output).to.be.an('object');
    expect(output.constructor).to.deep.equal(Node);
    expect(output.name).to.deep.equal('Controllers');
  })


  it('should return a properly structured D3 hierarchical tree output for a given input which has a mapStateToThis method', () => {
    expect(TestTodoList.propTypes).to.exist;
    expect(output).to.deep.equal(answerUI);
  })

});

xdescribe('"Controllers" node', () => {

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
