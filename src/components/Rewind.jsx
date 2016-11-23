import React from 'react';

export default React.createClass({
  print: function() {
    return this.props.array || [];
  },
  render: function() {
    return <div className="rewind">
      {this.print().map(entry =>
        <button key={entry}>
          <h1>{entry}</h1>
        </button>
      )}
    </div>;
  }
});