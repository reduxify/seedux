let d3Table = {};

function populateTable(codeObj) {
  // codeObj = { actionCreators, actionTypes, reducers, ui }
  addActionCreatorsToTable(codeObj.actionCreators, codeObj.actionTypes);
  addReducersToTable(codeObj.reducers, codeObj.actionTypes);
  addUIToTable(codeObj.ui, codeObj.uiResources);
  return d3Table;
}

function addUIToTable(ui, uiResources) {
  const uiNameNodes = ui.children;
  if (uiResources) {
    uiNameNodes.forEach(node => {
      // console.log('uiResources', uiResources)
      // console.log('nameNode', node)
      let name = uiResources[node.name];
      let props = Object.keys(name);
      // console.log('props', props)
      props.forEach(prop => {
        let d3TableKeys = Object.keys(d3Table);
        let potentialActionTypeOrStateKey = name[prop];
        if (d3TableKeys.includes(potentialActionTypeOrStateKey)) {
          d3Table[potentialActionTypeOrStateKey].push(prop);
          if (!d3Table[potentialActionTypeOrStateKey].includes(name)) { d3Table[potentialActionTypeOrStateKey].push(node.name); }
          if (!d3Table[potentialActionTypeOrStateKey].includes('Containers')) { d3Table[potentialActionTypeOrStateKey].push('Containers'); }
        }
        if (!d3TableKeys.includes(potentialActionTypeOrStateKey)) {
          d3Table[potentialActionTypeOrStateKey] ? d3Table[potentialActionTypeOrStateKey].push(prop) : d3Table[potentialActionTypeOrStateKey] = [prop];
          if (!d3Table[potentialActionTypeOrStateKey].includes(name)) { d3Table[potentialActionTypeOrStateKey].push(node.name); }
          if (!d3Table[potentialActionTypeOrStateKey].includes('Containers')) { d3Table[potentialActionTypeOrStateKey].push('Containers'); }
        }
      })
    })
  }
  console.log('d3Table', d3Table)
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
