import React from 'react';
import rd3 from 'react-d3-library';
// import reducersHeadNode from 'tbd';
const RD3Component = rd3.Component;

const D3Reducers = ({ Reducers }) => {
  return (
    <div>
      <RD3Component data = { Reducers } />
    </div>
  );
};

D3Reducers.propTypes = {
  Reducers: React.propTypes.object.isRequired
};

export default D3Reducers;
