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

const answerActions = [
  {
    name: 'ADD_TODO'
  },
  {
    name: 'SET_VISIBILITY_FILTER'
  },
  {
    name: 'TOGGLE_TODO'
  },
  {
    name: 'UNDO'
  },
  {
    name: 'REDO'
  }
]

const testActionCreators = { addTodo, setVisibilityFilter, toggleTodo, redoAction };

module.exports = { testActionCreators, answerActions };