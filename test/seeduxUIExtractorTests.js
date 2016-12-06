const chai = require('chai');
const expect = require('chai').expect;
const { webpackTestUI1, webpackTestUI2, browserifyTestUI1, browserifyTestUI2, WebpackTestTodoList1, WebpackTestTodoList2, BrowserifyTestTodoList1, BrowserifyTestTodoList2, answerUI } = require('./fixtures/seeduxUIExtractorFixtures');
const { uiExtractor, Node } = require('./../lib/seedux/src/seeduxExtractor');
const webpackTestOutput1 = uiExtractor(webpackTestUI1);
const webpackTestOutput2 = uiExtractor(webpackTestUI2);
const browserifyTestOutput1 = uiExtractor(browserifyTestUI1);
const browserifyTestOutput2 = uiExtractor(browserifyTestUI2);

describe('reactUIExtractor', () => {

  it('should be a function', () => {
    expect(uiExtractor).to.be.a.function;
  })

  it('should return an object-typed instance of Node named "Containers"', () => {
    expect(webpackTestOutput1).to.be.an('object');
    expect(webpackTestOutput1.constructor).to.deep.equal(Node);
    expect(webpackTestOutput1.name).to.deep.equal('Containers');
  })

  it('should return a properly structured D3 hierarchical tree output for a given webpack-bundled input which has a propNames property', () => {
    expect(WebpackTestTodoList1.propTypes).to.exist;
    expect(webpackTestOutput1).to.deep.equal(answerUI);
  })

  it('should return a properly structured D3 hierarchical tree output for a given webpack-bundled input without the propNames property', () => {
    expect(WebpackTestTodoList2.propTypes).to.not.exist;
    expect(webpackTestOutput2).to.deep.equal(answerUI);
  })

  it('should return a properly structured D3 hierarchical tree output for a given browserify-bundled input without the propNames property', () => {
    expect(BrowserifyTestTodoList1.propTypes).to.exist;
    expect(browserifyTestOutput1).to.deep.equal(answerUI);
  })

  it('should return a properly structured D3 hierarchical tree output for a given browserify-bundled input without the propNames property', () => {
    expect(BrowserifyTestTodoList2.propTypes).to.not.exist;
    expect(browserifyTestOutput2).to.deep.equal(answerUI);
  })

});

describe('"Containers" node', () => {

  it('should have an array-typed property named children composed of object-typed Node(s)', () => {
    expect(webpackTestOutput1.children).to.be.an('array');
    expect(webpackTestOutput1.children[0]).to.be.an('object');
    expect(webpackTestOutput1.children[0].constructor).to.deep.equal(Node);
  })

  it('should have child nodes that each possess an array-typed property named children composed of object-typed Node(s)', () => {
    expect(webpackTestOutput1.children[0].children).to.be.an('array');
    expect(webpackTestOutput1.children[0].children[0]).to.be.an('object');
    expect(webpackTestOutput1.children[0].children[0].constructor).to.deep.equal(Node);
  })

});
