let history = [];

chrome.runtime.onMessage.addListener((msg, sender, response) => {
    // sent from another content script, intended for saving source
  if (msg.type === 'addToLog') {
    console.log('Got New Entry! History: ', history);
    history.push(msg.historyEntry);
      // send message to toolTab
  }
  // sent from newtab-contentscript, to get the source
  if (msg.type === 'populateLog') {
    response({ history });
  }
  if (msg.type === 'resetLog') {
    history = [];
    response({ history });
  }
});
