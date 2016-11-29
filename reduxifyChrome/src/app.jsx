import React from 'react';
import Rewind from './components/Rewind';
import LogEntry from './components/LogEntry'
import D3UI from './components/D3UI';
import D3Actions from './components/D3Actions';
import D3Reducers from './components/D3Reducers';
import { UIHeadNode, actionsHeadNode, reducersHeadNode } from './../d3/basicTree';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
      UI: {},
      Actions: {},
      Reducers: {}
    }

/**
 * 
 * Import head nodes of D3 visualizations and integrate with state after component mounts
 * 
 */

    componentDidMount() {
      this.setState({}, this.state, { UI: UIHeadNode, Actions: actionsHeadNode, Reducers: reducersHeadNode });
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
        <div>
        <h1>[seedux]</h1>
        <button onClick={() => this.resetLog()}>Reset Log</button>
        {logEntries}
        </div>
        <div>
          <D3UI UI = { this.state.UI }/>
          <D3Actions Actions = { this.state.Actions } />
          <D3Reducers Reducers = { this.state.Reducers }/>
        </div>
      </div>
    )
  }
}

export default App;
