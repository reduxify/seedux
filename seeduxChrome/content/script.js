/* global document chrome */
/**
 * Content script gets injected into Redux application to communicate with seedux and background.js
*/


 /**
 * Listens for custom DOM event dispatched by our middleware and sends a message obj
 * to the background script of seeDux with a new historyEntry and a type of 'addToLog'.
 */
document.addEventListener('actionDispatched', (e) => {
	// // console.log('I heard an action! Sending to background...', e.detail);
  const msg = {};
  msg.historyEntry = e.detail;
  msg.type = 'addToLog';
  chrome.extension.sendMessage(msg);
}, false);

 /**
 * Listens for custom DOM event dispatched from the combineReducers function.
 * Sends a message object to the background script of seeDux with parsed-code
 * and a type of 'storeCode'.
 */
document.addEventListener('codeParsed', (e) => {
	// // console.log('Code Parsing event heard! Sending to background...', e.detail);
  const msg = {};
  msg.codeObj = e.detail;
  msg.type = 'storeCode';
  chrome.extension.sendMessage(msg);
}, false);

 /**
 * Listens for messages and forwarded from our extension by background.js,
 * and forwards them on to our middleware.
 */
chrome.runtime.onMessage.addListener((msg) => {
	// console.log('Got a message! Will forward to library code', msg);
  const evt = document.createEvent('CustomEvent');
  evt.initCustomEvent(msg.type, true, true, msg);
  // console.log('CONTENT_SCRIPT: Dispatching event: ', evt);
  document.dispatchEvent(evt);
});

 /**
 * dispatches a custom event 'scriptLoaded' which is heard by our extractor,
 * prompting it to send its code-parsing data now that we are ready.
 */
const scriptLoadedEvt = document.createEvent('Event');
scriptLoadedEvt.initEvent('scriptLoaded', true, true);
// console.log('CONTENT_SCRIPT: Dispatching event: ', scriptLoadedEvt);
document.dispatchEvent(scriptLoadedEvt);
