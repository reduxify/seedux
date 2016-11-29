
//requiring the action creators: objects held in an arry
// var {answerActions}  = require('./reduxifyActionExtractorFixtures.js');

// requiring React component name and prop names
// var {answerUI} = require('./reduxifyUIExtractorFixtures.js');

// requiring the combined reducers
// var {answerReducers}  = require('./reduxifyReducerExtractorFixtures.js');


/*VISUAL DATA*/

var answerActions = [
  {
    name: 'addTodo',
    type: 'ADD_TODO'
  },
  {
    name: 'setVisibilityFilter',
    type: 'SET_VISIBILITY_FILTER'
  },
  {
    name: 'toggleTodo',
    type: 'TOGGLE_TODO'
  },
  {
    name: 'undoAction',
    type: 'UNDO'
  },
  {
    name: 'redoAction',
    type: 'REDO'
  }
];


var answerUI = [
  {
    name: 'TestTodoList',
    propNames: ['todos', 'onTodoClick']
  }
];

var answerReducers = [
  {
    name: 'visibilityFilter',
    cases: ['SET_VISIBILITY_FILTER']
  },
  {
    name: 'todos',
    cases: ['ADD_TODO', 'TOGGLE_TODO']
  }
];

var JSONanswerActions = JSON.stringify(answerActions);

var JSONanswerUI = JSON.stringify(answerUI);


var JSONanswerReducers = JSON.stringify(answerReducers);

module.exports = JSONanswerActions, JSONanswerUI,JSONanswerReducers

