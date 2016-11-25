const reduxify = {};
const coerceStr = '';

reduxify.UIExtractor = (UI) => {
  
}

/**
 *  Parses reducer function definitions for switch statement cases. 
 *  Pushes object containing @name: String and @cases: String[] to @structuredReducers: Array.
 */

reduxify.ReducerExtractor = (reducers) => {  
  let reducersObj = {};
  let structuredReducersArr = [];
  const reducersArr = reducers.split('switch');
  const reducerNames = reducers.match(/"\w*":"/gi).map(key => key.replace(/["':]/gi, ''));
    reducerNames.forEach((reducer, i) => reducersObj[reducer] = []);
  const reducerCases = reducersArr.map(cases => cases.match(/case\s[\\'"\w]*:/gi, '')).join('').replace(/case|break|return/g, '').replace(/['";,\s]/g, '').split(':');

  let reducerKeys = Object.keys(reducersObj);
  let i = 1;
  let j = 0;
  let k = 0;
  while (j < reducerCases.length) {
    if (reducersArr[i].includes(reducerCases[j])) {
      if (reducerCases[j].length > 0) { 
        reducersObj[reducerKeys[k]].push(reducerCases[j]);
      }
      j++;
    }
    else {
      i++;
      k++;
    }
  }
  
  reducerKeys.forEach(key => {
    structuredReducersArr.push({
      name: key,
      cases: reducersObj[key]
    })
  });

  // console.log(structuredReducersArr)
  return structuredReducersArr;
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
