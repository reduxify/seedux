import React, { PropTypes } from 'react'

const Flash = ({ text }) => {
  return (
    <div className='banner'>
      <h1>[seedux]</h1>
      <div className='flashMessage' dangerouslySetInnerHTML={{ __html: text }} />
  </div>
  )
}

export default Flash
