import React, { PropTypes } from 'react';
import Collapsible from './Collapsible';

const LogDrawer = ({ stashLog, unStashLog, exportLog, importLog, resetLog }) => {
  return (
    <Collapsible titleString='Log Options &#9660;' role='drawer'>
      <button onClick={stashLog}><i className="fa fa-archive" aria-hidden="true"></i> Stash Log</button>
      <button onClick={unStashLog}><i className="fa fa-envelope-open" aria-hidden="true"></i> Unstash Log</button>
      <button onClick={exportLog}><i className="fa fa-floppy-o" aria-hidden="true">&nbsp;</i>Export Log</button>
      <input type="file" id="file" className="custom-file-input" onChange={importLog} />
      <button className='btn-reset' onClick={resetLog}> <i className="fa fa-trash" aria-hidden="true"></i> Reset Log</button>
    </Collapsible>
  )
}

export default LogDrawer;
