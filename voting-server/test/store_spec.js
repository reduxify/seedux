import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import makeStore from '../src/store';

describe('store', () => {
	it('should exist as a Redux store w/ the current reducer', () => {
		const store = makeStore();
		expect(store.getState()).to.equal(Map());

		store.dispatch({
			type: 'SET_ENTRIES',
			entries: ['Trainspotting', '28 Days Later']
		});
		expect(store.getState()).to.equal(fromJS({
			entries: ['Trainspotting', '28 Days Later']
		}));
	});
});// end of Store


//if you have objects inside arrays or arrays
//inside objects and want them too to be immutable, use Immutable.fromJS.
//http://stackoverflow.com/questions/33312922/what-is-the-difference-between-immutablejs-map-and-fromjs
//
//After the redux store is initialized, you dispatch actions to the store, which will intrenally use the reducer to apply the actions to the current store and store the resulting NEXT state