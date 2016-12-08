import React, { PropTypes } from 'react'

const Flash = ({ text }) => {
  return (
    <div className='banner'>
      <h1>[seedux]</h1>
      <span className='flashMessage'>{text}</span>
  </div>
  )
}

export default Flash
