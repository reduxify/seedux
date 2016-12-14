let d3Table = {};

function populateTable(codeObj) {
  addActionCreatorsToTable(codeObj.actionCreators, codeObj.actionTypes);
  addReducersToTable(codeObj.reducers, codeObj.actionTypes);
  addUIToTable(codeObj.ui, codeObj.uiResources, codeObj.actionMap);
  let d3TableKeys = Object.keys(d3Table);
  d3TableKeys.forEach(key => { d3Table[key].push('APP'); })
  return d3Table;
}

function addUIToTable(ui, uiResources, actionMap) {
  const uiNameNodes = ui.children; // Array of container node objects
  let d3TableKeys = Object.keys(d3Table);
  if (uiResources) { // Object with structure -> { container: { prop: [state or action creators] } }
    uiNameNodes.forEach(node => {
      let name = uiResources[node.name]; // Look through container keys and uiResources
      let props = Object.keys(name); // Props of container in format -> { prop: [state or action creators] }
      props.forEach(prop => {
        let potentialActionCreatorOrStateArr = name[prop]; // Array of action creators or state keys
        potentialActionCreatorOrStateArr.forEach(p => {
          if (actionMap[p]) {
            let actionType = actionMap[p];
            d3Table[actionType] ? d3Table[actionType].push(prop) : d3Table[actionType] = [prop];
            if (!d3Table[actionType].includes(name)) { d3Table[actionType].push(node.name); }
            if (!d3Table[actionType].includes('Containers')) { d3Table[actionType].push('Containers'); }
          }
          else {
            let stateKey = p; 
            d3TableKeys.includes(stateKey) ? d3Table[stateKey].push(prop) : d3Table[stateKey] = [prop]; 
            if (!d3Table[stateKey].includes(name)) { d3Table[stateKey].push(node.name); }
            if (!d3Table[stateKey].includes('Containers')) { d3Table[stateKey].push('Containers'); }
          }
        });
      })
    })
  }
  return d3Table;
}

function addReducersToTable(reducers, actionTypes = []) {
  const reducerNameNodes = reducers.children;
  if (actionTypes.length) {
    actionTypes.forEach(a => {
      if (!d3Table[a]) { d3Table[a] = []; };
      reducerNameNodes.forEach(node => {
        if (node.children.length) { 
          node.children.forEach(childNode => {
            if (childNode.name === a) {
              d3Table[a].push(node.name);
              if (!d3Table[a].includes('Reducers')) { d3Table[a].push('Reducers'); }
            }
          })
        }
      });
    });
  }
  return d3Table;
}

function addActionCreatorsToTable(actionCreators, actionTypes = []) {
  const actionCreatorNameNodes = actionCreators.children;
  if (actionTypes.length) {
    actionTypes.forEach(a => {
      if (!d3Table[a]) { d3Table[a] = []; };
      actionCreatorNameNodes.forEach(node => {
        if (node.children.length) {
          node.children.forEach(childNode => {
            if (childNode.name === a) {
              d3Table[a].push(node.name);
              if (!d3Table[a].includes('Action Creators')) { d3Table[a].push('Action Creators'); }
            }
          })
        }
      });
    });
  }
  return d3Table;
}

// resetTable is used purely for testing purposes to assure d3Table does not persist data between tests

function resetTable() {
  return d3Table = {};
}

module.exports = { populateTable, addActionCreatorsToTable, addReducersToTable, addUIToTable, resetTable };
