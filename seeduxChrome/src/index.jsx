import ReactDOM from 'react-dom';
import React from 'react';
import App from './app.jsx';

require('./main.scss');
require('file?name=[name].[ext]!./index.html');

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
