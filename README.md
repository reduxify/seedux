<div align='center'>
  <img src='http://i63.tinypic.com/11j9e83.png' alt='Seedux Logo'>
</div>

# Description
A Chrome developer tool that provides a new tab that actively logs and visualizes the Redux data flow, enabling easier, faster debugging of any React-Redux implementation.

# Features
- Time travel functionality for your Redux store.
- Persistent log of every action dispatched, resulting store diffs, and complete new store.
- Configurable visualization of actionCreators, reducers, and ui props if using react-redux.
- Illumination of relevant actionsCreators and reducers upon action dispatch.
- Settings menu to customize view.
- Ability to dispatch actions with custom payloads
- Import/Export and Stash/Unstash complete store logs from disk or localStorage, respectively.

# How to Install

### NPM Module (recommended)

Seedux can be easily installed as a developer dependency with npm using your favorite terminal.

```javascript
npm install seedux --save-dev
```

### Development Version

For a codebase suitable for modification, clone our git repository to an easily accessible file path on your computer and run the build:

```javascript
cd seedux_repo_path
npm run build:both
```

## Getting Started:

Import `createStore`, `combineReducers`, `bindActionCreators`, and `connect` from Seedux, rather than Redux. The examples below assume you are working with the npm module. If you are working from the git repo, replace 'seedux' with your repo path!

```javascript
// import { createStore } from 'redux';
import { createStore } from 'seedux';
```

```javascript
// import { combineReducers } from 'redux';
import { combineReducers } from 'seedux';

```

```javascript
// import { bindActionCreators } from 'redux';
import { bindActionCreators } from 'seedux';
```

```javascript
// import { connect } from 'react-redux';
import { connect } from 'seedux';
```

Import `dispatchLogger` from Seedux and apply it as middleware when invoking createStore.

Import and call `seeduxInit`. Pass `seeduxInit` your newly created store.

```javascript
import { dispatchLogger, seeduxInit } from 'seedux';

const store = createStore(combinedReducer, preloadedState, applyMiddleware(dispatchLogger));
seeduxInit(store);
```

Navigate to chrome://extensions

Click 'load as an unpacked extension' and select ```seedux_repo_path + 'seedux/seeduxChrome'```

Open your redux app in the browser. 

Click on the seeduxChrome extension icon to launch the dev tool!

## Complete Example Integration

The following import examples are for the npm package. Replace <'seedux'> with your Seedux repo filepath to use the development version.

### Import dispatchLogger from Seedux and replace Redux's <a href='http://redux.js.org/docs/api/createStore.html'>createStore</a> function with Seedux's version. Invoke createStore as normal with applyMiddleware(dispatchLogger) as the third argument.

```
    import React from 'react';
    import { render } from 'react-dom';
    import { Provider } from 'react-redux';
    import { applyMiddleware } from 'redux';
    import { createStore, dispatchLogger } from 'seedux';
    import { combinedReducer } from './reducers';
    import App from './components/App';

    const preloadedState = {};

    const store = createStore(combinedReducer, preloadedState, applyMiddleware(dispatchLogger));

    render(
      <Provider store = { store }>
        <App />
      </Provider>,
      document.getElementById('app')
    );
```

### Replace Redux's <a href='http://redux.js.org/docs/api/combineReducers.html'>combineReducers</a> function with Seedux's version and invoke it with arguments as normal:

```
    // import { combineReducers } from 'redux';
    import { combineReducers } from 'seedux';
    import reducer1 from './reducer1';
    import reducer2 from './reducer2';

    const combinedReducer = combineReducers({
      reducer1: reducer1,
      reducer2: reducer2
    })

    export default combinedReducer;
```

### Replace Redux's <a href='http://redux.js.org/docs/api/bindActionCreators.html'>bindActionCreators</a> function with Seedux's version and invoke it with arguments as normal:

```
    // import { bindActionCreators } from 'redux';
    import { bindActionCreators } from 'seedux';
    import * as allActionCreators from './actions';

    const boundActionCreators = bindActionCreators(allActionCreators, dispatch);
```

### Replace React-Redux's <a href='https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options'>connect</a> function with Seedux's version and invoke it with arguments as normal:

```
    // import { connect } from 'react-redux';
    import { connect } from 'seedux';
    import { myComponent } from './components/myComponent';

    const container = connect()(myComponent);
```
