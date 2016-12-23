let d3Table = {};

function populateTable(codeObj) {
  addActionCreatorsToTable(codeObj.actionCreators, codeObj.actionTypes);
  addReducersToTable(codeObj.reducers, codeObj.actionTypes);
  addUIToTable(codeObj.ui, codeObj.uiResources, codeObj.actionMap);
  let d3TableKeys = Object.keys(d3Table);
  d3TableKeys.forEach(key => {
    if (!d3Table[key].includes('APP')) { d3Table[key].push('APP'); }
  })
  return d3Table;
}

function addUIToTable(ui, uiResources, actionMap) {
  if (ui) {
    const uiNameNodes = ui.children; // Array of container node objects
    let d3TableKeys = Object.keys(d3Table);
    if (uiResources && uiNameNodes) { // Object with structure -> { container: { prop: [state or action creators] } }
      uiNameNodes.forEach(node => {
        let name = uiResources[node.name]; // Look through container keys and uiResources
        let props = Object.keys(name); // Props of container in format -> { prop: [state or action creators] }
        if (actionMap) {
          props.forEach(prop => {
            let potentialActionCreatorOrStateArr = name[prop]; // Array of action creators or state keys
            potentialActionCreatorOrStateArr.forEach(p => {
                if (actionMap[p]) {
                  let actionType = actionMap[p];
                  if (d3Table[actionType]) {
                    if (!d3Table[actionType].includes(prop)) d3Table[actionType].push(prop);
                  }
                  else d3Table[actionType] = [prop];
                  if (!d3Table[actionType].includes(node.name)) { d3Table[actionType].push(node.name); }
                  if (!d3Table[actionType].includes('Containers')) { d3Table[actionType].push('Containers'); }
                }
                else {
                  let stateKey = p;
                  if (d3Table[stateKey]) {
                    if (!d3Table[stateKey].includes(prop)) d3Table[stateKey].push(prop);
                  }
                  else d3Table[stateKey] = [prop];
                  if (!d3Table[stateKey].includes(node.name)) { d3Table[stateKey].push(node.name); }
                  if (!d3Table[stateKey].includes('Containers')) { d3Table[stateKey].push('Containers'); }
                }
            });
          })
        }
      });
    }
    return d3Table;
  }
}

function addReducersToTable(reducers, actionTypes = []) {
  const reducerNameNodes = reducers.children;
  if (actionTypes.length) {
    actionTypes.forEach(a => {
      if (!d3Table[a]) { d3Table[a] = []; };
      reducerNameNodes.forEach(node => {
        if (node.children.length) {
          node.children.forEach(childNode => {
            if (childNode.name === a && !d3Table[a].includes(node.name)) {
              d3Table[a].push(node.name);
              if (!d3Table[a].includes('Reducers')) { d3Table[a].push('Reducers'); }
            }
          })
        }
      });
    });
  }
  return d3Table;
}

function addActionCreatorsToTable(actionCreators = { children: [] }, actionTypes = []) {
  const actionCreatorNameNodes = actionCreators.children;
  if (actionTypes.length) {
    actionTypes.forEach(a => {
      if (!d3Table[a]) { d3Table[a] = []; };
      actionCreatorNameNodes.forEach(node => {
        if (node.children.length) {
          node.children.forEach(childNode => {
            if (childNode.name === a && !d3Table[a].includes(node.name)) {
              d3Table[a].push(node.name);
              if (!d3Table[a].includes('Action Creators')) { d3Table[a].push('Action Creators'); }
            }
          })
        }
      });
    });
  }
  return d3Table;
}

// resetTable is used purely for testing purposes to assure d3Table does not persist data between tests

function resetTable() {
  return d3Table = {};
}

/* global chrome */
/**
 * Listens for events in the seedux life-cycle. Triggered when a message is sent
 * from the content script or from the application. Based on msg.type, we will:
 * (a) log a story entry,
 * (b) retrieve the current log,
 * (c) clear the log's history,
 * (d) undo an action,
 * (e) redo an action
 *
 * @param {Object} msg is an object sent by the calling script. Contains multiple type properties.
 *
 */

let history = [];
let codeObj = {
  count: 0,
};
let future = [];
let tabId = 0;
let freezeLog = false;

chrome.runtime.onMessage.addListener((msg, sender, response) => {

  // forwarded from middleware by content script on each new app event
  if (msg.type === 'addToLog' && !freezeLog) {
    history.push(msg.historyEntry);
    future = [];
  }

  // sent by extension to ask for initial log and codeObj data
  if (msg.type === 'populateLog') {
    freezeLog = msg.settings.freezeLog;
    d3Table = populateTable(codeObj);
    console.log('codeObj', codeObj)
    response({ future, history, codeObj, d3Table });
  }

  // sent by extension to reset the log
  if (msg.type === 'resetLog') {
    history = [];
    future = [];
    response({ history, future });
  }

  // sent by extension with an action to dispatch
  if (msg.type === 'dispatchAction') {
    chrome.tabs.sendMessage(tabId, msg)
  }

  // sent by extension to freeze the Log
  if (msg.type === 'freezeLog') {
    freezeLog = !freezeLog;

  }
  // sent by extension to initiate a restoreState; forwarded to content.js via chrome.tabs
  if (msg.type === 'restoreFromTool') {
    history = msg.newHistory;
    future = msg.newFuture;
    const restoreState = history[history.length - 1].newState;
    chrome.tabs.sendMessage(tabId, { type: 'seeduxRestore', restoreState });
  }

  // sent by content.js with new parsed code information

  if (msg.type === 'storeCode') {

    // on launch, an app should send 2 codeObj messages.
    // since we want our extension's data to be persistent independent of the
    // app being debugged, we must find another way to tell if the app has been
    // reloaded, or different app has been loaded.  Hence a count on the CodeObj,
    // representing how many messages have been received, and resetting our
    // memory on a 'third' (ie the new App's first) codeObj message.

    if (codeObj.count === 2) {
      codeObj = Object.assign({}, msg.codeObj);
      codeObj.count = 1;
    } else {
      Object.assign(codeObj, msg.codeObj);
      codeObj.count++;
    }

    // store the app's tab ID for use later in passing
    // messages from extension -> content script

    tabId = sender.tab.id;
  }
});
