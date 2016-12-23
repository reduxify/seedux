const { assembleUINodes, assembleReducerNodes, assembleActionCreatorNodes, resetUIHeadNode } = require('./seeduxAssembler');

/**
*
* @desc uiExtractor is invoked from inside of the connect function with an ui object as an argument.
* The function parses the lexical tokens of the container's name and prop names, additionally creating
* two nested map objects that serve as arguments for the assembleUINodes function.
*
* @param {Object} ui is an object possessing the container name (string) as a key with a stringified
* version of the definitions of mapStateToProps and mapDispatchToPropsDef concatenated and delimited
* by '|' as a value (string).
*
* @return {Function call} The assembleUINodes function called with four arguments: uiName (string),
* uiPropNames (string[]), uiMapState (object), and uiMapDispatch(object).
*
*/

function uiExtractor(ui) {
  const defaultMapStateToProps = 'function defaultMapStateToProps(state){return{};}';
  const defaultMapDispatchToProps = 'function defaultMapDispatchToProps(dispatch){return{dispatch:dispatch};}';
  let uiName = Object.keys(ui)[0];
  let uiPropNames = ui[uiName];
  let mapStateToPropsDef, mapStateToPropsSplitAtKeys, mapDispatchToPropsDef, mapDispatchToPropsSplit, uiStateKeys, uiStatePropNames, uiDispatchPropNames, uiActionCreators;
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
      mapDispatchToPropsSplit = mapDispatchToPropsDef.split('},');
      if (mapStateToPropsDef.includes('state.')) {
        uiStateKeys = uiStateKeys.split('state.').slice(1).map(subStr => subStr.slice(0, subStr.lastIndexOf('.'))).map(subStr => subStr.replace(/[^\w.]/gi, ''));
      }
      else if (mapStateToPropsDef.includes('store.')) {
        uiStateKeys = uiStateKeys.split('store.').slice(1).map(subStr => subStr.slice(0, subStr.lastIndexOf('.'))).map(subStr => subStr.replace(/[^\w.]/gi, ''));
      }
        uiStatePropNames = mapStateToPropsDef.split(':').map(subStr => subStr.slice(-1 * ((subStr.length - 1) - subStr.lastIndexOf(' ')))).filter(subStr => /[\w*]/gi.test(subStr));
        uiDispatchPropNames = mapDispatchToPropsDef.split(':').map(subStr => subStr.slice(-1 * ((subStr.length - 1) - subStr.lastIndexOf(' ')))).filter(subStr => /[\w*]/gi.test(subStr));
        uiActionCreators = uiActionCreators.split('dispatch(').slice(1).map(subStr => subStr.slice(subStr.indexOf('.') + 1, subStr.indexOf(')'))).map(subStr => subStr.replace(/\(\w+/gi, ''));

        uiStatePropNames.forEach(prop => {
          uiMapState[uiName][prop] = [];
          uiStateKeys.forEach(key => {
            uiMapState[uiName][prop].push(key);
          });
        });

        uiDispatchPropNames.forEach(prop => {
          uiMapDispatch[uiName][prop] = [];
          uiActionCreators.forEach(ac => {
            mapDispatchToPropsSplit.forEach(def => {
              if (def.includes(prop) && def.includes(ac)) {
                uiMapDispatch[uiName][prop].push(ac);
              }
            })
          });
        });
      }
    uiPropNames = uiPropNames.split(':').map(subStr => subStr.slice(-1 * ((subStr.length - 1) - subStr.lastIndexOf(' ')))).filter(subStr => /[\w*][^\s+]/gi.test(subStr));
  }
  return assembleUINodes(uiName, uiPropNames, uiMapState, uiMapDispatch);
};

/**
*
* @desc reducersExtractor is invoked from inside of the combineReducers function with a reducers object
* as an argument. The function parses the lexical tokens of the user's application's reducer function names
* and action types associated action type listeners, creating reducerNames and reducerCases, which, alongside
* reducers, serve as arguments for the assembleReducerNodes function.
*
* @param {Array} parsedReducers is an array whose values are objects with keys of name (string) and
* cases (string[]).
*
* @returns {Function call} The assembleReducerNodes function is called with three arguments: reducers (object[]),
* reducerNames (string[]), and reducerCases (string[]).
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
    reducerCases = strReducers.split('action.type').slice(1).map(subStr => subStr.replace(/[^\w\\.)]/g, '')).map(subStr => subStr.slice(0, subStr.indexOf(')')));
  }
  else if (strReducers.includes('action.type') && strReducers.includes('?')) {
    reducerCases = strReducers.split('action.type').slice(1).map(subStr => subStr.replace(/[^\w\?.]/g, '')).map(subStr => subStr.slice(0, subStr.indexOf('?')));
  }
  if (/\./.test(reducerCases)) {
    reducerCases = reducerCases.map(cases => cases = cases.slice(cases.indexOf('.') + 1));
  }
  return assembleReducerNodes(reducers, reducerNames, reducerCases);
};

/**
*
* @desc actionCreatorsExtractor is invoked from inside of the bindActionCreators function
* with an actionCreators object as an argument. The function parses the lexical tokens of
* the action creator function names and action types, creating actionCreatorNames and actionTypes,
* which serve as arguments for the assembleActionCreatorNodes function.
*
* @param {Array} actionCreators is an array whose values are objects with keys of name
* (string) and cases (string[]).
*
* @returns {Function call} The assembleActionCreatorNodes function is called with three arguments:
* actionCreatorNames (string[]) and actionTypes (string[])
*
*/

function actionCreatorsExtractor(actionCreators) {
  const actionCreatorNames = Object.keys(actionCreators);
  const strActionCreators = JSON.stringify(actionCreators);
  let actionTypes;

  actionTypes = strActionCreators.split('type:').slice(1).map(subStr => subStr.slice(1, subStr.indexOf('\\')).replace(/[^\w*.,]/g, ''));
  if (/\./.test(actionTypes)) {
    actionTypes = actionTypes.map(subStr => subStr.slice(subStr.indexOf('.') + 1));
  }
  if (/\,/.test(actionTypes)) {
    actionTypes = actionTypes.map(subStr => { 
      if (subStr.includes(',')) {
        return subStr.slice(0, subStr.indexOf(','));
      }
      else { return subStr; }
    })
  }
  return assembleActionCreatorNodes(actionCreatorNames, actionTypes);
};

module.exports = { uiExtractor, actionCreatorsExtractor, reducersExtractor };
