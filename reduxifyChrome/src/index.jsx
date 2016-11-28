import ReactDOM from 'react-dom';
import React from 'react';
import App from './app';

require('./main.scss');

console.log("We're here!");

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
