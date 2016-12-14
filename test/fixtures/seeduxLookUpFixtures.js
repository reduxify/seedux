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

// testActionTypes1 corresponds with testReducers

const testActionTypes1 = ['SET_VISIBILITY_FILTER', 'ADD_TODO', 'TOGGLE_TODO'];

// testActionTypes2 corresponds with testActionCreators

const testActionTypes2 = ['ADD_TODO', 'SET_VISIBILITY_FILTER', 'TOGGLE_TODO', 'UNDO', 'REDO'];

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
    todos: [ 'todos', 'visibilityFilter' ], 
    onTodoClick: [ 'toggleTodo' ] 
  } 
};

const testActionMap = { 
  toggleTodo: 'TOGGLE_TODO'
}

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

const answerUI = {
  'TOGGLE_TODO': ['onTodoClick', 'WebpackTestTodoList', 'Containers'],
  'todos': ['todos', 'WebpackTestTodoList', 'Containers'],
  'visibilityFilter': ['todos', 'WebpackTestTodoList', 'Containers']
}

const testCodeObj = {
  actionCreators: testActionCreators,
  actionTypes: testActionTypes2,
  reducers: testReducers,
  ui: testUI,
  uiResources: testUIResources,
  actionMap: testActionMap
}

const answerTable = {
  'ADD_TODO': ['addTodo', 'Action Creators', 'todos', 'Reducers', 'APP'],
  'SET_VISIBILITY_FILTER': ['setVisibilityFilter', 'Action Creators', 'visibilityFilter', 'Reducers', 'APP'],
  'TOGGLE_TODO': ['toggleTodo', 'Action Creators', 'todos', 'Reducers', 'onTodoClick', 'WebpackTestTodoList', 'Containers', 'APP'],
  'UNDO': ['undoAction', 'Action Creators', 'APP'],
  'REDO': ['redoAction', 'Action Creators', 'APP'],
  'todos': ['todos', 'WebpackTestTodoList', 'Containers', 'APP'],
  'visibilityFilter': ['todos', 'WebpackTestTodoList', 'Containers', 'APP']
}

module.exports = { testActionCreators, testReducers, testUI, testUIResources, testActionMap, testActionTypes1, testActionTypes2, answerActionCreators, answerReducers, answerUI, answerTable, testCodeObj };