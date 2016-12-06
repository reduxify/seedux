import React from 'react';
import Graph from './components/Graph.jsx';
import D3Viz from './components/D3Viz';
import ParsingError from './components/ParsingError';
import Log from './components/Log';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
      future: [],
      actionCreators: {},
      reducers: {},
      ui: {},
      chartType: 'comfyTree',
    };
    // send a msg to the background script to ask for the current Log
    chrome.extension.sendMessage({type: 'populateLog'}, (response) => {
      console.log('Initial Log Population: ', response.history, response.future);
      this.setState({
        ui: response.codeObj.ui || {},
        actionCreators: response.codeObj.actionCreators || {},
        reducers: response.codeObj.reducers || {},
        history: response.history,
        future: response.future,
      });
    });

    // add a listener for new log Entries from the content script
    chrome.runtime.onMessage.addListener((msg, sender, response) => {
      // msg from content script with new history entry
      if (msg.type === 'addToLog') {
        // add to our local copy of the log and update State,
        // discarding any existing future
        const newHistory = this.state.history;
        // console.log('Got New Entry!');
        newHistory.push(msg.historyEntry);
        this.setState({
          history: newHistory,
          future: [],
        });
      }
    });
  }
  resetLog() {
    // send a message to the background script to reset its history
    chrome.extension.sendMessage({type: 'resetLog'}, (response) => {
      console.log('Log Reset.');
      this.setState({
        future: [],
        history: [],
      });
    });
  }
  handleSelectChange(event) {
    this.setState({chartType: event.target.value})
  }
  createViz(data, name) {
    console.log('createVizdata: ', data);
    // check if our code parsing data has come through.  if not, render a
    // friendly message.
    return (!data.children || !data.children.length) ?
      <ParsingError failureType={name} /> :
      <D3Viz data={data}
        chartType={this.state.chartType}
        searchTerm = { this.state.history.length ? this.state.history[this.state.history.length - 1].modifiedAction.type : null } />
  }
  stashLog() {
    localStorage.setItem('seeduxLog', JSON.stringify(this.state));
    console.log('Extension State Stashed.');
  }
  unStashLog() {
    if (localStorage.getItem('seeduxLog')) {
      const newState = Object.assign({}, JSON.parse(localStorage.getItem('seeduxLog')));
      console.log('Re-loading Extension State: ', newState);
      this.setState(newState);
    }
  }
  restore(direction, index) {
    // this is the 'brains' of the entire restore-state process; it determines what the newHistory
    // and newFuture should be, and sends them to the background script for storage.  The background script passes
    // just the 'new' i.e. restored state on to the content script -> seeduxLogger listener -> combineReducers listener route,
    // where it is returned as the app's next state, completing the restoration.
    let newHistory, newFuture;
    if (direction === 'past' && index >= 0) {
      newHistory = this.state.history.slice(0, index + 1);
      newFuture = this.state.history.slice(index + 1).concat(this.state.future);
    } else if (direction === 'future' && this.state.future.length) {
      newFuture = this.state.future.slice(index + 1);
      newHistory = this.state.history.concat(this.state.future.slice(0, index + 1));
    }
    if (newHistory && newFuture) chrome.extension.sendMessage({type: 'restoreFromTool', newHistory, newFuture }, (response) => {
      console.log('Restoring to index: ', index, ' from ', direction);
      console.log('new history: ', newHistory, ' new Future: ', newFuture);
      this.setState({
        history: newHistory,
        future: newFuture,
      });
    });
  }
  render() {
    // retrieve latest diffs from our history
    let diffs = [];
    if (this.state.history.length) {
      diffs = this.state.history[this.state.history.length - 1].diffs;
    }
    // curry our restore function to provide invididual button functionality
    const restoreFromHistory = (index) => this.restore('past', index);
    const restoreFromFuture = (index) => this.restore('future', index);
    const undo = () => this.restore('past', this.state.history.length - 2);
    const redo = () => this.restore('future', 0);
    return (
      <div>
        <h1>[seedux]</h1>
          <div className='chart-container'>
          {this.createViz(this.state.ui, 'UI Props')}
          {this.createViz(this.state.actionCreators, 'Action Creators')}
          {this.createViz(this.state.reducers, 'Reducers')}
        </div>
        <select value={this.state.value} onChange={this.handleSelectChange.bind(this)}>
          <option value="comfyTree">ComfyTree</option>
          <option value="cozyTree">CozyTree</option>
          <option value="list">list</option>
        </select>
        <button onClick={() => this.resetLog()}>Reset Log</button>
        <button onClick={() => this.stashLog()}>Stash Log</button>
        <button onClick={() => this.unStashLog()}>Unstash Log</button>
        <button onClick={undo}>Undo</button>
        <button onClick={redo}>Redo</button>
        <Log history={this.state.history} future={this.state.future} restoreFromHistory={restoreFromHistory} restoreFromFuture={restoreFromFuture} />
      </div>
    )
  }
}

export default App;
