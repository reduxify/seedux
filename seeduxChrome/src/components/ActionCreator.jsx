import React, { PropTypes } from 'react'
import Collapsible from './Collapsible';

function dispatchAction(action) {
  // var properties = document.getElementById('payload-textarea').value

  const payload = JSON.parse(document.getElementById('payload-textarea').value);
  const actionTypeFromForm = document.getElementById('action-select').value;
  console.log(`Sending ${actionTypeFromForm} with payload: `, payload);
  chrome.extension.sendMessage({
    type: 'dispatchAction',
    action: {
      type: actionTypeFromForm,
      ...payload
    }
  });
}
const ActionCreator = ({ actionTypes }) => {
  // console.log('ActionCreator received actionTypes: ', actionTypes);
  const selectOptions = actionTypes.map((actionType, index) => {
    return <option key={`select${index}`} value={actionType}>{actionType}</option>
  });
  return (
    <div className='action-creator'>
    <Collapsible titleString='Custom Action' role='drawer' >
      <button onClick={dispatchAction}>Dispatch</button>
      <select id='action-select' defaultValue={actionTypes[0]}>
        {selectOptions}
      </select>
      <textarea id='payload-textarea' placeholder="JSON-formatted payload goes here."/>
  </Collapsible>
</div>
  )
}

export default ActionCreator
