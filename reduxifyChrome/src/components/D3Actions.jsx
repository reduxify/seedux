import React, { PropTypes } from 'react';
import rd3 from 'react-d3-library';
const RD3Component = rd3.Component;

const D3Actions = ({ Actions }) => {
  return (
    <div>
      <RD3Component data = { Actions } />
    </div>
  );
};

D3Actions.propTypes = {
  Actions: React.propTypes.object.isRequired
};

export default D3Actions;
