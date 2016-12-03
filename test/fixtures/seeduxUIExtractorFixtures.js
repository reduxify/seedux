const { React, PropTypes } = require('react');

	var TestTodoList = function TestTodoList(_ref) {
	  var _ref$todos = _ref.todos,
	      todos = _ref$todos === undefined ? [] : _ref$todos,
	      onTodoClick = _ref.onTodoClick;
	  return React.createElement(
	    'ul',
	    null,
	    todos.map(function (todo) {
	      return React.createElement(Todo, _extends({
	        key: todo.id
	      }, todo, {
	        onClick: function onClick() {
	          return onTodoClick(todo.id);
	        }
	      }));
	    })
	  );
	};

	TestTodoList.propTypes = {
	  todos: PropTypes.arrayOf(PropTypes.shape({
	    id: PropTypes.number.isRequired,
	    completed: PropTypes.bool.isRequired,
	    text: PropTypes.string.isRequired
	  }).isRequired).isRequired,
	  onTodoClick: PropTypes.func.isRequired
	};

	var TestTodoList2 = function TestTodoList2(_ref) {
	  var _ref$todos = _ref.todos,
	      todos = _ref$todos === undefined ? [] : _ref$todos,
	      onTodoClick = _ref.onTodoClick;
	  return React.createElement(
	    'ul',
	    null,
	    todos.map(function (todo) {
	      return React.createElement(Todo, _extends({
	        key: todo.id
	      }, todo, {
	        onClick: function onClick() {
	          return onTodoClick(todo.id);
	        }
	      }));
	    })
	  );
	};

// TODO: Handle nested propTypes
// Simulates code injected into React-Redux's native Connect function

function seeduxConnectLogic(WrappedComponent) {
  const UI = WrappedComponent.name;
	if (WrappedComponent.propTypes) {
		const props = Object.keys(WrappedComponent.propTypes);
    return [UI, props];
	}
	else { 
		const coerceToString = '';
		const stringifiedUIDefinition = WrappedComponent + coerceToString;
		return {[UI]: stringifiedUIDefinition};
	}
}

const testUI = seeduxConnectLogic(TestTodoList);
const testUI2 = seeduxConnectLogic(TestTodoList2);

const answerUI = {
  'name': 'Containers',
  'children': [
		{
      'name': 'TestTodoList',
      'children': [
        {
          'name': 'todos'
        },
				{
					'name': 'onTodoClick'
				}
      ]
    },
    {
      'name': 'TestTodoList2',
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
}

module.exports = { testUI, testUI2, TestTodoList, TestTodoList2, answerUI };
