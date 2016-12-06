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

chrome.runtime.onMessage.addListener((msg, sender, response) => {
  console.log('Background got MSG: ', msg);
  // forwarded from middleware by content script on each new app event
  if (msg.type === 'addToLog') {
    // console.log('Got New Entry! History: ', history);
    history.push(msg.historyEntry);
    future = [];
  }
  // sent by extension to ask for initial log and codeObj data
  if (msg.type === 'populateLog') {
    response({ future, history, codeObj });
  }
  // sent by extension to reset the log
  if (msg.type === 'resetLog') {
    history = [];
    future = [];
    response({ history, future });
  }
  // sent by extension to initiate an undo; forwarded to content.js via chrome.tabs
  if (msg.type === 'undoFromTool' && history.length) {
    // console.log('Got an Undo! Sending msg along to tab: ', tabId);
    future.unshift(history.pop());
    chrome.tabs.sendMessage(tabId, { type: 'seeduxUndo' });
  }
  // sent by extension to initiate a redo; forwarded to content.js via chrome.tabs
  if (msg.type === 'redoFromTool' && future.length) {
    // console.log('Got a Redo! Sending msg along to tab: ', tabId);
    history.push(future.shift());
    chrome.tabs.sendMessage(tabId, { type: 'seeduxRedo' });
  }
  if (msg.type === 'restoreFromTool') {
    console.log('Got a Restore! Sending msg along to tab: ', tabId);
    console.log(msg.newHistory, msg.newFuture);
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
    // console.log('Got New CodeObj: ', msg.codeObj);
    // console.log('Aggregated CodeObj:', codeObj);
    // store the app's tab ID for use later in passing UNDO/REDO messages
    tabId = sender.tab.id;
  }
});
