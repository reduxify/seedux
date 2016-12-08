import dispatchLogger from './seedux/src/seeduxLogger';
import createStore from './redux/src/createStore'
import combineReducers from './redux/src/combineReducers'
import bindActionCreators from './redux/src/bindActionCreators'
import applyMiddleware from './redux/src/applyMiddleware'
import compose from './redux/src/compose'
import warning from './redux/src/utils/warning'
import Provider from './react-redux/src/components/Provider'
import connect from './react-redux/src/components/connect'
/*
* This is a dummy function to check if the function name has been altered by minification.
* If the function has been minified and NODE_ENV !== 'production', warn the user.
*/
function isCrushed() {}

if (
  typeof process !== 'undefined' &&
  process.env.NODE_ENV !== 'production' &&
  typeof isCrushed.name === 'string' &&
  isCrushed.name !== 'isCrushed'
) {
  warning(
    'You are currently using minified code outside of NODE_ENV === \'production\'. ' +
    'This means that you are running a slower development build of Redux. ' +
    'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' +
    'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' +
    'to ensure you have the correct code for your production build.'
  )
}
function seeduxInit(store) {
  store.dispatch({type: 'SEEDUX_INIT'});
  document.addEventListener('dispatchAction', (e) => {
    // console.log('dispatchLogger Listener heard new action event: ', e);
    store.dispatch(e.detail.action);
  }, false);
}
export {
  seeduxInit,
  createStore,
  combineReducers,
  bindActionCreators,
  applyMiddleware,
  compose,
  Provider,
  connect,
  dispatchLogger
}
export default dispatchLogger;
