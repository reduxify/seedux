import React from 'react'

const Diff = ({ kind, path, rhs, lhs='undefined' }) => {
  let diffClassName = 'diff-edit';
  if (kind === 'N') diffClassName = 'diff-new';
  console.log('diffClassName: ', diffClassName);
  return (
    <div className={diffClassName}>
      <span className='diff-path'>{path.join(':')}</span>,
      <span className='diff-lhs'>{lhs}</span>
      =>
      <span className='diff-rhs'>{rhs}</span>
    </div>
  )
}

export default Diff
