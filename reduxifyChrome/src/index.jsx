import ReactDOM from 'react-dom';
import React from 'react';
import App from './app';

console.log("We're here!");

let history = [];


chrome.runtime.onMessage.addListener((msg, sender, response) => {
  // msg from content script with new history entry
  if (msg.type === 'addToLog') {
    console.log('Got New Entry! History: ', history);
    history.push(msg.historyEntry);
    document.write(msg.historyEntry);
  }
  // if (msg.type === 'populateLog') {
  //   console.log('Initializing History: ', history);
  //   history = msg.history;
  //   document.write(msg.history);
  // }
});

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
