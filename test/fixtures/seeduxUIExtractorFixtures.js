const { React, PropTypes } = require('react');
const _react = {};
_react.PropTypes = PropTypes;

	var WebpackTestTodoList1 = function WebpackTestTodoList1(_ref) {
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

	WebpackTestTodoList1.propTypes = {
	  todos: PropTypes.arrayOf(PropTypes.shape({
	    id: PropTypes.number.isRequired,
	    completed: PropTypes.bool.isRequired,
	    text: PropTypes.string.isRequired
	  }).isRequired).isRequired,
	  onTodoClick: PropTypes.func.isRequired
	};

	var WebpackTestTodoList2 = function WebpackTestTodoList2(_ref) {
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

// Browserified TodoList:

	var BrowserifyTestTodoList1 = function BrowserifyTestTodoList1(_ref) {
  var _ref$todos = _ref.todos,
      todos = _ref$todos === undefined ? [] : _ref$todos,
      onTodoClick = _ref.onTodoClick;
  return _react2.default.createElement(
    'ul',
    null,
    todos.map(function (todo) {
      return _react2.default.createElement(_Todo2.default, _extends({
        key: todo.id
      }, todo, {
        onClick: function onClick() {
          return onTodoClick(todo.id);
        }
      }));
    })
  );
};

BrowserifyTestTodoList1.propTypes = {
  todos: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    id: _react.PropTypes.number.isRequired,
    completed: _react.PropTypes.bool.isRequired,
    text: _react.PropTypes.string.isRequired
  }).isRequired).isRequired,
  onTodoClick: _react.PropTypes.func.isRequired
};

	var BrowserifyTestTodoList2 = function BrowserifyTestTodoList2(_ref) {
  var _ref$todos = _ref.todos,
      todos = _ref$todos === undefined ? [] : _ref$todos,
      onTodoClick = _ref.onTodoClick;
  return _react2.default.createElement(
    'ul',
    null,
    todos.map(function (todo) {
      return _react2.default.createElement(_Todo2.default, _extends({
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

const webpackTestUI1 = seeduxConnectLogic(WebpackTestTodoList1);
const webpackTestUI2 = seeduxConnectLogic(WebpackTestTodoList2);
const browserifyTestUI1 = seeduxConnectLogic(BrowserifyTestTodoList1);
const browserifyTestUI2 = seeduxConnectLogic(BrowserifyTestTodoList2);

const answerUI = {
  'name': 'Containers',
  'children': [
		{
      'name': 'WebpackTestTodoList1',
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
      'name': 'WebpackTestTodoList2',
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
			'name': 'BrowserifyTestTodoList1',
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
			'name': 'BrowserifyTestTodoList2',
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

module.exports = { webpackTestUI1, webpackTestUI2, browserifyTestUI1, browserifyTestUI2, WebpackTestTodoList1, WebpackTestTodoList2, BrowserifyTestTodoList1, BrowserifyTestTodoList2, answerUI };
