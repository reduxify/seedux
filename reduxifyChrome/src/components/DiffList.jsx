import React from 'react'
import Diff from './Diff'

const DiffList = ({ diffs }) => {
  let diffElements = '';
  if (diffs.length) {
    diffElements = diffs.map((diff, index) => {
      if (diff.kind === 'E') return (<Diff key={diff.kind + index} kind={diff.kind} path={diff.path} rhs={diff.rhs} lhs={diff.lhs} />)
      else if (diff.kind === 'A') return (<Diff key={diff.kind + index} kind={diff.item.kind} path={diff.path} rhs={diff.item.rhs} lhs={diff.item.lhs ? diff.item.lhs : 'undefined'} />)
    });
}
  return (
    <table>
      <tr>
      <td className='col1'>
        Path
      </td>
      <td className='col2'>
        LHS
      </td>
      <td className='col3'>
        RHS
      </td>
    </tr>
      {diffElements}
  </table>
  )
}

export default DiffList
