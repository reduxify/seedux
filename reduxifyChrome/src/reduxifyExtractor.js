function reduxifyExtractor(data) {
  let UI, reducers, actionCreators;

  // Switch statement uses case identifier to determine data assignment to the proper variable.
  // Once UI, reducers, and actionCreators variables are populated, the graph skeleton is ready for generation.

  switch (data[0]) {
    case 'UI':
      UI = data.slice(1);
        if (UI && reducers && actionCreators) {
          return initGraph();
        }
      break;
    case 'REDUCERS':
      reducers = data.slice(1);
        if (UI && reducers && actionCreators) {
          return initGraph();
        }
      break;
    case 'REDUCERS_OBJECT':
      reducers = data[1];
        if (UI && reducers && actionCreators) {
          return initGraph();
        }
      break;
    case 'ACTION_CREATORS':
      actionCreators = data.slice(1);
        if (UI && reducers && actionCreators) {
          return initGraph();
        }
      break;  
    case 'ACTION_CREATORS_OBJECT':
      actionCreators = data[1];
        if (UI && reducers && actionCreators) {
          return initGraph();
        }
      break;
  }

  // Instantiate a new instance of the reduxifyGraphFoundation class and call its structureFoundation method.

  function initGraph() {
    let graph = new reduxifyGraphFoundation(UI, reducers, actionCreators);
    graph.structureFoundation();
  }

}

class reduxifyGraphFoundation {
  constructor(UI, reducers, actionCreators) {
    this.UI = UI,
    this.reducers = reducers,
    this.actionCreators = actionCreators
    this.structureFoundation = this.structureFoundation.bind(this)
  }

// structureFoundation method currently supports the following params: @reducers: Object and @actionCreators: Object.

  structureFoundation() {
    let structuredUI = [];
    let structuredReducers = []; 
    let structuredActionCreators = [];
    let structuredGraphFoundation;

    // TO-DO UI parsing and structuring

    // Parses reducer function definitions for switch statement cases. 
    // Pushes object containing @name: String and @cases: String[] to @structuredReducers: Array.

    let reducersKeys = Object.keys(this.reducers);
    let reducersCases = reducersKeys.forEach(key => {
      let cases = JSON.stringify(this.reducers[key]).match(/case\s[a-z'"]*:$/gi);
      structuredReducers.push({ name: key, cases });
    });

    // Parses actionCreators function definitions for type properties on returned payloads. 
    // Pushes object containing @name: String and @type: String to @structuredActionCreators: Array.

    let actionCreatorsKeys = Object.keys(this.actionCreators);
    let actionCreatorsTypes = actionCreatorsKeys.forEach(key => {
      let type = JSON.stringify(this.actionCreators[key]).match(/type:\s[a-z'"]*,$/gi);
      structuredActionCreators.push({ name: key, type });
    });
  }

}