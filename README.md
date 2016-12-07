<div align='center'>
  <img src='http://i63.tinypic.com/11j9e83.png' alt='Seedux Logo'>
</div>

# Description
A Chrome developer tool that provides a new tab that actively logs and visualizes the Redux data flow, enabling easier, faster debugging of any React-Redux implementation. 

# Instructions

## How to Install: Fork and Clone

To use seeduxChrome, fork and clone our Git repository to an easily accessible file path on your computer.

Import and use dispatchLogger, combineReducers, bindActionCreators, and connect from seedux to ensure the full suite of lexical parsing, logging, and visualization of your Redux data flow occurs.

### Import Provider, CreateStore, and the Seedux dispatchLogger middleware from Seedux in your app's index:

    import { createStore, dispatchLogger, Provider } from 'seedux'; 
    
    const store = createStore(combinedReducer, [object], applyMiddleware(dispatchLogger));
    
    render(
      <Provider store = { store }>
        <App />
      </Provider>,
      document.getElementById('app')
    );

### Replace Redux's combineReducers function with seedux's version:

    // import { combineReducers } from 'redux';
    import { combineReducers } from 'seedux';

### Replace Redux's bindActionCreators function with seedux's version:

    // import { bindActionCreators } from 'redux';
    import { bindActionCreators } from 'seedux';

### Replace React-Redux's connect function with seedux's version:

    // import { connect } from 'react-redux';
    import { connect } from 'seedux';;
    
### How to use:

Navigate to chrome://extensions, click 'load as an unpacked extension' and select *your node_modules * + '/seedux/extension'

Open your project using localhost and your port of choice in the Chrome browser. Click on the seeduxChrome extension icon (it's a duck!) in your toolbar to launch the developer tool!
    
## How to Install: NPM Module

npm install seedux

## How to Install: Chrome Extensions Store

Coming soon!
