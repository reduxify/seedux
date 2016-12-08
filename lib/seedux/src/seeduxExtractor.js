const parsedCodeObj = {};
const uiHeadNode = new Node('Containers');
uiHeadNode.children = [];

/**
 * Functional Node constructor used to assemble hierarchical tree objects.
 */

function Node(name) {
  this.name = name;
}

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
let uiName, uiPropNames;

  if (ui.constructor === Array) {
    const uiObj = {};
    uiName = ui[0];
    uiPropNames = ui[1];
  }
  else {
    uiName = Object.keys(ui)[0];
    uiPropNames = ui[uiName].match(/_ref\.\w*/gi).map(subStr => subStr = subStr.slice(5));
  }
return assembleUINodes(uiName, uiPropNames);
};

function assembleUINodes(uiName, uiPropNames) {
  const uiNameNode = new Node(uiName);
  uiNameNode.children = [];
  uiPropNames.forEach(p => uiNameNode.children.push(new Node(p)));
  uiHeadNode.children.push(uiNameNode);
  parsedCodeObj.ui = uiHeadNode;
  return uiHeadNode;
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
  const headNode = new Node('Reducers')
  const reducerNames = Object.keys(reducers);
  const strReducers = JSON.stringify(reducers);
  let reducerCases;
  headNode.children = [];

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
  return assembleReducerNodes(headNode, reducers, reducerNames, reducerCases);
};

function assembleReducerNodes(headNode, reducers, reducerNames, reducerCases = []) {
  reducerNames.forEach((reducer, i) => {
    const reducerNode = new Node(reducer);
    reducerNode.children = [];
      if (reducerCases[i]) {
          reducerCases.forEach(c => {
            if (reducers[reducer].includes(c)) {
              reducerNode.children.push(new Node(c));
            }
          });
      }
    headNode.children.push(reducerNode);
    parsedCodeObj.reducers = headNode;
  });
return headNode;
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
  const headNode = new Node('Action Creators');
  const actionCreatorNames = Object.keys(actionCreators);
  const strActionCreators = JSON.stringify(actionCreators);
  let actionTypes;
  headNode.children = [];

  actionTypes = strActionCreators.split('type:').slice(1).map(subStr => subStr = subStr.slice(1, subStr.indexOf('\\')).replace(/[^\w*.]/g, ''));
  if (/\./.test(actionTypes)) {
    actionTypes = actionTypes.map(subStr => subStr = subStr.slice(subStr.indexOf('.') + 1));
  }
  return assembleActionCreatorNodes(headNode, actionCreatorNames, actionTypes);
};

function assembleActionCreatorNodes(headNode, actionCreatorNames, actionTypes) {
  actionCreatorNames.forEach((ac, i) => {
    const actionCreatorNode = new Node(ac);
    actionCreatorNode.children === undefined ? actionCreatorNode.children = [new Node(actionTypes[i])] : actionCreatorNode.children.push(new Node(actionTypes[i]));
    headNode.children.push(actionCreatorNode);
  });
  parsedCodeObj.actionCreators = headNode;
  parsedCodeObj.actionTypes = actionTypes;
  return headNode;
};

// attach a listener to respond with this data when the content script has loaded.
document.addEventListener('scriptLoaded', function(e) {
  // send message to background script with parsed code object
  // which was sent via e.detail property
  // // console.log('seeduxExtractor hears the content script!');
  var evt = document.createEvent('CustomEvent');
  evt.initCustomEvent('codeParsed', true, true, parsedCodeObj);
  // // console.log('EXTRACTOR: Dispatching event: ', evt);
  document.dispatchEvent(evt);
}, false);

module.exports = { uiExtractor, actionCreatorsExtractor, reducersExtractor, Node };
