import React from 'react'
import JSONTree from 'react-json-tree'

const Diff = ({ kind, path, rhs, lhs='undefined' }) => {
  let diffClassName = 'diff-edit';
  if (kind === 'N') diffClassName = 'diff-new';
  return (
    <tr className={diffClassName}>
      <td className='diff-path col1'>{path.join(':')}</td>
      <td className='diff-json-container col2'>{JSON.stringify(lhs, null, 2)}</td>
      <td className='diff-json-container col3'>{JSON.stringify(rhs, null, 2)}</td>
    </tr>
  )
}

export default Diff
