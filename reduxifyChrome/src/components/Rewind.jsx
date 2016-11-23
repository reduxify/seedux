import React from 'react';

export default React.createClass({
  print: function() {
    return this.props.array || [];
  },
  render: function() {
    return <div className="rewind">
      {this.print().map(value =>
        <button key={value}>
          <h1>{value}</h1>
        </button>
      )}
    </div>;
  }
});