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

const counter = (state = 0, action) => {
  action.type === 'INCREMENT' ? state + 1 : state;
  action.type === 'DECREMENT' ? state - 1 : state;
}

const stack = (state = [], action) => {
  action.type === 'PUSH' ? [...state, action.value] : state;
  action.type === 'UNSHIFT' ? [action.value, ...state] : state;
}

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

// Simulates code injected into Redux's native combineReducers function

function reduxifyCombineReducersLogic(reducers) {
  let reduxifyObj = {};
  let coerceToStr = '';
    for (let k in reducers) {
      reduxifyObj[k] = reducers[k] + coerceToStr;
    }
  return reduxifyObj;
}

const testReducers = reduxifyCombineReducersLogic({ visibilityFilter, todos });
const testReducers2 = reduxifyCombineReducersLogic({ counter, stack });
const testReducers3 = reduxifyCombineReducersLogic({ counter2, stack2 });

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

module.exports = { testReducers, testReducers2, testReducers3, answerReducers, answerReducers2, answerReducers3 };
