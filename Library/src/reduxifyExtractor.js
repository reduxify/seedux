function reduxifyUIExtractor(UI) {
  
}

/**
 *  Parses reducer function definitions for switch statement cases. 
 *  Pushes object containing @name: String and @cases: String[] to @structuredReducers: Array.
 */

function reduxifyReducerExtractor(reducers) {  
  let structuredReducers = [];  
  const reducersKeys = Object.keys(reducers);
  const reducersCases = reducersKeys.forEach(key => {
  let cases = JSON.stringify(reducers[key]).match(/case\s[a-z'"]*:$/gi);
    structuredReducers.push({ name: key, cases });
  });
  return structuredReducers;
}

/**
 * 
 *  Parses actionCreators function definitions for type properties on returned payloads. 
 *  Pushes object containing @name: String and @type: String[] to @structuredActionCreators: Array.
 * 
 */

function reduxifyActionExtractor(actions) {
  let structuredActions = [];
  const actionCreatorsKeys = Object.keys(this.actionCreators);
  const actionCreatorsTypes = actionCreatorsKeys.forEach(key => {
  let type = JSON.stringify(this.actionCreators[key]).match(/type:\s[a-z'"]*,$/gi);
    structuredActions.push({ name: key, type });
  });
  return structuredActions;
}

module.exports = { reduxifyUIExtractor, reduxifyReducerExtractor, reduxifyActionExtractor };
