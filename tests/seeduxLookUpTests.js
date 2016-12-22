const chai = require('chai');
const expect = require('chai').expect;
const { testActionCreators, testReducers, testUI, testUIResources, testActionMap, testActionTypes1, testActionTypes2, answerActionCreators, answerReducers, answerUI, answerTable, testCodeObj } = require('./fixtures/seeduxLookUpFixtures');
const { populateTable, addReducersToTable, addActionCreatorsToTable, addUIToTable, resetTable } = require('./../lib/seedux/src/seeduxLookUp');

describe('populateTable', () => {

afterEach(() => {
  resetTable();
});

  it('should be a function', () => {
    expect(populateTable).to.be.a('function');
  })

  it('should return a d3Table object', () => {
    const populateTableOutput = populateTable(testCodeObj);
    expect(populateTableOutput).to.be.an('object');
  })

  it('should return a properly structured d3Table', () => {
    const populateTableOutput = populateTable(testCodeObj);
    expect(populateTableOutput).to.deep.equal(answerTable);
  })

});

describe('addReducersToTable', () => {

afterEach(() => {
  resetTable();
});

  it('should be a function', () => {
    expect(addReducersToTable).to.be.a('function');
  })

  it('should return a d3Table object', () => {
    const reducersOutput = addReducersToTable(testReducers, testActionTypes1);
    expect(reducersOutput).to.be.an('object');
  })

  it('should return a properly structured d3Table', () => {
    const reducersOutput = addReducersToTable(testReducers, testActionTypes1);
    expect(reducersOutput).to.deep.equal(answerReducers);
  })

});

describe('addActionCreatorsToTable', () => {

afterEach(() => {
  resetTable();
});

  it('should be a function', () => {
    expect(addActionCreatorsToTable).to.be.a('function');
  })

  it('should return a d3Table object', () => {
    const actionCreatorsOutput = addActionCreatorsToTable(testActionCreators, testActionTypes2);
    expect(actionCreatorsOutput).to.be.an('object');
  })

  it('should return a properly structured d3Table', () => {
    const actionCreatorsOutput = addActionCreatorsToTable(testActionCreators, testActionTypes2);
    expect(actionCreatorsOutput).to.deep.equal(answerActionCreators);
  })

});

describe('addUIToTable', () => {

afterEach(() => {
  resetTable();
});

  it('should be a function', () => {
    expect(addUIToTable).to.be.a('function');
  })

  it('should return a d3Table object', () => {
    const uiOutput = addUIToTable(testUI, testUIResources, testActionMap);
    expect(uiOutput).to.be.an('object');
  })

  it('should return a properly structured d3Table', () => {
    const uiOutput = addUIToTable(testUI, testUIResources, testActionMap);
    expect(uiOutput).to.deep.equal(answerUI);
  })

});
