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

// TODO: Handle nested propTypes
// Simulates code injected into React-Redux's native Connect function

function reduxifyConnectLogic(WrappedComponent) {
  const UI = WrappedComponent.name;
  const props = Object.keys(WrappedComponent.propTypes);
  return [UI, props];
}

const testUI = reduxifyConnectLogic(TestTodoList);

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
    }
  ]
}

module.exports = { testUI, answerUI };
