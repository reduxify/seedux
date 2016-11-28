# reduxifyChrome
Chrome extension feature

# Instructions
### in index.js for app:
    import dispatchLogger from './reduxify'
    const store = createStore(reducer, {}, applyMiddleware(dispatchLogger));
