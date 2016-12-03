import React from 'react'

const Graph = ({ data }) => {
  const reducerElements = data.reducers.map((reducerObj, index) => {
    const casesElements = reducerObj.cases.map(thisCase => <li className='parse-list-subitem'>{thisCase}</li>);
    return (
      <span className='parse-list-item' id={'reducer' + index}>{reducerObj.name}
        <ul>
          {casesElements}
        </ul>
      </span>
    );
  });
  return (
    <table>
      <tr>
        <td>
          <h2>Reducers</h2>
          {reducerElements}
        </td>
      </tr>
    </table>
  )
}

export default Graph
