import React from 'react';
import Rewind from './components/Rewind';
import DiffList from './components/DiffList'

const array = ['Button1', 'Button2','Button3'];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
    }
    chrome.extension.sendMessage({type: 'populateLog'}, (response) => {
      console.log('Initial Log Population: ', response.history);
      this.setState({
        history: response.history,
      });
    });
    chrome.runtime.onMessage.addListener((msg, sender, response) => {
      // msg from content script with new history entry
      if (msg.type === 'addToLog') {
        console.log('Got New Entry! History: ', history);
        history.push(msg.historyEntry);
        this.setState({ history });
      }
    });
  }
  render() {
    let diffs = [];
    if (this.state.history.length) {
      diffs = this.state.history[this.state.history.length - 1].diffs;
    }
    return (
      <div>
        Hi Guise!
        <DiffList diffs={diffs}/>
      </div>
    )
  }
}

export default App;
