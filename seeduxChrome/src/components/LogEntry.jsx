import React from 'react'
import DiffList from './DiffList'
import JSONTree from 'react-json-tree'
import Collapsible from './Collapsible';
import ActionTitle from './ActionTitle';

const LogEntry = ({ entry, index, futury, present, restore }) => {
  const { diffs, modifiedAction, newState } = entry;
  const theme = {
    scheme: "Ocean",
    author: "Chris Kempson (http://chriskempson.com)",
    base00: "#2b303b",
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
  return (
    <Collapsible open={present} className={entryClass} 
      titleString={`Action # ${index} : ${modifiedAction.type}`} buttonHandler={() => restore(index)}>
      <div className='log-payload-container'>
        <span className='log-action-label'>payloads: </span>
        <JSONTree data={payload} theme={theme} shouldExpandNode={() => false}/>
      </div>
      <span className='log-action-label'>store diffs: </span>
      <DiffList diffs={diffs} />
      <span className='log-action-label'>new complete store: </span>
      <JSONTree data={newState} theme={theme} shouldExpandNode={() => false} />
      <hr />
    </Collapsible>
  )
}

export default LogEntry;
