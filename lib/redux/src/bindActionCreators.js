import { actionCreatorsExtractor } from './../../seedux/src/seeduxExtractor';

function bindActionCreator(actionCreator, dispatch) {
  return (...args) => dispatch(actionCreator(...args))
}

/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass a single function as the first argument,
 * and get a function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */

export default function bindActionCreators(actionCreators, dispatch) {
  // seedux for typeof actionCreators === 'function'
  let seeduxObj = {};
  if (typeof actionCreators === 'function') {
    seeduxObj[actionCreators.name] = actionCreators.toString();
    actionCreatorsExtractor(seeduxObj);
    return bindActionCreator(actionCreators, dispatch)
  }
  // seedux end

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error(
      `bindActionCreators expected an object or a function, instead received ${actionCreators === null ? 'null' : typeof actionCreators}. ` +
      `Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?`
    )
  }

  var keys = Object.keys(actionCreators)
  var boundActionCreators = {}
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i]
    var actionCreator = actionCreators[key]
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch)
    }
  }

  // seedux for typeof actionCreators === 'object'
  if (keys.length) {
    keys.forEach(ac => {
      if (actionCreators[ac]) { seeduxObj[ac] = actionCreators[ac].toString(); };
    });
  }
 actionCreatorsExtractor(seeduxObj);
 // seedux end

  return boundActionCreators
}
