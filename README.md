<div align='center'>
  <img src='http://i63.tinypic.com/11j9e83.png' alt='Seedux Logo'>
</div>

# Description
A Chrome developer tool that provides a new tab that actively logs and visualizes the Redux data flow, enabling easier, faster debugging of any React-Redux implementation. 

# Instructions

## How to Install: Fork and Clone

To use seeduxChrome, fork and clone our Git repository to an easily accessible file path on your computer.

Import and use dispatchLogger, combineReducers, bindActionCreators, and connect from seedux to ensure the full suite of lexical parsing, logging, and visualization of your Redux data flow occurs.

### Apply dispatchLogger middleware in index.js for app:

    import React from 'react';
    import { render } from 'react-dom';
    import { Provider } from 'react-redux';
    import createStore from 'redux';
    import dispatchLogger from *your filepath* + '/seedux/lib/seeduxChrome/src';
    import combinedReducers from './reducers/index';
    import App from './components/App';
    
    const store = createStore(combinedReducer, {}, applyMiddleware(dispatchLogger));
    
    render(
      <Provider store = { store }>
        <App />
      </Provider>,
      document.getElementById('app')
    );

### Replace Redux's combineReducers function with seedux's version:

    // import { combineReducers } from 'redux';
    import { combineReducers } from *your filepath* + '/seedux/lib/redux/dist/redux';
    import reducer1 from './reducer1';
    import reducer2 from './reducer2';

    const combinedReducer = combineReducers({
      reducer1: reducer1,
      reducer2: reducer2
    })

### Replace Redux's bindActionCreators function with seedux's version:

    // import { bindActionCreators } from 'redux';
    import { bindActionCreators } from *your filepath* + '/seedux/lib/redux/dist/redux';
    import * as allActionCreators from './actions';
    
    const boundActionCreators = bindActionCreators(allActionCreators, dispatch);

### Replace React-Redux's connect function with seedux's version:

    // import { connect } from 'react-redux';
    import { connect } from *your filepath* + 'seedux/lib/react-redux/dist/react-redux';
    import { myComponent } from './components/myComponent';
    
    const container = connect()(myComponent);
    
### How to use:

Navigate to chrome://extensions, click 'load as an unpacked extension' and select *your filepath* + 'seedux/seeduxChrome'

Open your project using localhost and your port of choice in the Chrome browser. Click on the seeduxChrome extension icon (it's a duck!) in your toolbar to launch the developer tool!
    
## How to Install: NPM Module

Coming soon!

## How to Install: Chrome Extensions Store

Coming soon!
