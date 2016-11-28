// Content Script for Reduxify
// Acts as an intermediary between our code in the app being examined
// and our extension.

// Listen for custom DOM event dispatched by our code within the logger middlware
document.addEventListener('actionDispatched', function(e){
  // send message to background script with new historyEntry object
	// which was sent via e.detail property
	console.log('I heard an action! Sending to background...', e.detail);
  const msg = {};
  msg.historyEntry = e.detail;
  msg.type = 'addToLog';
  chrome.extension.sendMessage(msg, function(response) {
});
}, false);

// Listen for custom DOM event dispatched by our code within combineReducers
document.addEventListener('codeParsed:reducers', function(e){
  // send message to background script with parsed code object
	// which was sent via e.detail property
	console.log('Code Parsing event heard! Sending to background...', e.detail);
  const msg = {};
  msg.codeObj = e.detail;
  msg.type = 'storeReducers';
  chrome.extension.sendMessage(msg, function(response) {
});
}, false);
