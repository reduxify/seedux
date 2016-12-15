import React from 'react'

const DrawerTitle = ({titleString, clickHandler }) => {
  return (
    <div>
      <button onClick={clickHandler}>
        {titleString}
      </button>
    </div>
  )
}

export default DrawerTitle;
