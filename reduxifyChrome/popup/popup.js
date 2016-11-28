document.write("THIS IS REDUXIFY");

console.log('Hello');

function setDOMInfo(data) {
	document.write(data);
}

chrome.tabs.create({ url: 'dist/index.html' });

// window.addEventListener('DOMContentLoaded', function () {
// 	console.log('Querying!');
//   // ...query for the active tab...
//   chrome.tabs.query({
//     active: true,
//     currentWindow: true
//   }, function (tabs) {
//     // ...and send a request for the DOM info...
//     chrome.tabs.sendMessage(
//         tabs[0].id,
//         {from: 'popup', subject: 'DOMInfo'},
//         // ...also specifying a callback to be called
//         //    from the receiving end (content script)
//         setDOMInfo);
//   });
// });

chrome.extension.onMessage.addListener(function(myMessage, sender, sendResponse){
    document.write(myMessage);
    return true;
 });
