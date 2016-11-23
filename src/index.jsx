import React from 'react';
import ReactDOM from 'react-dom';
import Rewind from './components/Rewind';

const array = ['Button1', 'Button2','Button3'];


ReactDOM.render(
  <Rewind array={array} />,
  document.getElementById('app')
);