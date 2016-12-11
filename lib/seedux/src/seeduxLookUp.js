let d3LookUpTable = {};

function populateLookUpTable(codeObj) {
  // codeObj = { actionCreators, actionTypes, reducers, ui }
  addActionCreatorsToLookupTable(codeObj.actionCreators, codeObj.actionTypes);
  addReducersToLookupTable(codeObj.reducers, codeObj.actionTypes);
  addUIToLookUpTable(codeObj.ui, codeObj.uiResources);
  return d3LookUpTable;
}

function addUIToLookUpTable(ui, uiResources) {
  const uiNameNodes = ui.children;
  if (uiResources) {
    uiNameNodes.forEach(node => {
      let props = Object.keys(uiResources[node]);
      props.forEach(prop => {
        let d3LookUpTableKeys = Object.keys(d3LookUpTable);
        let potentialActionTypeOrStateKey = uiResources[node][prop];
        if (d3LookUpTableKeys.includes(potentialActionTypeOrStateKey)) {
          d3LookUpTable[potentialActionTypeOrStateKey].push(prop);
          if (!d3LookUpTable[potentialActionTypeOrStateKey].includes('Containers')) { d3LookUpTable[potentialActionTypeOrStateKey].push('Containers'); }
        }
        if (!d3LookUpTableKeys.includes(potentialActionTypeOrStateKey)) {
          d3LookUpTable[potentialActionTypeOrStateKey] ? d3LookUpTable[potentialActionTypeOrStateKey].push(prop) : d3LookUpTable[potentialActionTypeOrStateKey] = [prop];
          if (!d3LookUpTable[potentialActionTypeOrStateKey].includes('Containers')) { d3LookUpTable[potentialActionTypeOrStateKey].push('Containers'); }
        }
      })
    })
  }
  return d3LookUpTable;
}

function addReducersToLookupTable(reducers, actionTypes = []) {
  const reducerNameNodes = reducers.children;
  if (actionTypes.length) {
    actionTypes.forEach(a => {
      if (!d3LookUpTable[a]) { d3LookUpTable[a] = []; };
      reducerNameNodes.forEach(node => {
        if (node.children.includes(a)) { 
          d3LookUpTable[a].push(node.name);
          if (!d3LookUpTable[a].includes('Reducers')) { d3LookUpTable[a].push('Reducers'); }
        }
      });
    });
  }
  return d3LookUpTable;
}

function addActionCreatorsToLookupTable(actionCreators, actionTypes = []) {
  const actionCreatorNameNodes = actionCreators.children;
  if (actionTypes.length) {
    actionTypes.forEach(a => {
      if (!d3LookUpTable[a]) { d3LookUpTable[a] = []; };
      actionCreatorNameNodes.forEach(node => {
        if (node.children.includes(a)) {
          d3LookUpTable[a].push(node.name);
          if (!d3LookUpTable[a].includes('Action Creators')) { d3LookUpTable[a].push('Action Creators'); }
        }
      });
    });
  }
  return d3LookUpTable;
}

// resetLookUpTable is used purely for testing purposes to assure d3LookUpTable does not persist data between tests

function resetLookUpTable() {
  return d3LookUpTable = {};
}

module.exports = { populateLookUpTable, addActionCreatorsToLookupTable, addReducersToLookupTable, resetLookUpTable };
