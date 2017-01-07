import React from 'react'
import DiffList from './DiffList'
import JSONTree from 'react-json-tree'
import Collapsible from './Collapsible';
import ActionTitle from './ActionTitle';

// const theme = {
//   scheme: 'monokai',
//   author: 'wimer hazenberg (http://www.monokai.nl)',
//   base00: '#272822',
//   base01: '#383830',
//   base02: '#49483e',
//   base03: '#75715e',
//   base04: '#a59f85',
//   base05: '#f8f8f2',
//   base06: '#f5f4f1',
//   base07: '#f9f8f5',
//   base08: '#f92672',
//   base09: '#fd971f',
//   base0A: '#f4bf75',
//   base0B: '#a6e22e',
//   base0C: '#a1efe4',
//   base0D: '#66d9ef',
//   base0E: '#ae81ff',
//   base0F: '#cc6633'
// };

const LogEntry = ({ entry, index, futury, present, restore }) => {
  const { diffs, modifiedAction, newState } = entry;

  const theme = {
    scheme: "Ocean",
    author: "Chris Kempson (http://chriskempson.com)",
    base00: "#050A24",
    base01: "#343d46",
    base02: "#4f5b66",
    base03: "#65737e",
    base04: "#a7adba",
    base05: "#c0c5ce",
    base06: "#dfe1e8",
    base07: "#eff1f5",
    base08: "#bf616a",
    base09: "#d08770",
    base0A: "#ebcb8b",
    base0B: "#a3be8c",
    base0C: "#96b5b4",
    base0D: "#8fa1b3",
    base0E: "#b48ead",
    base0F: "#ab7967",
  };


  const payload = Object.assign({}, modifiedAction);
  delete payload.type;
  const entryClass = futury ? 'log-entry-future' : 'log-entry-history';
  const titleString= futury ? `Staged Action # ${index} : ${modifiedAction.type}` : `Applied Action # ${index} : ${modifiedAction.type}`
  return (
    <Collapsible open={present} className={entryClass} role={'logEntry'}
      titleString={titleString} buttonHandler={() => restore(index)}>
      <div className='log-payload-container'>
        <span className='log-action-label'>Payload: </span>
        <JSONTree data={payload} theme={theme} shouldExpandNode={() => false} invertTheme={true}/>
      </div>
      <span className='log-action-label'>Store diffs: </span>
      <DiffList diffs={diffs} />
      <span className='log-action-label'>New complete store: </span>
      <JSONTree data={newState} theme={theme} shouldExpandNode={() => false} invertTheme={true} />
      <hr />
    </Collapsible>
  )
}

export default LogEntry;
