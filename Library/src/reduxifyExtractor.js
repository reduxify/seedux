const reduxify = {};
const some_element = document;
/**
 *  Parses component for name and propNames.
 *  INPUT: Array = Array[0] = WrappedComponent.name, Array[1] = Object.keys(WrappedComponent.propTypes);
 *  OUTPUT: Pushes object containing @name: String and @propNames: String[] to @structuredUIArr: Array.
 */

// TODO: Figure out how to pass structuredUIArr to visualization once all containers and their propNames have been added.

reduxify.UIExtractor = (UI) => {
  let UIObj = {};
  let structuredUIArr = [];
  const UIName = UI[0];
  const UIPropNames = UI[1];
  UIObj[UIName] = UIPropNames;
  structuredUIArr.push({ name: UIName, propNames: UIPropNames });
  // var evt = document.createEvent('CustomEvent');
  // evt.initCustomEvent('codeParsed', true, true, structuredUIArr);
  // console.log('Dispatching event: ', evt);
  // some_element.dispatchEvent(evt);
  return structuredUIArr;
}

/**
 *  Parses reducer function definitions for switch statement cases.
 *  INPUT: Object = Keys: Reducer Names, Values: Stringified function definitions
 *  OUTPUT: Pushes object containing @name: String and @cases: String[] to @structuredReducersArr: Array.
 */

reduxify.ReducerExtractor = (reducers) => {
  let reducersObj = {};
  let structuredReducersArr = [];
  const reducerNames = Object.keys(reducers);
    reducerNames.forEach(reducer => reducersObj[reducer] = []);
  reducers = JSON.stringify(reducers);
  const reducersArr = reducers.split('switch');
  const reducerCases = reducersArr.map(cases => cases.match(/case\s[\\'"\w]*:/gi, '')).join('').replace(/case|break|return/g, '').replace(/['";,\s]/g, '').split(':');

// Handles data anomalies and populates the reducersObj in the format of name: cases key-value pairs.
  if (reducersArr.length > 1) {

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
}

// Populates the structuredReducersArr with objects containing name and cases properties.

  reducerNames.forEach(key => {
    structuredReducersArr.push({
      name: key,
      cases: reducersObj[key]
    })
  });
  var evt = document.createEvent('CustomEvent');
  evt.initCustomEvent('codeParsed:reducers', true, true, structuredReducersArr);
  console.log('Dispatching event: ', evt);
  some_element.dispatchEvent(evt);
  return structuredReducersArr;
}

/**
 *
 *  Parses actionCreators function definitions for type properties on returned payloads.
 *  INPUT: Object = Keys: ActionCreator names, Values: Stringified function definitions
 *  OUTPUT: Pushes object containing @name: String and @type: String to @structuredActionCreatorsArr: Array.
 *
 */

reduxify.ActionExtractor = (actionCreators) => {
  let actionCreatorsObj = {};
  let structuredActionCreatorsArr = [];
  const actionCreatorsNames = Object.keys(actionCreators);
  actionCreators = JSON.stringify(actionCreators);
  const actionCreatorsArr = actionCreators.split('type:');
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
