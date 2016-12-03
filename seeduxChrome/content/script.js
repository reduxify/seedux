// Content Script for seedux
// Acts as an intermediary between our code in the app being examined
// and our extension.


// query tabs so we can send the current tab ID along to the background
// chrome.tabs.query({active: true}, function(tab) {
// 	chrome.extension.sendMessage({type: 'addTabId', id: tab.id}, function(response) {
// 	});
// })

// Listen for custom DOM event dispatched by our code within the logger middlware
document.addEventListener('actionDispatched', function(e){
  // send message to background script with new historyEntry object
	// which was sent via e.detail property
	// console.log('I heard an action! Sending to background...', e.detail);
	const msg = {};
	msg.historyEntry = e.detail;
	msg.type = 'addToLog';
	chrome.extension.sendMessage(msg, function(response) {});
}, false);

// Listen for custom DOM event dispatched by our code within combineReducers
document.addEventListener('codeParsed', function(e){
  // send message to background script with parsed code object
	// which was sent via e.detail property
	// console.log('Code Parsing event heard! Sending to background...', e.detail);
  const msg = {};
  msg.codeObj = e.detail;
  msg.type = 'storeCode';
  chrome.extension.sendMessage(msg, function(response) {});
}, false);

// listen for messages from the background script (forwarded from our tool)
// and forward them to our middlware via the DOM
chrome.runtime.onMessage.addListener((msg, sender, response) => {
	console.log('Got a message! ', msg);
	var evt = document.createEvent('Event');
	evt.initEvent(msg.type, true, true);
	console.log('CONTENT_SCRIPT: Dispatching event: ', evt);
	document.dispatchEvent(evt);
});

// Once we're injected, hit up the extractor for parsing information
// by creating and emitting a custom event.
var evt = document.createEvent('Event');
evt.initEvent('scriptLoaded', true, true);
console.log('CONTENT_SCRIPT: Dispatching event: ', evt);
document.dispatchEvent(evt);
