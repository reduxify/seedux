/* global document */
import { diff } from '../../deep-diff.js';
/**
* Creates a new log entry containing: {
* originalAction: action received by middleware from 'earlier' middlewares.
* modifiedAction: action after being processed by 'later' middlewares.
* newState: entire store objects before and after
*   action is passed downstream, respectively.
* diffs: diff object representing modifications made to state by this action
* }
*
* @param {Object} dispatch is a function that sends actions to the reducers
* in order to change the state of the application.
*
* @param {Object} getState is a function that returns the current state of the Redux store.
*
* @returns {Object} modifiedAction is an object representing the action after it
* has passed through downstream middleware
*/

let listenerFlag = false;

const dispatchLogger = ({ getState }) => (next) => (action) => {
  /*
  * @param {Object} next is the 'next' middleware's dispatch function.
  *
  * @param {Object} action is the action received from the 'previous' middleware.
  */
  // console.log('Patching: ', action);
  const oldState = getState();

  // call next middleware's dispatch
  const modifiedAction = next(action);

  // our 'action creator' listens for custom DOM events and dispatches actions
  // to our higher order reducer, which handles undo/redo.
  if (listenerFlag === false) {
    // console.log('Attaching dispatchLogger listeners...');
    listenerFlag = true;
    document.addEventListener('seeduxUndo', () => {
      // console.log('dispatchLogger Listener heard undo event: ', e);
      next({
        type: 'seedux_UNDO',
      });
    }, false);
    document.addEventListener('seeduxRedo', () => {
      // console.log('dispatchLogger Listener heard redo event: ', e);
      next({
        type: 'seedux_REDOmm',
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
    diffs,
  };
  const evt = document.createEvent('CustomEvent');
  evt.initCustomEvent('actionDispatched', true, true, newHistoryEntry);
  // console.log('Dispatching event: ', evt);
  document.dispatchEvent(evt);
  return modifiedAction;
};

export default dispatchLogger;
