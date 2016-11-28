/* global chrome */
import { diff } from '../../public/deep-diff.min.js'
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

var some_element = document;

const dispatchLogger = ({ getState }) => {
    return (next) => (action) => {
      console.log('Patching: ', action);
      const oldState = getState();

      // call next dispatch in middleware chain
      const modifiedAction = next(action);

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
      some_element.dispatchEvent(evt);
      // _reduxifyHistory.push(newHistoryEntry);

      return modifiedAction;
    }
}

export default dispatchLogger;

// export const _reduxifyHistory = [];
