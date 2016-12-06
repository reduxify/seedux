import React from 'react'

const ActionTitle = ({string, buttonHandler }) => {
  return (
    <div>
      <h2>{string}</h2>
      <button onClick={() => buttonHandler()}>Restore</button>
    </div>
  )
}

export default ActionTitle
