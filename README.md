# reduxifyChrome
A Chrome developer tool that provides a new tab that actively logs and visualizes the Redux data flow, enabling easier, faster debugging of any React-Redux implementation. 

# Instructions

## Fork and Clone

To use reduxifyChrome, fork and clone our Git repository to an easily accessible file path on your computer.

Import and use dispatchLogger, combineReducers, bindActionCreators, and connect from reduxify to ensure the full suite of lexical parsing, logging, and visualization of your Redux data flow occurs.

### Apply dispatchLogger middleware in index.js for app:

    import React from 'react';
    import { render } from 'react-dom';
    import { Provider } from 'react-redux';
    import createStore from 'redux';
    import dispatchLogger from *your filepath* + '/reduxify/lib/reduxify/src';
    import combinedReducers from './reducers/index';
    import App from './components/App';
    
    const store = createStore(combinedReducer, {}, applyMiddleware(dispatchLogger));
    
    render(
      <Provider store = { store }>
        <App />
      </Provider>,
      document.getElementById('app')
    );

### Replace Redux's combineReducers function with Reduxify's version:

    // import { combineReducers } from 'redux';
    import { combineReducers } from *your filepath* + '/reduxify/lib/redux/dist/redux';
    import reducer1 from './reducer1';
    import reducer2 from './reducer2';

    const combinedReducer = combineReducers({
      reducer1: reducer1,
      reducer2: reducer2
    })

### Replace Redux's bindActionCreators function with Reduxify's version:

    // import { bindActionCreators } from 'redux';
    import { bindActionCreators } from *your filepath* + '/reduxify/lib/redux/dist/redux';
    import * as allActionCreators from './actions';
    
    const boundActionCreators = bindActionCreators(allActionCreators, dispatch);

### Replace React-Redux's connect function with Reduxify's version:

    // import { connect } from 'react-redux';
    import { connect } from *your filepath* + 'reduxify/lib/react-redux/dist/react-redux';
    import { myComponent } from './components/myComponent';
    
    const container = connect()(myComponent);
    
### Navigate to chrome://extensions, click 'load as an unpacked extension' and select *your filepath* + 'reduxify/reduxifyChrome'

### Open your project using localhost and your port of choice in the Chrome browser. Click on the Reduxify Chrome extension icon in your toolbar to launch the developer tool!
    
## NPM Module

Coming soon!

## Chrome Extensions Store

Coming soon!
