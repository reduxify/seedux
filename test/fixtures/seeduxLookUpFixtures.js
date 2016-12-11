const testActionCreators = {
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

const testReducers = {
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

const testActionTypes1 = ['ADD_TODO', 'SET_VISIBILITY_FILTER', 'TOGGLE_TODO', 'UNDO', 'REDO'];
const testActionTypes2 = ['SET_VISIBILITY_FILTER', 'ADD_TODO', 'TOGGLE_TODO'];

const testUI = {
  'name': 'Containers',
  'children': [
		{
      'name': 'WebpackTestTodoList',
      'children': [
        {
          'name': 'todos'
        },
				{
					'name': 'onTodoClick'
				}
      ]
    }
  ]
};

const testUIResources = { 
  WebpackTestTodoList: 
  { 
    todos: [ 'todos' ], 
    onTodoClick: [ 'toggleTodo' ] 
  } 
};

const answerActionCreators = {
  'ADD_TODO': ['addTodo', 'Action Creators'],
  'SET_VISIBILITY_FILTER': ['setVisibilityFilter', 'Action Creators'],
  'TOGGLE_TODO': ['toggleTodo', 'Action Creators'],
  'UNDO': ['undoAction', 'Action Creators'],
  'REDO': ['redoAction', 'Action Creators']
}

const answerReducers = {
  'SET_VISIBILITY_FILTER': ['visibilityFilter', 'Reducers'],
  'ADD_TODO': ['todos', 'Reducers'],
  'TOGGLE_TODO': ['todos', 'Reducers']
}

// const answerUI;

module.exports = { testActionCreators, testReducers, testUI, testUIResources, testActionTypes1, testActionTypes2, answerActionCreators, answerReducers };