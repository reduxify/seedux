const reduxify = {};
const coerceStr = '';

reduxify.UIExtractor = (UI) => {
  
}

/**
 *  Parses reducer function definitions for switch statement cases. 
 *  Pushes object containing @name: String and @cases: String[] to @structuredReducers: Array.
 */

reduxify.ReducerExtractor = (reducers) => {  
  console.log(reducers)
  let structuredReducerObj = {};
  const reducersArr = reducers.split(',');
  const reducerNames = reducers.match(/"\w*":"/gi).map(key => key.replace(/["':]/gi, ''));
    reducerNames.forEach((reducer, i) => structuredReducerObj[reducer] = reducersArr[i]);
 // const reducerCases 
  return structuredReducerObj;
}

/**
 * 
 *  Parses actionCreators function definitions for type properties on returned payloads. 
 *  Pushes object containing @name: String and @type: String[] to @structuredActionCreators: Array.
 * 
 */

reduxify.ActionExtractor = (actions) => {
  let structuredActions = [];
  const actionCreatorsKeys = Object.keys(this.actionCreators);
  const actionCreatorsTypes = actionCreatorsKeys.forEach(key => {
  let type = JSON.stringify(this.actionCreators[key]).match(/type:\s[a-z'"]*,$/gi);
    structuredActions.push({ name: key, type });
  });
  return structuredActions;
}

module.exports = { reduxify };
