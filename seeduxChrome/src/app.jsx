import React from 'react';
import * as fileSaver from 'file-saver';
import Graph from './components/Graph.jsx';
import D3Viz from './components/D3Viz';
import ParsingError from './components/ParsingError';
import ActionCreator from './components/ActionCreator';
import Log from './components/Log';
import LogDrawer from './components/LogDrawer';
import Flash from './components/Flash';
import SettingsMenu from './components/SettingsMenu';
import getGreetings from './greetings';

function getPaddedMinutes(dateObj) {
  return dateObj.getMinutes() < 10 ? `0${dateObj.getMinutes()}` : dateObj.getMinutes();
}

function makeStashableLog({ history, future, actionCreators, actionTypes, reducers, ui }, format) {
  const separator = format ? 2 : null;
  return JSON.stringify({
    history,
    future,
    actionCreators,
    actionTypes,
    reducers,
    ui,
  }, null, separator);
}

class App extends React.Component {
  constructor(props) {
    super(props);

    // dig around in LocalStorage to get saved settings
    const storedSettings = JSON.parse(localStorage.getItem('seeduxSettings'));
    const settings = storedSettings ? storedSettings
      : {
        containersViz: true,
        actionCreatorsViz: true,
        reducersViz: true,
        transactionLog: true,
        logFrozen: false,
        chartType: 'fancyTree',
        zoomLevel: 1,
      };
      settings.recentFilter = false;
    this.state = {
      settings,
      history: [],
      future: [],
      actionCreators: {},
      actionTypes: [],
      reducers: {},
      ui: {},
      d3Table: {},
      chartType: 'comfyTree',
      flashMessage: getGreetings(),
    };
    // send a msg to the background script to ask for the current Log
    // and set the freezeLog state.
    chrome.extension.sendMessage(
      {
        type: 'populateLog',
        settings: {
          freezeLog: this.state.freezeLog,
        },
      }, (response) => {
        this.setState({
          ui: response.codeObj.ui || {},
          actionCreators: response.codeObj.actionCreators || {},
          reducers: response.codeObj.reducers || {},
          actionTypes: response.codeObj.actionTypes || [],
          history: response.history,
          future: response.future,
          d3Table: response.d3Table
        });
    });

    // add a listener for new log Entries from the content script
    chrome.runtime.onMessage.addListener((msg, sender, response) => {

      // msg from content script with new history entry
      if (msg.type === 'addToLog' && !this.state.settings.logFrozen) {

        // add to our local copy of the log and update State,
        // discarding any existing future
        const newHistory = this.state.history;
        newHistory.push(msg.historyEntry);
        this.setState({
          history: newHistory,
          future: [],
        });
      }
    });
    this.generateSearchTerms.bind(this);
  }

  resetLog() {

    // send a message to the background script to reset its history
    chrome.extension.sendMessage({type: 'resetLog'}, (response) => {
      this.setState({
        future: [],
        history: [],
      });
    });
  }
 
  handleSelectChange(event) {
    const newSettings =  {
      ...this.state.settings,
      chartType: event.target.value,
    }
    this.setState({settings: newSettings});
  }

  handleZoomClick(direction) {
    let newZoomLevel = this.state.settings.zoomLevel;
    if (direction === 'in') {
      newZoomLevel += 0.1;
    }
    else {
      newZoomLevel -= 0.1;
    }
    this.setState({
      settings: { ...this.state.settings, zoomLevel: newZoomLevel },
    });
  }

  assembleVizData() {
    const assembledData = {
      name: 'APP',
      children: [],
    };
    if (this.state.settings.containersViz && this.state.ui.name) assembledData.children.push(this.state.ui);
    if (this.state.settings.reducersViz && this.state.reducers.name) assembledData.children.push(this.state.reducers);
    if (this.state.settings.actionCreatorsViz && this.state.actionCreators.name) assembledData.children.push(this.state.actionCreators);
    if (!assembledData.children.length) assembledData.children = null;
    return assembledData;
  }

  stashLog() {
    localStorage.setItem('seeduxLog', makeStashableLog(this.state, false));
  }

  unStashLog() {
    if (localStorage.getItem('seeduxLog')) {
      const newState = Object.assign({}, JSON.parse(localStorage.getItem('seeduxLog')));
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
      this.setState({
        history: newHistory,
        future: newFuture,
      });
    });
  }

  importLog(evt) {
    const file = evt.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (readEvt) => {
      const readResult = JSON.parse(readEvt.target.result);
      const filename = file.name;
      if (Object.keys(readResult).includes('chartType')) {
        const flashMessage = `Loaded ${filename}.`;
        this.setState({...readResult, flashMessage});
      }
      else this.flashMessage('Invalid Log File.');
    }
    reader.readAsText(file);
  }

  flashMessage(flashMessage) {
    this.setState(flashMessage);
  }

  exportLog() {
    const now = new Date();
    const formattedDate = `${now.getMonth()}-${now.getDate()}-${now.getYear().toString().slice(1)} ${now.getHours()}-${getPaddedMinutes(now)}`;
    const blob = new Blob([makeStashableLog(this.state, true)], {type: "text/plain;charset=utf-8"});
    fileSaver.saveAs(blob, `seeduxLog ${formattedDate}.json`);
  }

  toggleSettings(e) {

    // handle clicks in the settings menu by toggling the associated boolean stored in state.settings
    e.preventDefault();
    let changedSetting = e.target.id;
    let newSettingStatus = !this.state.settings[changedSetting];
    console.log('recentFilter', this.state.settings.recentFilter);
    // in the case that logFrozen is toggled, we must notify the background script as well
    if (e.target.id === 'logFrozen') {
      chrome.extension.sendMessage({type: 'freezeLog'}, (response) => {
      });
    }
    let newSettings = Object.assign({}, this.state.settings, { [changedSetting]: newSettingStatus } );
    this.setState({
      settings: newSettings
    });
  }

  generateSearchTerms() {
    const searchTerms = [];
    if (this.state.history.length) {
      let actionType = this.state.history[this.state.history.length - 1].modifiedAction.type;
      if (actionType !== '@@INIT') { searchTerms.push(actionType) };
      this.state.history[this.state.history.length - 1].diffs.forEach(diff => {
        if (diff.path) {
          diff.path.forEach(p => {
            searchTerms.push(p);
          });
        }
      });
    }
    return searchTerms;
  }

  render() {

    // retrieve latest diffs from our history
    let diffs = [];
    if (this.state.history.length) {
      diffs = this.state.history[this.state.history.length - 1].diffs;
    }

    // (partially) apply our restore function to provide invididual button functionality to be passed as props
    const restoreFromHistory = (index) => this.restore('past', index);
    const restoreFromFuture = (index) => this.restore('future', index);
    const undo = () => this.restore('past', this.state.history.length - 2);
    const redo = () => this.restore('future', 0);

    return (
      <div>
        <div className='header'>
          <header>
          <Flash text={this.state.flashMessage} />
          <div className='toolbar-container'>
            <div className='subToolbar'>
              <button onClick={() => this.handleZoomClick('in')}><i className="fa fa-search-plus" aria-hidden="true"></i></button>
              <button onClick={() => this.handleZoomClick('out')}><i className="fa fa-search-minus" aria-hidden="true"></i></button>
            </div>
            <ActionCreator actionTypes={this.state.actionTypes}/>
            <div className='subToolbar move-left'>
              <button onClick={undo}><span className="scaled">&#9100; </span> Undo</button>
              <button onClick={redo}><span className="flipped">&#9100; </span> Redo</button>
            </div>
            <div className='subToolbar move-right'>
              <SettingsMenu toggleSettings = {this.toggleSettings.bind(this)} settings = {this.state.settings} handleSelectChange={this.handleSelectChange.bind(this)} chartSelectValue={this.state.settings.chartType} />
              <LogDrawer stashLog={() => this.stashLog()}
                unStashLog={() => this.unStashLog()}
                exportLog={() => this.exportLog()}
                importLog={this.importLog.bind(this)}
                resetLog={() => this.resetLog()} />
            </div>
          </div>
          </header>
      </div>
      <div className='chart-container'>
        <D3Viz data={this.assembleVizData()} chartType={this.state.settings.chartType} zoomLevel = {this.state.settings.zoomLevel} d3Table = { this.state.d3Table }  searchTerms = { this.generateSearchTerms() } recentFilter={this.state.settings.recentFilter} />
        <hr />
        <Log history={this.state.history} future={this.state.future} restoreFromHistory={restoreFromHistory} restoreFromFuture={restoreFromFuture} />
      </div>
    </div>
    )
  }
}

export default App;
