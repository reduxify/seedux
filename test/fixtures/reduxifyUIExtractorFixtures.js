const React = require('react');

const TestTodoList = ({ todos = [], onTodoClick }) => (
  <ul>
    {todos.map(todo => 
      <Todo
        key = {todo.id}
        {...todo}
        onClick = {() => onTodoClick(todo.id)}
      />
    )}
  </ul>
)

TestTodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,
  onTodoClick: PropTypes.func.isRequired
}

function reduxifyConnectLogic(WrappedComponent) {
  let reduxifyObj = {};
  let coerceToStr = '';
  reduxifyObj[WrappedComponent + coerceToStr] = WrappedComponent.propTypes + coerceToStr;
  return JSON.stringify(reduxifyObj);
}

const testUI = reduxifyConnectLogic(TestTodoList);

const answerUI = [
  {
    name: 'TestTodoList',
    propTypes: ['todos', 'id', 'completed', 'text', 'onTodoClick']
  }
]

module.exports = { testUI, answerUI };
