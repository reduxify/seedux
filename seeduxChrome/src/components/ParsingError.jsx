import React, { PropTypes } from 'react'
const errorMap = {
  'Reducers': 'CombineReducers()',
  'Action Creators': 'bindAllActionCreators()',
  'UI Props': 'connect()',
};
const ParsingError = (props) => {
  return (
    <div>Could not read {props.failureType}. Are you using {errorMap[props.failureType]} from the seedux library?</div>
  )
}

export default ParsingError
