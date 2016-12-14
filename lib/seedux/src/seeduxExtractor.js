const { assembleUINodes, assembleReducerNodes, assembleActionCreatorNodes, resetUIHeadNode } = require('./seeduxAssembler');

/**
*
* Turns an array that consists of the name and the propNames of the container passed
* into uiExtractor, which occurs on invocation of the Connect function from our
* library's version of React-Redux, into a hierarchical tree object ready for rendering
* as a D3 visualization.
*
* @param {Array} ui is an array whose values are name (value: string) and
* propNames (value: string[]).
*
* @returns {Object} headNode is a hierarchical tree object whose nodes are objects
* with keys of name (value: string) and children (value: string[], optional).
*
*/

function uiExtractor(ui) {
  const defaultMapStateToProps = 'function defaultMapStateToProps(state){return{};}';
  const defaultMapDispatchToProps = 'function defaultMapDispatchToProps(dispatch){return{dispatch:dispatch};}';
  let uiName = Object.keys(ui)[0];
  let uiPropNames = ui[uiName];
  let mapStateToPropsDef, mapStateToPropsSplitAtKeys, mapDispatchToPropsDef, mapDispatchToPropsSplitAtKeys, uiStateKeys, uiStatePropNames, uiDispatchPropNames, uiActionCreators;
  let uiMapState = {};
  let uiMapDispatch = {};
  uiMapState[uiName] = {};
  uiMapDispatch[uiName] = {};

  if (uiPropNames.includes(defaultMapStateToProps) && uiPropNames.includes(defaultMapDispatchToProps)) {
    uiPropNames = false;
  }

  else if (uiPropNames.includes(defaultMapStateToProps)) {
    uiPropNames = uiPropNames.slice(defaultMapStateToProps.length);
    mapDispatchToPropsDef = uiPropNames;
  }

  else if (uiPropNames.includes(defaultMapDispatchToProps)) {
    uiPropNames = uiPropNames.slice(0, uiPropNames.length - defaultMapDispatchToProps.length);
    mapStateToPropsDef = uiPropNames;
  }

  if (uiPropNames) {
    if (!mapStateToPropsDef && !mapDispatchToPropsDef) {
      const splitPropNames = uiPropNames.split('|');
      mapStateToPropsDef = uiStateKeys = splitPropNames[0];
      mapDispatchToPropsDef = uiActionCreators = splitPropNames[1];
      //mapStateToPropsSplitAtKeys = mapStateToPropsDef.split(','); // || mapStateToPropsDef;
      //mapDispatchToPropsSplitAtKeys = mapDispatchToPropsDef.split(','); // || mapDispatchToPropsDef;
      if (mapStateToPropsDef.includes('state.')) {
        uiStateKeys = uiStateKeys.split('state.').slice(1).map(subStr => subStr = subStr.slice(0, subStr.lastIndexOf('.'))).map(subStr => subStr.replace(/[^\w.]/gi, ''));
      }
      else if (mapStateToPropsDef.includes('store.')) {
        uiStateKeys = uiStateKeys.split('store.').slice(1).map(subStr => subStr = subStr.slice(0, subStr.lastIndexOf('.'))).map(subStr => subStr.replace(/[^\w.]/gi, ''));
      }
        uiStatePropNames = mapStateToPropsDef.split(':').map(subStr => subStr = subStr.slice(-1 * ((subStr.length - 1) - subStr.lastIndexOf(' ')))).filter(subStr => /[\w*]/gi.test(subStr));
        uiDispatchPropNames = mapDispatchToPropsDef.split(':').map(subStr => subStr = subStr.slice(-1 * ((subStr.length - 1) - subStr.lastIndexOf(' ')))).filter(subStr => /[\w*]/gi.test(subStr));
        uiActionCreators = uiActionCreators.split('dispatch(').slice(1).map(subStr => subStr = subStr.slice(subStr.indexOf('.') + 1, subStr.indexOf(')')));

        uiStatePropNames.forEach(prop => {
          uiMapState[uiName][prop] = [];
          uiStateKeys.forEach(key => {
            mapStateToPropsSplitAtKeys.forEach(def => {
              if (def.includes(key) && def.includes(prop)) {
                uiMapState[uiName][prop].push(key);
              }
            })
          })
        })

        uiDispatchPropNames.forEach(prop => {
          uiMapDispatch[uiName][prop] = [];
          uiActionCreators.forEach(ac => {
            uiMapDispatch[uiName][prop].push(ac);
          })
        })
      }
    uiPropNames = uiPropNames.split(':').map(subStr => subStr = subStr.slice(-1 * ((subStr.length - 1) - subStr.lastIndexOf(' ')))).filter(subStr => /[\w*]/gi.test(subStr));
  }

  return assembleUINodes(uiName, uiPropNames, uiMapState, uiMapDispatch);
};

/**
*
* Turns an array that consists of objects containing the name and corresponding
* switch cases of each reducer passed to our version of the react-redux's combineReducers
* function into a hierarchical tree object ready for rendering as a D3 visualization.
*
* @param {Array} parsedReducers is an array whose values are objects with keys of
* name (value: string) and cases (value: string[]).
*
* @returns {Object} headNode is a hierarchical tree object whose nodes are objects
* with keys of name (value: string) and children (value: string[], optional).
*
*/

function reducersExtractor(reducers) {
  const reducerNames = Object.keys(reducers);
  const strReducers = JSON.stringify(reducers);
  let reducerCases;

  if (strReducers.includes('switch')) {
    reducerCases = strReducers.split('case').slice(1).map(cases => cases.replace(/[^\w*:.]/g, '')).map(cases => cases = cases.slice(0, cases.indexOf(':')));
  }
  else if (strReducers.includes('action.type') && strReducers.includes('if')) {
    reducerCases = strReducers.split('action.type').slice(1).map(subStr => subStr.replace(/[^\w\\.)]/g, '')).map(subStr => subStr = subStr.slice(0, subStr.indexOf(')')));
  }
  else if (strReducers.includes('action.type') && strReducers.includes('?')) {
    reducerCases = strReducers.split('action.type').slice(1).map(subStr => subStr.replace(/[^\w\?.]/g, '')).map(subStr => subStr = subStr.slice(0, subStr.indexOf('?')));
  }
  if (/\./.test(reducerCases)) {
    reducerCases = reducerCases.map(cases => cases = cases.slice(cases.indexOf('.') + 1));
  }
  return assembleReducerNodes(reducers, reducerNames, reducerCases);
};

/**
*
* Turns an object consisting of keys that are action creator names and values that are
* stringified action creator function definitions passed into reduxify.actionCreatorsExtractor,
* which occurs on invocation of the bindActionCreators function from our library's version
* of Redux, into a hierarchical tree object ready for rendering as a D3 visualization.
*
* @param {Object} actionCreators is an object whose keys are action creator function names (value: string)
* and whose values are stringified action creator function definitions (value: string).
*
* @returns {Object} headNode is a hierarchical tree object whose nodes are objects
* with keys of name (value: string) and children (value: string[], optional).
*
*/

function actionCreatorsExtractor(actionCreators) {
  const actionCreatorNames = Object.keys(actionCreators);
  const strActionCreators = JSON.stringify(actionCreators);
  let actionTypes;

  actionTypes = strActionCreators.split('type:').slice(1).map(subStr => subStr = subStr.slice(1, subStr.indexOf('\\')).replace(/[^\w*.]/g, ''));
  if (/\./.test(actionTypes)) {
    actionTypes = actionTypes.map(subStr => subStr = subStr.slice(subStr.indexOf('.') + 1));
  }
  return assembleActionCreatorNodes(actionCreatorNames, actionTypes);
};

module.exports = { uiExtractor, actionCreatorsExtractor, reducersExtractor, resetUIHeadNode };
