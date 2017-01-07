import React, { PropTypes } from 'react'
import LogEntry from './LogEntry';

const Log = ({ history, future, restoreFromHistory, restoreFromFuture }) => {

  // map over history and future arrays to assemble their respective LogEntry components
  const historyEntries = history.map((historyEntry, index) => {
    return (<LogEntry key={index} index={index} entry={historyEntry} futury={false} present={index === history.length - 1} restore={restoreFromHistory}/>)
  }).reverse();
  const futureEntries = future.map((futureEntry, index) => {
    return (<LogEntry key={index} index={index} entry={futureEntry} futury={true} present={false} restore={restoreFromFuture}/>)
  }).reverse();

  return (
    <div className='log-container'>
      {futureEntries}
      <div className='time-label'>
        <i className="fa fa-arrow-up" aria-hidden="true"></i>
        &nbsp; FUTURE &nbsp;
        <i className="fa fa-arrow-up" aria-hidden="true"></i>
      </div>
      <hr />
      <div className='time-label'>
        <i className="fa fa-arrow-down" aria-hidden="true"></i>
        &nbsp; PAST &nbsp;
        <i className="fa fa-arrow-down" aria-hidden="true"></i>

      </div>
      {historyEntries}
    </div>
  )
}

export default Log;
