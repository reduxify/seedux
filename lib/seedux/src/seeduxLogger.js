/**
* Global Chrome Extension:
* Turns an array that consists of the name and the propNames of the container passed into seedux.uiExtractor,
* which occurs on invocation of the Connect function from our library's version of React-Redux, into a hierarchical
* tree object ready for rendering as a D3 visualization.
*
* @param {Array} ui is an array whose values are name (value: string) and
* propNames (value: string[]).
*
* @returns {Object} headNode is a hierarchical tree object whose nodes are objects
* with keys of name (value: string) and children (value: string[], optional).
*
*/

import { diff } from '../../deep-diff.js'


let listenerFlag = false;

const dispatchLogger = ({ dispatch, getState }) => {
    return (next) => (action) => {
      console.log('Patching: ', action);
      const oldState = getState();

      // call next dispatch in middleware chain
      const modifiedAction = next(action);

      // our 'action dispatcher'
      if (listenerFlag === false) {
        console.log('Attaching dispatchLogger listeners...');
        listenerFlag = true;
        document.addEventListener('seeduxUndo', function(e){
          console.log('dispatchLogger Listener heard undo event: ', e);
          next({
            type: 'seedux_UNDO',
          });
        }, false);
        document.addEventListener('seeduxRedo', function(e){
          console.log('dispatchLogger Listener heard redo event: ', e);
          next({
              type: 'seedux_REDO',
            });
        }, false);
      }

      const newState = getState();
      console.log('Modified Action:', modifiedAction);
      console.log('New state after action dispatched: ', newState);
      const diffs = diff(oldState, newState);
      console.log('Diffs: ', diffs);
      const newHistoryEntry = {
        originalAction: action,
        modifiedAction,
        newState,
        diffs
      };
      // document.ourCoolKey = newHistoryEntry;
      var evt = document.createEvent('CustomEvent');
      evt.initCustomEvent('actionDispatched', true, true, newHistoryEntry);
      console.log('Dispatching event: ', evt);
      document.dispatchEvent(evt);
      // _seeduxHistory.push(newHistoryEntry);

      return modifiedAction;
    }
}

export default dispatchLogger;

// export const _seeduxHistory = [];
