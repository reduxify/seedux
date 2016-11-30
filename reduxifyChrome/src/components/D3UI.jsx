import React from 'react';
import rd3 from 'react-d3-library';
const RD3Component = rd3.Component;

const D3UI = ({ UI }) => {
  return (
    <div>
      <RD3Component data = { UI } />
    </div>
  );
};

D3UI.propTypes = {
  UI: React.PropTypes.object.isRequired
};

export default D3UI;
