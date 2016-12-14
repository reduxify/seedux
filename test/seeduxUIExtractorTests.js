const chai = require('chai');
const expect = require('chai').expect;
const { webpackTestUI1, webpackTestUI2, webpackTestUI3, webpackTestUI4, webpackTestUI5, browserifyTestUI1,  WebpackTestTodoList1, WebpackTestTodoList2, BrowserifyTestTodoList1, answerUI1, answerUI2, answerUI3, answerUI4, answerUI5, answerUI6 } = require('./fixtures/seeduxUIExtractorFixtures');
const { uiExtractor } = require('./../lib/seedux/src/seeduxExtractor');
const { Node, resetUIHeadNode } = require('./../lib/seedux/src/seeduxAssembler');

describe('uiExtractor (React)', () => {

afterEach(() => {
  resetUIHeadNode();
});

  it('should be a function', () => {
    expect(uiExtractor).to.be.a('function');
  })

  it('should return an object-typed instance of Node named "Containers"', () => {
    const webpackTestOutput1 = uiExtractor(webpackTestUI1);
    expect(webpackTestOutput1).to.be.an('object');
    expect(webpackTestOutput1.constructor).to.deep.equal(Node);
    expect(webpackTestOutput1.name).to.deep.equal('Containers');
  })

  it('should return a properly structured D3 hierarchical tree output for a given webpack-bundled input with mapStateToProps and mapDispatchToProps passed as arguments', () => {
    const webpackTestOutput1 = uiExtractor(webpackTestUI1);
    expect(webpackTestOutput1).to.deep.equal(answerUI1);
  })

  it('should return a properly structured D3 hierarchical tree output for a given webpack-bundled input without mapStateToProps and mapDispatchToProps passed as arguments', () => {
    const webpackTestOutput2 = uiExtractor(webpackTestUI2);
    expect(webpackTestOutput2).to.deep.equal(answerUI2);
  })

  it('should return a properly structured D3 hierarchical tree output for a given webpack-bundled input with mapStateToProps passed as an argument', () => {
    const webpackTestOutput3 = uiExtractor(webpackTestUI3);
    expect(webpackTestOutput3).to.deep.equal(answerUI3);
  })

  it('should return a properly structured D3 hierarchical tree output for a given webpack-bundled input with mapDispatchToProps passed as an argument', () => {
    const webpackTestOutput4 = uiExtractor(webpackTestUI4);
    expect(webpackTestOutput4).to.deep.equal(answerUI4);
  })

  it('should return a properly structured D3 hierarchical tree output for another given webpack-bundled input with mapStateToProps and mapDispatchToProps passed as arguments', () => {
    const webpackTestOutput5 = uiExtractor(webpackTestUI5);
    expect(webpackTestOutput5).to.deep.equal(answerUI5)
  })

  it('should return a properly structured D3 hierarchical tree output for a given browserify-bundled input with mapStateToProps and mapDispatchToProps passed as arguments', () => {
    const browserifyTestOutput1 = uiExtractor(browserifyTestUI1);
    expect(browserifyTestOutput1).to.deep.equal(answerUI6);
  })
  

});

describe('"Containers" node', () => {

afterEach(() => {
  resetUIHeadNode();
})

  it('should have an array-typed property named children composed of object-typed Node(s)', () => {
    const webpackTestOutput1 = uiExtractor(webpackTestUI1);
    expect(webpackTestOutput1.children).to.be.an('array');
    expect(webpackTestOutput1.children[0]).to.be.an('object');
    expect(webpackTestOutput1.children[0].constructor).to.deep.equal(Node);
  })

  it('should have child nodes that each possess an array-typed property named children composed of object-typed Node(s)', () => {
    const webpackTestOutput1 = uiExtractor(webpackTestUI1);
    expect(webpackTestOutput1.children[0].children).to.be.an('array');
    expect(webpackTestOutput1.children[0].children[0]).to.be.an('object');
    expect(webpackTestOutput1.children[0].children[0].constructor).to.deep.equal(Node);
  })

});
