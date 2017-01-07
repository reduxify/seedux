const parsedCodeObj = {};

parsedCodeObj.reducers = {
  name: "Reducers",
  children: [],
};
parsedCodeObj.ui = {
  name: "Containers",
  children: [],
};
parsedCodeObj.actionCreators = {
  name: "Action Creators",
  children: [],
};

parsedCodeObj.uiResources = {};
const uiHeadNode = new Node('Containers');
const acHeadNode = new Node('Action Creators');
uiHeadNode.children = [];
acHeadNode.children = [];
const actionMap = {};


/**
 * Functional Node constructor used to assemble hierarchical tree objects.
 */

function Node(name) {
  this.name = name;
}

/**
 *
 * @desc The assembleUINodes function is called and returned by uiExtractor with
 * uiName, uiPropNames, uiMapState, and uiMapDispatch as arguments. The function
 * transforms the uiName and uiPropNames arguments into a hierarchical tree object
 * ready for rendering as a D3 visualization, which it assigns to the parsedCodeObj
 * as the value of the ui key. The function also merged uiMapState and uiMapDispatch
 * into one object, which is assigned to the parsedCode Obj as the value of the key
 * uiResources.
 *
 * @param {string, string[], object, object} The assembleUiNodes function is called with
 * uiName (string), uiPropNames (string[]), uiMapState (object), and uiMapDispatch(object).
 *
 * @return {Node} The assembleUINodes function returns hierarchical tree object with
 * a prototype of Node ready for rendering as a D3 visualization.
 *
 */

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

/**
 *
 * @desc The assembleReducerNodes function is called and returned by reducerExtractor
 * with reducers, reducerNames, and reducerCases as arguments. Using reducers for
 * verification, the function transforms the reducerNames and reducerCases arguments
 * into a hierarchical tree object ready for rendering as a D3 visualization, which
 * it assigns to the parsedCodeObj as the value of the reducers key.
 *
 * @param {object[], string[], string[]} The assembleReducerNodes function is called
 * with three arguments: reducers (object[]), reducerNames (string[]), and reducerCases
 * (string[]).
 *
 * @return {Node} The assembleReducerNodes function returns hierarchical tree object with
 * a prototype of Node ready for rendering as a D3 visualization.
 *
 */

function assembleReducerNodes(reducers, reducerNames, reducerCases = []) {
  const headNode = new Node('Reducers');
  headNode.children = [];
  reducerNames
  .filter(name => name !== 'undefined').forEach((name, i) => {
    const reducerNode = new Node(name);
    reducerNode.children = [];
      if (reducerCases[i]) {
          reducerCases
            .filter(c => c !== 'undefined')
            .forEach(c => {
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

/**
 *
 * @desc The assemblActionCreatorNodes function is called and returned by
 * actionCreatorsExtractor with actionCreatorNames and actionTypes as arguments.
 * The function transforms the actionCreatorNames and actionTypes arguments
 * into a hierarchical tree object ready for rendering as a D3 visualization, which
 * it assigns to the parsedCodeObj as the value of the actionCreators key. The function
 * also assigns actionTypes as a key of the parsedCodeObj with actionTypes as a value and
 * assigns actionMap, an object with keys consisting actionCreator function names
 * and values that are correlated actionTypes.
 *
 * @param {string[], string[]} The assembleActionCreatorNodes function is called
 * with two arguments: actionCreatorNames (string[]), and actionTypes (string[]).
 *
 * @return {Node} The assembleActionCreatorNodes function returns hierarchical tree object with
 * a prototype of Node ready for rendering as a D3 visualization.
 *
 */

function assembleActionCreatorNodes(actionCreatorNames, actionTypes) {
  actionCreatorNames.forEach((ac, i) => {
    const actionCreatorNode = new Node(ac);
    actionMap[ac] = actionTypes[i];
    actionCreatorNode.children === undefined ? actionCreatorNode.children = [new Node(actionTypes[i])] : actionCreatorNode.children.push(new Node(actionTypes[i]));
    acHeadNode.children.push(actionCreatorNode);
  });
  parsedCodeObj.actionCreators = acHeadNode;
  parsedCodeObj.actionTypes = actionTypes;
  parsedCodeObj.actionMap = actionMap;
  return acHeadNode;
};

// resetACHeadNode is used purely for testing purposes to assure acHeadNode does not persist data between tests

function resetACHeadNode() {
  return acHeadNode.children = [];
}

  // Outside of a test environment, attach a listener to respond with this data when the content script has loaded.
  
if (process.env.NODE_ENV !== 'test') {
  document.addEventListener('scriptLoaded', function(e) {

    // send message to background script with parsed code object
    // which was sent via e.detail property
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent('codeParsed', true, true, parsedCodeObj);

    document.dispatchEvent(evt);
  }, false);
}

module.exports = { assembleUINodes, assembleReducerNodes, assembleActionCreatorNodes, resetUIHeadNode, resetACHeadNode, Node };
