// var headingText = document.getElementsByTagName("div");

// for(let i = 0; i < headingText.length; i++){
// 	headingText[i].style.color = "#0000ff";
// }


// //try it w/ this site: http://www.color-hex.com/color/0000ff

// chrome.runtime.onMessage.addListener(function (msg, sender, response) {
// 	console.log('Request for info received!');
//   // First, validate the message's structure
//   if ((msg.from === 'popup') && (msg.subject === 'DOMInfo')) {
//     // Collect the necessary data
//     // (For your specific requirements `document.querySelectorAll(...)`
//     //  should be equivalent to jquery's `$(...)`)
//     var domInfo = {
//       total:   document.querySelectorAll('*').length,
//       inputs:  document.querySelectorAll('input').length,
//       buttons: document.querySelectorAll('button').length
//     };
//
//     // Directly respond to the sender (popup),
//     // through the specified callback */
//     response('oh heiiii');
//   }
// });

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
