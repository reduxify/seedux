// testReducers: switch statements

const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter
    default:
      return state;
  }
}

const todo = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      }
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      }
      return Object.assign({}, state, {
        completed: !state.completed
      })
    
    default:
      return state;
  }
}

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ]
    case 'TOGGLE_TODO': 
      return state.map(t => {
        return todo(t, action)
      })
      
    default:
      return state;
  }
}

// testReducers2: ternary statements

const counter = (state = 0, action) => {
  action.type === 'INCREMENT' ? state + 1 : state;
  action.type === 'DECREMENT' ? state - 1 : state;
}

const stack = (state = [], action) => {
  action.type === 'PUSH' ? [...state, action.value] : state;
  action.type === 'UNSHIFT' ? [action.value, ...state] : state;
}

// testReducers3: conditional statements

const counter2 = (state = 0, action) => {
  if (action.type === 'INCREMENT') {
    return state++;
  }
  else if (action.type === 'DECREMENT') {
    return state--;
  }
  else {
    return state;
  }
}

const stack2 = (state = [], action) => {
  if (action.type === 'PUSH') {
    return [...state, action.value];
  }
  else if (action.type === 'UNSHIFT') {
    return [action.value, ...state];
  }
  else {
    return state;
  }
}

// testReducers4: switch statements and constants object

const constants = {
  SET_VISIBILITY_FILTER: 'SET_VISIBILITY_FILTER',
  ADD_TODO: 'ADD_TODO',
  TOGGLE_TODO: 'TOGGLE_TODO',
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  PUSH: 'PUSH',
  UNSHIFT: 'UNSHIFT'
}

const visibilityFilter2 = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case constants.SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state;
  }
}

const todo2 = (state = {}, action) => {
  switch (action.type) {
    case constants.ADD_TODO:
      return {
        id: action.id,
        text: action.text,
        completed: false
      }
    case constants.TOGGLE_TODO:
      if (state.id !== action.id) {
        return state;
      }
      return Object.assign({}, state, {
        completed: !state.completed
      })
    
    default:
      return state;
  }
}

const todos2 = (state = [], action) => {
  switch (action.type) {
    case constants.ADD_TODO:
      return [
        ...state,
        todo(undefined, action)
      ]
    case constants.TOGGLE_TODO: 
      return state.map(t => {
        return todo(t, action)
      })
      
    default:
      return state;
  }
}

// testReducers5: ternary statements and constants object

const counter3 = (state = 0, action) => {
  action.type === constants.INCREMENT ? state + 1 : state;
  action.type === constants.DECREMENT ? state - 1 : state;
}

const stack3 = (state = [], action) => {
  action.type === constants.PUSH ? [...state, action.value] : state;
  action.type === constants.UNSHIFT ? [action.value, ...state] : state;
}

// testReducers6: conditional statements and constants object

const counter4 = (state = 0, action) => {
  if (action.type === constants.INCREMENT) {
    return state++;
  }
  else if (action.type === constants.DECREMENT) {
    return state--;
  }
  else {
    return state;
  }
}

const stack4 = (state = [], action) => {
  if (action.type === constants.PUSH) {
    return [...state, action.value];
  }
  else if (action.type === constants.UNSHIFT) {
    return [action.value, ...state];
  }
  else {
    return state;
  }
}

// Simulates code injected into Redux's native combineReducers function

function seeduxCombineReducersLogic(reducers) {
  var reducerKeys = Object.keys(reducers)
  
  let seeduxObj = {};
  
  if (reducers) {
      reducerKeys.forEach(key => {
        if (reducers[key]) {
          let reducerName = reducers[key].name;
          let reducerDef = reducers[key].toString();
          seeduxObj[reducerName] = reducerDef;
        }
      });
  }

  return seeduxObj;
}

const testReducers = seeduxCombineReducersLogic({ visibilityFilterState: visibilityFilter, todosState: todos });
const testReducers2 = seeduxCombineReducersLogic({ counter, stack });
const testReducers3 = seeduxCombineReducersLogic({ counter2, stack2 });
const testReducers4 = seeduxCombineReducersLogic({ visibilityFilter2, todos2 });
const testReducers5 = seeduxCombineReducersLogic({ counter3, stack3 });
const testReducers6 = seeduxCombineReducersLogic({ counter4, stack4 });

const answerReducers = {
  'name': 'Reducers',
  'children': [
      {
        'name': 'visibilityFilter',
        'children': [
          {
            'name': 'SET_VISIBILITY_FILTER'
          }
        ]
      },
      {
        'name': 'todos',
        'children': [
          {
            'name': 'ADD_TODO'
          },
          {
            'name': 'TOGGLE_TODO'
          }
        ]
      }
  ]
}

const answerReducers2 = {
  'name': 'Reducers',
  'children': [
    {
      'name': 'counter',
      'children': [
        {
          'name': 'INCREMENT'
        },
        {
          'name': 'DECREMENT'
        }
      ]
    },
    {
      'name': 'stack',
      'children': [
        {
          'name': 'PUSH'
        },
        {
          'name': 'UNSHIFT'
        }
      ]
    }
  ]
}

const answerReducers3 = {
  'name': 'Reducers',
  'children': [
    {
      'name': 'counter2',
      'children': [
        {
          'name': 'INCREMENT'
        },
        {
          'name': 'DECREMENT'
        }
      ]
    },
    {
      'name': 'stack2',
      'children': [
        {
          'name': 'PUSH'
        },
        {
          'name': 'UNSHIFT'
        }
      ]
    }
  ]
}

const answerReducers4 = {
  'name': 'Reducers',
  'children': [
      {
        'name': 'visibilityFilter2',
        'children': [
          {
            'name': 'SET_VISIBILITY_FILTER'
          }
        ]
      },
      {
        'name': 'todos2',
        'children': [
          {
            'name': 'ADD_TODO'
          },
          {
            'name': 'TOGGLE_TODO'
          }
        ]
      }
  ]
}

const answerReducers5 = {
  'name': 'Reducers',
  'children': [
    {
      'name': 'counter3',
      'children': [
        {
          'name': 'INCREMENT'
        },
        {
          'name': 'DECREMENT'
        }
      ]
    },
    {
      'name': 'stack3',
      'children': [
        {
          'name': 'PUSH'
        },
        {
          'name': 'UNSHIFT'
        }
      ]
    }
  ]
}

const answerReducers6 = {
  'name': 'Reducers',
  'children': [
    {
      'name': 'counter4',
      'children': [
        {
          'name': 'INCREMENT'
        },
        {
          'name': 'DECREMENT'
        }
      ]
    },
    {
      'name': 'stack4',
      'children': [
        {
          'name': 'PUSH'
        },
        {
          'name': 'UNSHIFT'
        }
      ]
    }
  ]
}

module.exports = { testReducers, testReducers2, testReducers3, testReducers4, testReducers5, testReducers6, answerReducers, answerReducers2, answerReducers3, answerReducers4, answerReducers5, answerReducers6 };
