/* global document */
import { diff } from 'deep-diff';
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

  // our 'inline action creator' listens for custom DOM events and dispatches actions
  // to our higher order reducer, which handles restoring the state.
  if (listenerFlag === false) {
    // console.log('Attaching dispatchLogger listeners...');
    listenerFlag = true;
    document.addEventListener('seeduxRestore', (e) => {
      // console.log('dispatchLogger Listener heard restore event: ', e);
      next({
        type: 'seedux_RESTORE',
        restoreState: e.detail.restoreState,
      });
    }, false);
  }

  const newState = getState();
  // console.log('Modified Action:', modifiedAction);
  // console.log('New state after action dispatched: ', newState);

  // this imported diff function returns undefined if no diffs are found,
  // so we need to potentially assign an empty array instead to keep the shape
  // of our HistoryEntries consistent
  const diffs = diff(oldState, newState) || [];
  // console.log('improved diffs: ', diffs);
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
