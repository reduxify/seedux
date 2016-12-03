/**
 * Intermediary script between seeDux and React-Redux application.
*/


 /**
 * Listens for custom DOM event 'actionDispatched' and sends a message obj to the background script of seeDux with a new historyEntry and a type of 'addToLog'.
 */
document.addEventListener('actionDispatched', function(e){
	// console.log('I heard an action! Sending to background...', e.detail);
	const msg = {};
	msg.historyEntry = e.detail;
	msg.type = 'addToLog';
	chrome.extension.sendMessage(msg, function(response) {});
}, false);

 /**
 * Listens for  custom DOM event 'codeParsed' which is dispatched from the combineReducers function. Sends a message object to the background script of seeDux with parsed-code and a type of 'storeCode'.
 */
document.addEventListener('codeParsed', function(e){
	// console.log('Code Parsing event heard! Sending to background...', e.detail);
  const msg = {};
  msg.codeObj = e.detail;
  msg.type = 'storeCode';
  chrome.extension.sendMessage(msg, function(response) {});
}, false);

 /**
 * Listens for any messages sent via the DOM and received from Seedux's background script. Initializes en event based on the message type and dispatches event.
 */
chrome.runtime.onMessage.addListener((msg, sender, response) => {
	// console.log('Got a message! ', msg);
	var evt = document.createEvent('Event');
	evt.initEvent(msg.type, true, true);
	// console.log('CONTENT_SCRIPT: Dispatching event: ', evt);
	document.dispatchEvent(evt);
});

 /**
 * Creates a custom event 'scriptLoaded' which is then dispatched to the seedux extractor so that the extractor can parse information.
 */
var evt = document.createEvent('Event');
evt.initEvent('scriptLoaded', true, true);
// console.log('CONTENT_SCRIPT: Dispatching event: ', evt);
document.dispatchEvent(evt);
