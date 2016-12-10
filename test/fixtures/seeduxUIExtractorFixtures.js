const { React, PropTypes } = require('react');
const _react = {};
_react.PropTypes = PropTypes;

	var WebpackTestTodoList = function WebpackTestTodoList(_ref) {
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

const mapStateToPropsTestTodoList = (state) => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  }
}

const mapDispatchToPropsTestTodoList = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id));
    }
  }
}

// Browserified TodoList:

	var BrowserifyTestTodoList = function BrowserifyTestTodoList(_ref) {
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

// Simulates code injected into React-Redux's native Connect function

function seeduxReactReduxConnectLogic(mapStateToProps, mapDispatchToProps) {
  let mappedStateString, mappedDispatchString;
	if (!mapStateToProps && !mapDispatchToProps) { 
		mappedStateString = 'function defaultMapStateToProps(state){return{};}'; 
		mappedDispatchString = 'function defaultMapDispatchToProps(dispatch){return{dispatch:dispatch};}';
	}

  else if (mapStateToProps && !mapDispatchToProps) {
		mappedStateString = mapStateToProps.toString();
		mappedDispatchString = 'function defaultMapDispatchToProps(dispatch){return{dispatch:dispatch};}';
	}

	else if (!mapStateToProps && mapDispatchToProps) {
		mappedStateString = 'function defaultMapStateToProps(state){return{};}';
		mappedDispatchString = mapStateToProps.toString();
	}

	else if (mapStateToProps === 'test' && mapDispatchToProps) {
    mappedStateString = 'function defaultMapStateToProps(state){return{};}'; 
		mappedDispatchString = mapDispatchToProps.toString();
	}

	else {
		mappedStateString = mapStateToProps;
		mappedDispatchString = mapDispatchToProps;
	}

  let mappedPropsString = `${mappedStateString}${mappedDispatchString}`;

  return function wrapWithConnect(WrappedComponent) {

  const UI = WrappedComponent.name; 
	console.log('Initial obj for extractor passed...', {[UI]: mappedPropsString})
  return {[UI]: mappedPropsString};
	}
}

const webpackTestUI1 = seeduxReactReduxConnectLogic(mapStateToPropsTestTodoList, mapDispatchToPropsTestTodoList)(WebpackTestTodoList);
const webpackTestUI2 = seeduxReactReduxConnectLogic()(WebpackTestTodoList);
const webpackTestUI3 = seeduxReactReduxConnectLogic(mapStateToPropsTestTodoList)(WebpackTestTodoList)
const webpackTestUI4 = seeduxReactReduxConnectLogic('test', mapDispatchToPropsTestTodoList)(WebpackTestTodoList)
const browserifyTestUI1 = seeduxReactReduxConnectLogic(mapStateToPropsTestTodoList, mapDispatchToPropsTestTodoList)(BrowserifyTestTodoList);

const answerUI1 = {
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
}

const answerUI2 = {
  'name': 'Containers',
  'children': [
		{
      'name': 'WebpackTestTodoList',
		}
	]
}

const answerUI3 = {
  'name': 'Containers',
  'children': [
		{
      'name': 'WebpackTestTodoList',
      'children': [
        {
          'name': 'todos'
        }
      ]
    }
  ]
}

const answerUI4 = {
  'name': 'Containers',
  'children': [
		{
      'name': 'WebpackTestTodoList',
      'children': [
				{
					'name': 'onTodoClick'
				}
      ]
    }
  ]
}

const answerUI5 = {
  'name': 'Containers',
  'children': [
		{
			'name': 'BrowserifyTestTodoList',
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

module.exports = { webpackTestUI1, webpackTestUI2, webpackTestUI3, webpackTestUI4, browserifyTestUI1, WebpackTestTodoList, BrowserifyTestTodoList, answerUI1, answerUI2, answerUI2, answerUI3, answerUI4, answerUI5 };
