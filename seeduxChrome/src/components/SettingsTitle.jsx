import React from 'react'

const SettingsTitle = ({titleString, clickHandler }) => {
  return (
    <div>
      <span onClick={clickHandler}>
        <h2 className = 'settings-title'>{titleString}</h2>
      </span>
    </div>
  )
}

export default SettingsTitle;
