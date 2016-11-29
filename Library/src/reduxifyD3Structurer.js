import { structuredUIArr, structuredActionCreatorsArr, structuredReducersArr } from './reduxifyExtractor';

/**
 * 
 * Functional Node constructor used to assemble hierarchical tree objects.
 * 
 */

function Node(name) {
  this.name = name;
}

/**
 * 
 * Turns an array that consists of objects containing the name and corresponding 
 * propNames of each container passed to our version of the react-redux's connect 
 * function into a hierarchical tree object ready for rendering as a D3 visualization.
 * 
 * @param {Array} parsedUI is an array whose values are objects with keys of 
 * name (value: string) and propNames (value: string[]).
 * 
 * @returns {Object} headNode is a hierarchical tree object whose nodes are objects
 * with keys of name (value: string) and children (value: string[], optional).
 * 
 */

const D3UIStructurer = (parsedUI) => {
  const headNode = new Node('Containers');
  headNode.children = [];
  parsedUI.forEach(container => {
    const containerNode = new Node(container.name);
      containerNode.children = [];
      headNode.children.push(containerNode);
        container.propNames.forEach(p => containerNode.children.push(new Node(p)));
  });
  return headNode;
}

/**
 * 
 * Turns an array that consists of objects containing the name and corresponding 
 * switch cases of each reducer passed to our version of the react-redux's combineReducers 
 * function into a hierarchical tree object ready for rendering as a D3 visualization.
 * 
 * @param {Array} parsedReducers is an array whose values are objects with keys of 
 * name (value: string) and cases (value: string[]).
 * 
 * @returns {Object} headNode is a hierarchical tree object whose nodes are objects
 * with keys of name (value: string) and children (value: string[], optional).
 * 
 */

const D3ReducerStructurer = (parsedReducers) => {
  const headNode = new Node('Reducers');
  headNode.children = [];
  parsedReducers.forEach(reducer => {
    const reducerNode = new Node(reducer.name);
      reducerNode.children = [];
      headNode.children.push(reducerNode);
        reducer.cases.forEach(c => reducerNode.children.push(new Node(c)));
  });
  return headNode;
}

/**
 * 
 * Turns an array that consists of objects containing the name and corresponding 
 * action types of each actionCreator passed to our version of the react-redux's bindActionCreators 
 * function into a hierarchical tree object ready for rendering as a D3 visualization.
 * 
 * @param {Array} parsedActionCreators is an array whose values are objects with keys of 
 * name (value: string) and type (value: string[]).
 * 
 * @returns {Object} headNode is a hierarchical tree object whose nodes are objects
 * with keys of name (value: string) and children (value: string[], optional).
 * 
 */

const D3ActionCreatorStructurer = (parsedActionCreators) => {
  const headNode = new Node('Action Creators');
  headNode.children = [];
  parsedActionCreators.forEach(actionCreator => {
    const actionCreatorNode = new Node(actionCreator.name);
      actionCreatorNode.children = [new Node(actionCreator.type)];
      headNode.children.push(actionCreatorNode);
  });
  return headNode;
}

module.exports = { D3UIStructurer, D3ReducerStructurer, D3ActionCreatorStructurer };
