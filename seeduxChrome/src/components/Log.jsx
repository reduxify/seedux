import React, { PropTypes } from 'react'
import LogEntry from './LogEntry';

const Log = ({ history, future, restoreFromHistory, restoreFromFuture }) => {
  // map over history and future arrays to assemble their respective LogEntry components
  const historyEntries = history.map((historyEntry, index) => {
    return (<LogEntry key={index} index={index} entry={historyEntry} futury={false} present={index === history.length - 1} restore={restoreFromHistory}/>)
  });
  const futureEntries = future.map((futureEntry, index) => {
    return (<LogEntry key={index} index={index} entry={futureEntry} futury={true} present={false} restore={restoreFromFuture}/>)
  });

  return (
    <div className='log-container'>
      {historyEntries}
      <hr />
      {futureEntries}
    </div>
  )
}

export default Log;
