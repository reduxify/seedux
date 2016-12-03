let history = [];
const codeObj = {};
let future = [];
let tabId = 0;

chrome.runtime.onMessage.addListener((msg, sender, response) => {
  console.log('Background got MSG: ', msg);
  // sent from the content script to store log entry
  if (msg.type === 'addToLog') {
    console.log('Got New Entry! History: ', history);
    history.push(msg.historyEntry);
    // clear any 'future' events
    future = [];
  }
  // sent from new instance of tool to get the current log
  if (msg.type === 'populateLog') {
    response({ future, history, codeObj });
  }
  // sent from our tool to clear its history
  if (msg.type === 'resetLog') {
    history = [];
    future = [];
    response({ history, future });
  }
  // sent from our tool to implement undo/redo
  if (msg.type === 'undoFromTool' && history.length) {
    console.log('Got an Undo! Sending msg along to tab: ', tabId);
    future.unshift(history.pop());
    chrome.tabs.sendMessage(tabId, { type: 'seeduxUndo' });
  }
  if (msg.type === 'redoFromTool' && future.length) {
    console.log('Got a Redo! Sending msg along to tab: ', tabId);
    history.push(future.shift());
    chrome.tabs.sendMessage(tabId, { type: 'seeduxRedo' });
  }
  // sent from the content script to store parsing data
  if (msg.type === 'storeCode') {
    console.log('Got New CodeObj: ', msg.codeObj);
    Object.assign(codeObj, msg.codeObj);
    console.log('Aggregated CodeObj:', codeObj);
    tabId = sender.tab.id;
    // store the app's tab ID for use later in passing UNDO/REDO messages
  }
});
