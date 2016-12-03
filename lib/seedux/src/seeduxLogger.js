/* global chrome */
import { diff } from '../../deep-diff.js'
// const ACTION_TYPES = {
//   UNDO: "GLOBAL_UNDO",
//   REDO: "GLOBAL_REDO",
// };

// export const logEnhancers = (reducer) => {
//   const initState = {
//     past: [],
//     present: reducer(undefined, {}),
//     future: []
//   };
//   return function(state = initState, action) {
//     switch (action.type) {
//       case "UNDO"
//     }
//   }
// }
// initialize new event for our logger to dispatch

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
