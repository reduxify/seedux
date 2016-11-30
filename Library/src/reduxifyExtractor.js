/**
*
* Turns an array that consists of objects containing the name and corresponding
* propNames of each container passed to our version of the react-redux's connect
* function into a hierarchical tree object ready for rendering as a D3 visualization.
*
* @param {Array} parsedUI is an array whose values are objects with keys of
* name (value: string) and propNames (value: string[]).
*
* @returns {Object} headNode is a hierarchical tree object whose nodes are objects
* with keys of name (value: string) and children (value: string[], optional).
*
*/

const D3UIStructurer = (parsedUI) => {
  console.log('ParsedUI: ', parsedUI);
  const headNode = new Node('Containers');
  headNode.children = [];
  parsedUI.forEach(container => {
    const containerNode = new Node(container.name);
    containerNode.children = [];
    headNode.children.push(containerNode);
    container.propNames.forEach(p => containerNode.children.push(new Node(p)));
  });
  console.log('headNode: ', headNode);
  return headNode;
}

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

const D3ReducersStructurer = (parsedReducers) => {
  const headNode = new Node('Reducers');
  headNode.children = [];
  parsedReducers.forEach(reducer => {
    const reducerNode = new Node(reducer.name);
    reducerNode.children = [];
    headNode.children.push(reducerNode);
    reducer.cases.forEach(c => reducerNode.children.push(new Node(c)));
  });
  return headNode;
}

/**
*
* Turns an array that consists of objects containing the name and corresponding
* action types of each actionCreator passed to our version of the react-redux's bindActionCreators
* function into a hierarchical tree object ready for rendering as a D3 visualization.
*
* @param {Array} parsedActionCreators is an array whose values are objects with keys of
* name (value: string) and type (value: string[]).
*
* @returns {Object} headNode is a hierarchical tree object whose nodes are objects
* with keys of name (value: string) and children (value: string[], optional).
*
*/

const D3ActionCreatorStructurer = (parsedActionCreators) => {
  const headNode = new Node('Action Creators');
  headNode.children = [];
  parsedActionCreators.forEach(actionCreator => {
    const actionCreatorNode = new Node(actionCreator.name);
    actionCreatorNode.children = [new Node(actionCreator.type)];
    headNode.children.push(actionCreatorNode);
  });
  return headNode;
}

// import { D3UIStructurer, D3ReducerStructurer, D3ActionCreatorStructurer } from './reduxifyD3Structurer'
const reduxify = {};
const parsedCodeObj = {};
const structuredUIArr = [];

/**
 *  Parses component for name and propNames.
 *  INPUT: Array = Array[0] = WrappedComponent.name, Array[1] = Object.keys(WrappedComponent.propTypes);
 *  OUTPUT: Pushes object containing @name: String and @propNames: String[] to @structuredUIArr: Array.
 */

// TODO: Figure out how to pass structuredUIArr to visualization once all containers and their propNames have been added.

reduxify.UIExtractor = (UI) => {
  console.log('Extracting UI...');
  let UIObj = {};
  const UIName = UI[0];
  const UIPropNames = UI[1];
  UIObj[UIName] = UIPropNames;
  structuredUIArr.push({ name: UIName, propNames: UIPropNames });

  parsedCodeObj.ui = D3UIStructurer(structuredUIArr);
  console.log('ParsedCodeObj.ui: ', parsedCodeObj.ui);

  return D3UIStructurer(structuredUIArr);
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
  parsedCodeObj.reducers = D3ReducersStructurer(structuredReducersArr);
  return D3ReducersStructurer(structuredReducersArr);
}

/**
 *
 *  Parses actionCreators function definitions for type properties on returned payloads.
 *  INPUT: Object = Keys: ActionCreator names, Values: Stringified function definitions
 *  OUTPUT: Pushes object containing @name: String and @type: String to @structuredActionCreatorsArr: Array.
 *
 */

reduxify.ActionExtractor = (actionCreators) => {
  console.log('Extracting Actions...!');
  let actionCreatorsObj = {};
  let structuredActionCreatorsArr = [];
  const actionCreatorsNames = Object.keys(actionCreators);
  actionCreators = JSON.stringify(actionCreators);
  const actionCreatorsArr = actionCreators.split('type:');
  const actionTypes = actionCreatorsArr.map(t => t.match(/['"]\w*['",]/gi), '').slice(1);

// Handles data anomalies and populates the actionCreatorsObj in the format of name: type key-value pairs.

  for (let i = 0; i < actionTypes.length; i++) {
    if (actionTypes[i] !== null) {
      actionTypes[i] = actionTypes[i][0].replace(/['"\\]/g, '');
      actionCreatorsObj[actionCreatorsNames[i]] = actionTypes[i];
    }
  }

// Populates the structuredActionCreatorsArr with objects containing name and type properties.

  actionCreatorsNames.forEach(key => {
    structuredActionCreatorsArr.push({
      name: key,
      type: actionCreatorsObj[key]
    })
  });

  parsedCodeObj.actionCreators = D3ActionCreatorStructurer(structuredActionCreatorsArr);

  return D3ActionCreatorStructurer(structuredActionCreatorsArr);
}

// attach a listener to respond with this data when the content script has loaded.
document.addEventListener('scriptLoaded', function(e) {
  // send message to background script with parsed code object
  // which was sent via e.detail property
  console.log('reduxifyExtractor hears the content script!');
  var evt = document.createEvent('CustomEvent');
  evt.initCustomEvent('codeParsed', true, true, parsedCodeObj);
  console.log('EXTRACTOR: Dispatching event: ', evt);
  document.dispatchEvent(evt);
}, false);

/**
 *
 * Functional Node constructor used to assemble hierarchical tree objects.
 *
 */

function Node(name) {
  this.name = name;
}


module.exports = { reduxify };
