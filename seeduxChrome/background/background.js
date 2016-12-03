let history = [];
let codeObj = {
  count: 0,
};
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
    console.log('Got New CodeObj: ', msg.codeObj);
    console.log('Aggregated CodeObj:', codeObj);
    // store the app's tab ID for use later in passing UNDO/REDO messages
    tabId = sender.tab.id;
  }
});
