import React from 'react'

const ActionTitle = ({titleString, buttonHandler, clickHandler }) => {
  return (
    <div>
      <span onClick={clickHandler}>
        <h2>{titleString}</h2>
      </span>
      <button onClick={() => buttonHandler()}>Restore</button>
    </div>
  )
}

export default ActionTitle
