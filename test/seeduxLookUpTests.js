const chai = require('chai');
const expect = require('chai').expect;
const { testActionCreators, testReducers, testUI, testUIResources, testActionTypes1, testActionTypes2, answerActionCreators, answerReducers, answerUI } = require('./fixtures/seeduxLookUpFixtures');
// const { addReducersToLookUpTable, addActionCreatorsToLookUpTable, addUIToLookUpTable, resetLookUpTable } = require('./../lib/seedux/src/seeduxLookUp');
const lookUpUtils = require('./../lib/seedux/src/seeduxLookUp');

describe('addReducersToLookUpTable', () => {

afterEach(() => {
  resetLookUpTable();
});

  it('should be a function', () => {
    expect(lookUpUtils.addReducersToLookUpTable).to.be.a('function');
  })

  it('should return a d3LookUpTable object', () => {
    const reducersOutput = lookUpUtils.addReducersToLookUpTable(testReducers, testActionTypes1);
    expect(reducersOutput).to.be.an('object');
  })

  it('should return a properly structured d3LookUpTable', () => {
    const reducersOutput = lookUpUtils.addReducersToLookUpTable(testReducers, testActionTypes1);
    expect(reducersOutput).to.deep.equal(answerReducers);
  })

});

describe('addActionCreatorsToLookUpTable', () => {

afterEach(() => {
  resetLookUpTable();
});

  it('should be a function', () => {
    expect(lookUpUtils.addActionCreatorsToLookUpTable).to.be.a('function');
  })

  it('should return a d3LookUpTable object', () => {
    const actionCreatorsOutput = lookUpUtils.addActionCreatorsToLookUpTable(testActionCreators, testActionTypes2);
    expect(actionCreatorsOutput).to.be.an('object');
  })

  it('should return a properly structured d3LookUpTable', () => {
    const actionCreatorsOutput = lookUpUtils.addActionCreatorsToLookUpTable(testActionCreators, testActionTypes2);
    expect(actionCreatorsOutput).to.deep.equal(answerActionCreators);
  })

});

describe('addUIToLookUpTable', () => {

afterEach(() => {
  resetLookUpTable();
});

  it('should be a function', () => {
    expect(lookUpUtils.addUIToLookUpTable).to.be.a('function');
  })

  it('should return a d3LookUpTable object', () => {
    const uiOutput = lookUpUtils.addUIToLookUpTable(testUI, testUIResources);
    expect(uiOutput).to.be.an('object');
  })

  it('should return a properly structured d3LookUpTable', () => {
    const uiOutput = lookUpUtils.addUIToLookUpTable(testUI, testUIResources);
    expect(uiOutput).to.deep.equal(answerUI);
  })

});
