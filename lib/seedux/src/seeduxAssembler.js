const parsedCodeObj = {};
parsedCodeObj.uiResources = {};
const uiHeadNode = new Node('Containers');
uiHeadNode.children = [];

/**
 * Functional Node constructor used to assemble hierarchical tree objects.
 */

function Node(name) {
  this.name = name;
}

function assembleUINodes(uiName, uiPropNames = [], uiMapState = [], uiMapDispatch = []) {
  const uiNameNode = new Node(uiName);
  if (uiPropNames) {
    uiNameNode.children = [];
    uiPropNames.forEach(p => { 
      if (!/[^\w]/gi.test(p)) {
        uiNameNode.children.push(new Node(p));
      }
    })
  }
  uiHeadNode.children.push(uiNameNode);
  parsedCodeObj.ui = uiHeadNode;
  parsedCodeObj.uiResources[uiName] = Object.assign({}, uiMapState[uiName], uiMapDispatch[uiName])
  return uiHeadNode;
};

// resetUIHeadNode is used purely for testing purposes to assure uiHeadNode does not persist data between tests

function resetUIHeadNode() {
  return uiHeadNode.children = [];
}

function assembleReducerNodes(reducers, reducerNames, reducerCases = []) {
  const headNode = new Node('Reducers');
  headNode.children = [];
  reducerNames.forEach((name, i) => {
    const reducerNode = new Node(name);
    reducerNode.children = [];
      if (reducerCases[i]) {
          reducerCases.forEach(c => {
            if (reducers[name].includes(c)) {
              if (!/[^\w]/gi.test(c)) {
                reducerNode.children.push(new Node(c));
              }
            }
          });
      }
    headNode.children.push(reducerNode);
    parsedCodeObj.reducers = headNode;
  });
  return headNode;
};

function assembleActionCreatorNodes(actionCreatorNames, actionTypes) {
  const headNode = new Node('Action Creators');
  const actionMap = {};
  headNode.children = [];
  actionCreatorNames.forEach((ac, i) => {
    const actionCreatorNode = new Node(ac);
    actionMap[ac] = actionTypes[i];
    actionCreatorNode.children === undefined ? actionCreatorNode.children = [new Node(actionTypes[i])] : actionCreatorNode.children.push(new Node(actionTypes[i]));
    headNode.children.push(actionCreatorNode);
  });
  parsedCodeObj.actionCreators = headNode;
  parsedCodeObj.actionTypes = actionTypes;
  parsedCodeObj.actionMap = actionMap;
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

module.exports = { assembleUINodes, assembleReducerNodes, assembleActionCreatorNodes, resetUIHeadNode, Node };
