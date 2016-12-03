/**
 * Listens for events in the seedux life-cycle. Triggered when a message is sent from the content script or from the application. Will either: (a) log a story entry, (b) retrieve the current log, (c) clear the log's history, (d) undo an action, (e) redo an action, or (f) store the application's tab ID, which is used at a later point to implement the undo and redo messages.
 *
 * @param {Object} msg is an object sent by the calling script. Contains multiple type properties.
 *
 */

let history = [];
const codeObj = {};
let future = [];
let tabId = 0;

chrome.runtime.onMessage.addListener((msg, sender, response) => {
  // console.log('Background got MSG: ', msg);
  if (msg.type === 'addToLog') {
    // console.log('Got New Entry! History: ', history);
    history.push(msg.historyEntry);
    future = [];
  }
  if (msg.type === 'populateLog') {
    response({ future, history, codeObj });
  }
  if (msg.type === 'resetLog') {
    history = [];
    future = [];
    response({ history, future });
  }
  if (msg.type === 'undoFromTool' && history.length) {
    // console.log('Got an Undo! Sending msg along to tab: ', tabId);
    future.unshift(history.pop());
    chrome.tabs.sendMessage(tabId, { type: 'seeduxUndo' });
  }
  if (msg.type === 'redoFromTool' && future.length) {
    // console.log('Got a Redo! Sending msg along to tab: ', tabId);
    history.push(future.shift());
    chrome.tabs.sendMessage(tabId, { type: 'seeduxRedo' });
  }
  if (msg.type === 'storeCode') {
    // console.log('Got New CodeObj: ', msg.codeObj);
    Object.assign(codeObj, msg.codeObj);
    // console.log('Aggregated CodeObj:', codeObj);
    tabId = sender.tab.id;
  }
});
