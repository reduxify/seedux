import { diff } from '../../deep-diff.js';
/**
* Calls the next dispatch method in the middleware chain, attaches undo and redo event listeners to the application, and creates a custom event object containing aggregate information of the application's old and new state.
*
* @param {Object} dispatch is a function that lets you dispatch actions in order to change the state of the application.
*
* @param {Object} getState is a function that returns the current state of the Redux store.
*
* @returns {Object} modifiedAction is an object with keys of the original action, a modified action, the new state and any differences between the old state and new state.
*/[

let listenerFlag = false;

const dispatch]Logger = ({ dispatch, getState }) => {
    return (next) => (action) => {
      // console.log('Patching: ', action);
      const oldState = getState();

      const modifiedAction = next(action);

      if (listenerFlag === false) {
        // console.log('Attaching dispatchLogger listeners...');
        listenerFlag = true;
        document.addEventListener('seeduxUndo', function(e){
          // console.log('dispatchLogger Listener heard undo event: ', e);
          next({
            type: 'seedux_UNDO',
          });
        }, false);
        document.addEventListener('seeduxRedo', function(e){
          // console.log('dispatchLogger Listener heard redo event: ', e);
          next({
              type: 'seedux_REDO',
            });
        }, false);
      }

      const newState = getState();
      // console.log('Modified Action:', modifiedAction);
      // console.log('New state after action dispatched: ', newState);
      const diffs = diff(oldState, newState);
      // console.log('Diffs: ', diffs);
      const newHistoryEntry = {
        originalAction: action,
        modifiedAction,
        newState,
        diffs
      };
      var evt = document.createEvent('CustomEvent');
      evt.initCustomEvent('actionDispatched', true, true, newHistoryEntry);
      // console.log('Dispatching event: ', evt);
      document.dispatchEvent(evt);
      return modifiedAction;
    }
};

export default dispatchLogger;