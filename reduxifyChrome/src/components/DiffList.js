import React from 'react'
import Diff from './Diff'

const DiffList = ({ diffs }) => {
  let diffElements = '';
  if (diffs.length) {
    diffElements = diffs.map((diff, index) => {
      if (diff.kind === 'E') return (<Diff key={diff.kind + index} kind={diff.kind} path={diff.path} rhs={JSON.stringify(diff.rhs)} lhs={JSON.stringify(diff.lhs)} />)
      else if (diff.kind === 'A') return (<Diff key={diff.kind + index} kind={diff.item.kind} path={diff.path} rhs={JSON.stringify(diff.item.rhs)} lhs={diff.item.lhs ? JSON.stringify(diff.item.lhs) : 'undefined'} />)
    });
}
  console.log('diffElements: ', diffElements);
  return (
    <div>
      Path, LHS => RHS
      {diffElements}
    </div>
  )
}

export default DiffList
