import * as redux from './redux/dist/redux';
import * as reactRedux from './react-redux/dist/react-redux';
import dispatchLogger from './reduxify/src/reduxifyLogger';

const bundledAPIs = {};

// Object.assign(bundledAPIs, redux, reactRedux);
const aShim = dispatchLogger;
bundledAPIs.dispatchLogger = aShim;
console.log(bundledAPIs);

export { bundledAPIs };
