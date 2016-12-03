<div align='center'>
  <img src='http://i63.tinypic.com/11j9e83.png' alt='Seedux Logo'>
</div>

# Description
A Chrome developer tool that provides a new tab that actively logs and visualizes the Redux data flow, enabling easier, faster debugging of any React-Redux implementation. 

# Instructions

## How to Install: npm

    npm install seedux

### Import redux and react-redux methods from seedux, and apply dispatchLogger middleware in your app's index:

    import React from 'react';
    import { render } from 'react-dom';
    import { createStore, dispatchLogger, Provider } from 'seedux';
    import combinedReducers from './reducers';
    import App from './components/App';
    
    const store = createStore(reducers, {}, applyMiddleware(dispatchLogger));
    
    render(
      <Provider store = { store }>
        <App />
      </Provider>,
      document.getElementById('app')
    );

### Replace Redux's combineReducers function with seedux's version:

    // import { combineReducers } from 'redux';
    import { combineReducers } from 'seedux';
    import reducer1 from './reducer1';
    import reducer2 from './reducer2';

    const combinedReducer = combineReducers({
      reducer1: reducer1,
      reducer2: reducer2
    })

### Replace Redux's bindActionCreators function with seedux's version:

    // import { bindActionCreators } from 'redux';
    import { bindActionCreators } from 'seedux';
    import * as allActionCreators from './actions';
    
    const boundActionCreators = bindActionCreators(allActionCreators, dispatch);

### Replace React-Redux's connect function with seedux's version:

    // import { connect } from 'react-redux';
    import { connect } from 'seedux';
    import { myComponent } from './components/myComponent';
    
    const container = connect()(myComponent);
    
### How to use:

Navigate to chrome://extensions, click 'load as an unpacked extension' and select *your node_modules * + '/seedux/extension'

Open your project using localhost and your port of choice in the Chrome browser. Click on the seeduxChrome extension icon (it's a duck!) in your toolbar to launch the developer tool!

Coming soon!
