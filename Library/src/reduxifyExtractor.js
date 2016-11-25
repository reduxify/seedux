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

//repl.it

// function abc () { switch(def) { case 'ACTION': break; case 'REACTION': break;  } }
// function def () { switch(abc) { case 'INACTION': break; } }

// var testReducers = (reducers) => {
//   let reduxifyObj = {};
//   let coerceToStr = '';
//     for (let k in reducers) {
//       reduxifyObj[k] = reducers[k] + coerceToStr;
//     }
//   let returnVal = JSON.stringify(reduxifyObj);
//  // console.log(returnVal)
//   var structuredReducers = {};
//    var reducersKeys = returnVal.match(/"\w*":"/gi).map(key => key.replace(/["':]/gi, ''));
//       var reducersArr = returnVal.split(',');
//    reducersKeys.forEach((key, i) => structuredReducers[key] = reducersArr[i]);
//   console.log(structuredReducers)
  
// }

// console.log(testReducers({abc, def}))


//    //var reducerCases = reducersArr.map(reducer => reducer.match(/case\s.*':/gi));
//   // var reducerCases2 = reducerCases.map(c => c.replace(/[case\\':]/gi, ''));
//  // const reducersKeys2 = reducersKeys.map(key => key.replace(/["':]/gi, '').slice(0, -8))


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
