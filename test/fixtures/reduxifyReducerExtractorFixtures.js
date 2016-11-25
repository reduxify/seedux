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

function reduxifyCombineReducersLogic(reducers) {
  let reduxifyObj = {};
  let coerceToStr = '';
    for (let k in reducers) {
      reduxifyObj[k] = reducers[k] + coerceToStr;
    }
  return JSON.stringify(reduxifyObj);
}

const testReducers = reduxifyCombineReducersLogic({ visibilityFilter, todos });

const answerReducers = [
  {
    name: 'visibilityFilter',
    cases: ['SET_VISIBILITY_FILTER']
  },
  {
    name: 'todos',
    cases: ['ADD_TODO', 'TOGGLE_TODO']
  }
]

module.exports = { testReducers, answerReducers };
