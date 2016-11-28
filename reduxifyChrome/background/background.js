let history = [];
let codeObj;

chrome.runtime.onMessage.addListener((msg, sender, response) => {
    // sent from the content script to store log entry
  if (msg.type === 'addToLog') {
    console.log('Got New Entry! History: ', history);
    history.push(msg.historyEntry);
  }
  // sent from new instance of tool to get the current log
  if (msg.type === 'populateLog') {
    response({ history });
  }
  // sent from our tool to clear its history
  if (msg.type === 'resetLog') {
    history = [];
    response({ history });
  }
  // sent from the content script to store parsing data
  if (msg.type === 'storeVizData') {
    codeObj = msg.codeObj;
  }
});
