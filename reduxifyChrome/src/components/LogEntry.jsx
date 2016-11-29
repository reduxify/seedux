import React from 'react'
import DiffList from './DiffList'
import JSONTree from 'react-json-tree'
import Collapsible from 'react-collapsible';
import Action from './Action'

const LogEntry = ({ entry, index, futury, present }) => {
  const { diffs, modifiedAction, newState } = entry;

  // const payload = Object.keys(modifiedAction).reduce((actionKey, index) => {
  //   if (actionKey !== 'type') return (<span key={index} className='log-action-payload'>{actionKey}: {modifiedAction[actionKey]}</span>)
  // });
  const payload = Object.assign({}, modifiedAction);
  delete payload.type;
  const actionString = `Action # ${index} : ${modifiedAction.type}`;
  const entryClass = futury ? 'log-entry-future' : 'log-entry-history';
  return (
    <Collapsible trigger={actionString} open={present} className={entryClass}>
      <p>
        <span className='log-action-label'>payload: </span>
        <JSONTree data={payload} shouldExpandNode={() => false}/>
      </p>
      <span className='log-action-label'>store diffs: </span>
      <DiffList diffs={diffs} />
      <span className='log-action-label'>new complete store: </span>
      <JSONTree data={newState} shouldExpandNode={() => false} />
      <hr />
    </Collapsible>
  )
}

export default LogEntry;
