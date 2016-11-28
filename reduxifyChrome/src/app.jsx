import React from 'react';
import Rewind from './components/Rewind';
import LogEntry from './components/LogEntry'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
    }
    // send a msg to the background script to ask for the current Log
    chrome.extension.sendMessage({type: 'populateLog'}, (response) => {
      console.log('Initial Log Population: ', response.history);
      this.setState({
        history: response.history,
      });
    });

    // add a listener for new log Entries from the content script
    chrome.runtime.onMessage.addListener((msg, sender, response) => {
      // msg from content script with new history entry
      if (msg.type === 'addToLog') {
        const newHistory = this.state.history;
        console.log('Got New Entry! History: ');
        newHistory.push(msg.historyEntry);
        this.setState({ newHistory });
      }
    });
  }
  resetLog() {
    // send a message to the background script to reset its history
    chrome.extension.sendMessage({type: 'resetLog'}, (response) => {
      console.log('Log Reset.');
      this.setState({
        history: [],
      });
    });
  }
  render() {
    let diffs = [];
    if (this.state.history.length) {
      diffs = this.state.history[this.state.history.length - 1].diffs;
    }
    const logEntries = this.state.history.map((historyEntry, index) => {
      return (<LogEntry key={index} index={index} entry={historyEntry} />)
    });
    console.log(logEntries);
    return (
      <div>
        <h1>[seedux]</h1>
        <button onClick={() => this.resetLog()}>Reset Log</button>
        {logEntries}
      </div>
    )
  }
}

export default App;
