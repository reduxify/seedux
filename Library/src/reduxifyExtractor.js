const reduxify = {};

reduxify.UIExtractor = (UI) => {
  console.log(UI)
}

/**
 *  Parses reducer function definitions for switch statement cases. 
 *  Pushes object containing @name: String and @cases: String[] to @structuredReducersArr: Array.
 */

reduxify.ReducerExtractor = (reducers) => {  
  let reducersObj = {};
  let structuredReducersArr = [];
  const reducersArr = reducers.split('switch');
  const reducerNames = reducers.match(/"\w*":"/gi).map(key => key.replace(/["':]/gi, ''));
    reducerNames.forEach(reducer => reducersObj[reducer] = []);
  const reducerCases = reducersArr.map(cases => cases.match(/case\s[\\'"\w]*:/gi, '')).join('').replace(/case|break|return/g, '').replace(/['";,\s]/g, '').split(':');

// Handles data anomalies and populates the reducersObj in the format of name: cases key-value pairs.

  let i = 1;
  let j = 0;
  let k = 0;
  while (j < reducerCases.length) {
    if (reducersArr[i].includes(reducerCases[j])) {
      if (reducerCases[j].length > 0) { 
        reducersObj[reducerNames[k]].push(reducerCases[j]);
      }
      j++;
    }
    else {
      i++;
      k++;
    }
  }
  
// Populates the structuredReducersArr with objects containing name and cases properties.

  reducerNames.forEach(key => {
    structuredReducersArr.push({
      name: key,
      cases: reducersObj[key]
    })
  });

  return structuredReducersArr;
}

/**
 * 
 *  Parses actionCreators function definitions for type properties on returned payloads. 
 *  Pushes object containing @name: String and @type: String to @structuredActionCreatorsArr: Array.
 * 
 */

reduxify.ActionExtractor = (actionCreators) => {
  let actionCreatorsObj = {};
  let structuredActionCreatorsArr = [];
  const actionCreatorsArr = actionCreators.split('type:');
  const actionCreatorsNames = actionCreators.match(/['"]\w*['"]:['"]/gi).map(n => n = n.slice(1, -3));
  const actionTypes = actionCreatorsArr.map(t => t.match(/['"]\w*['",]/gi), '').slice(1);

// Handles data anomalies and populates the actionCreatorsObj in the format of name: type key-value pairs.

  for (let i = 0; i < actionTypes.length; i++) {
    actionTypes[i] = actionTypes[i][0].replace(/['"\\]/g, '');
    actionCreatorsObj[actionCreatorsNames[i]] = actionTypes[i];
  }
  
// Populates the structuredActionCreatorsArr with objects containing name and type properties.

  actionCreatorsNames.forEach(key => {
    structuredActionCreatorsArr.push({
      name: key,
      type: actionCreatorsObj[key]
    })
  });

  return structuredActionCreatorsArr;
}

module.exports = { reduxify };
