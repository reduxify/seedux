const reduxify = {};
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
* Turns an array that consists of the name and the propNames of the container passed into reduxify.uiExtractor,
* which occurs on invocation of the Connect function from our library's version of React-Redux, into a hierarchical
* tree object ready for rendering as a D3 visualization.
*
* @param {Array} ui is an array whose values are name (value: string) and
* propNames (value: string[]).
*
* @returns {Object} headNode is a hierarchical tree object whose nodes are objects
* with keys of name (value: string) and children (value: string[], optional).
*
*/

reduxify.uiExtractor = (ui) => {
  console.log('Extracting ui...');
  const uiObj = {};
  const uiName = ui[0];
  const uiPropNames = ui[1];
  const uiNameNode = new Node(uiName);
    uiNameNode.children = [];
    uiPropNames.forEach(p => uiNameNode.children.push(new Node(p)));
    uiHeadNode.children.push(uiNameNode);
    parsedCodeObj.ui = uiHeadNode;
    return uiHeadNode;
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

reduxify.reducersExtractor = (reducers) => {
  const headNode = new Node('Reducers')
  const reducerNames = Object.keys(reducers);
  const strReducers = JSON.stringify(reducers);
  headNode.children = [];

  if (strReducers.includes('switch')) {
    const reducerCases = strReducers.split('case').slice(1).map(cases => cases.replace(/[^\w*:]/g, '')).map(cases => cases = cases.slice(0, cases.indexOf(':')));
    return assembleReducerNodes(headNode, reducers, reducerNames, reducerCases);
  }

  else if (strReducers.includes('action.type') && strReducers.includes('if')) {
    const reducerCases = strReducers.split('action.type').slice(1).map(subStr => subStr.replace(/[^\w\\)]/g, '')).map(subStr => subStr = subStr.slice(0, subStr.indexOf(')')));  
    return assembleReducerNodes(headNode, reducers, reducerNames, reducerCases);
  }

  else if (strReducers.includes('action.type') && strReducers.includes('?')) {
    const reducerCases = strReducers.split('action.type').slice(1).map(subStr => subStr.replace(/[^\w\?]/g, '')).map(subStr => subStr = subStr.slice(0, subStr.indexOf('?')));
    return assembleReducerNodes(headNode, reducers, reducerNames, reducerCases);
  }
}

function assembleReducerNodes(headNode, reducers, reducerNames, reducerCases) {
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
    return headNode;
});

parsedCodeObj.reducers = headNode;
return headNode;
};

/**
*
* Turns an object consisting of keys that are action creator names and values that are stringified
* action creator function definitions passed into reduxify.actionCreatorsExtractor, which occurs
* on invocation of the bindActionCreators function from our library's version of Redux, into a hierarchical
* tree object ready for rendering as a D3 visualization.
*
* @param {Object} actionCreators is an object whose keys are action creator function names (value: string)
* and whose values are stringified action creator function definitions (value: string).
*
* @returns {Object} headNode is a hierarchical tree object whose nodes are objects
* with keys of name (value: string) and children (value: string[], optional).
*
*/

reduxify.actionCreatorsExtractor = (actionCreators) => {
  console.log('Extracting Actions...!');
  const headNode = new Node('Action Creators');
  const actionCreatorNames = Object.keys(actionCreators);
  const strActionCreators = JSON.stringify(actionCreators);
  const actionTypes = strActionCreators.split('type:').map(t => t.match(/['"]\w*['",]/gi), '').slice(1);
  headNode.children = [];

  for (let i = 0; i < actionTypes.length; i++) {
    if (actionTypes[i] !== null) {
      actionTypes[i] = actionTypes[i][0].replace(/['"\\]/g, '');
    }
  }

    actionCreatorNames.forEach((ac, i) => {
    const actionCreatorNode = new Node(ac);
    actionCreatorNode.children === undefined ? actionCreatorNode.children = [new Node(actionTypes[i])] : actionCreatorNode.children.push(new Node(actionTypes[i]));
    headNode.children.push(actionCreatorNode);
  });

parsedCodeObj.actionCreators = headNode;
return headNode;
}

// attach a listener to respond with this data when the content script has loaded.
// document.addEventListener('scriptLoaded', function(e) {
//   // send message to background script with parsed code object
//   // which was sent via e.detail property
//   console.log('reduxifyExtractor hears the content script!');
//   var evt = document.createEvent('CustomEvent');
//   evt.initCustomEvent('codeParsed', true, true, parsedCodeObj);
//   console.log('EXTRACTOR: Dispatching event: ', evt);
//   document.dispatchEvent(evt);
// }, false);

module.exports = { reduxify, Node };
