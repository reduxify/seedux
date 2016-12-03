// Todo: Enable handling of actionCreators returning multiple payloads with different types

const addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    id: nextTodoId++,
    text
  }
}

const setVisibilityFilter = (filter) => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  }
}

const toggleTodo = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id
  }
}

const undoAction = () => {
  return {
    type: 'UNDO'
  }
}

const redoAction = () => {
  return {
    type: 'REDO'
  }
}

// Simulates code injected into Redux's native bindActionCreators function

function reduxifybindActionCreatorsLogic(actionCreators, dispatch) {
  let reduxifyObj = {};
  let coerceToStr = '';
    for (let k in actionCreators) {
      reduxifyObj[k] = actionCreators[k] + coerceToStr;
    }
  return reduxifyObj;
}

const testActionCreators = reduxifybindActionCreatorsLogic({addTodo, setVisibilityFilter, toggleTodo, undoAction, redoAction});

const answerActionCreators = {
  'name': 'Action Creators',
  'children': [
    {
      'name': 'addTodo',
      'children': [
        {
          'name': 'ADD_TODO'
        }
      ]
    },
    {
      'name': 'setVisibilityFilter',
      'children': [
        {
          'name': 'SET_VISIBILITY_FILTER'
        }
      ]
    },
    {
      'name': 'toggleTodo',
      'children': [
        {
          'name': 'TOGGLE_TODO'
        }
      ]
    },
    {
      'name': 'undoAction',
      'children': [
        {
          'name': 'UNDO'
        }
      ]
    },
    {
      'name': 'redoAction',
      'children': [
        {
          'name': 'REDO'
        }
      ]
    }
  ]
}

module.exports = { testActionCreators, answerActionCreators };
