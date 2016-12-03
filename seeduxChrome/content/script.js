/**
 * Intermediary script between seeDux and React-Redux application.
*/


 /**
 * Listens for  custom DOM event 'actionDispatched' and sends a message to the background script of seeDux with a new historyEntry object which is attached to the e.detail property.
 */
document.addEventListener('actionDispatched', function(e){
	// console.log('I heard an action! Sending to background...', e.detail);
	const msg = {};
	msg.historyEntry = e.detail;
	msg.type = 'addToLog';
	chrome.extension.sendMessage(msg, function(response) {});
}, false);

 /**
 * Listens for  custom DOM event 'codeParsed' which is dispatched from combineReducers function and sends a message to the background script of seeDux with a parsed-code object which is attached to the e.detail property.
 */
document.addEventListener('codeParsed', function(e){
	// console.log('Code Parsing event heard! Sending to background...', e.detail);
  const msg = {};
  msg.codeObj = e.detail;
  msg.type = 'storeCode';
  chrome.extension.sendMessage(msg, function(response) {});
}, false);

 /**
 * Listens for any messages received from Seedux's background script and sent to seedux middleware via the DOM.
 */
chrome.runtime.onMessage.addListener((msg, sender, response) => {
	// console.log('Got a message! ', msg);
	var evt = document.createEvent('Event');
	evt.initEvent(msg.type, true, true);
	// console.log('CONTENT_SCRIPT: Dispatching event: ', evt);
	document.dispatchEvent(evt);
});

 /**
 * Creates a custom event whose value is initialized and then dispatched to the seedux Extractor in order to parse information.
 */
var evt = document.createEvent('Event');
evt.initEvent('scriptLoaded', true, true);
// console.log('CONTENT_SCRIPT: Dispatching event: ', evt);
document.dispatchEvent(evt);
