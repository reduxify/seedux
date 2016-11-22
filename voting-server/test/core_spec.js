import {List, Map} from 'immutable';
import {expect} from 'chai';

import {setEntries, next, vote} from '../src/core';

describe('application logic', () => {
	describe('set entries', () => {
		it('adds to the entries', () => {
			const state = Map();
			const entries = ['Trainspotting', '28 Days Later'];
			const nextState = setEntries(state, entries);
			expect(nextState).to.equal(Map({entries: List.of('Trainspotting', '28 Days Later')
		}));
		});
	});
//NEXT
	descibe('next', () => {
		it('takes the NEXT 2 entries under vote', () => {
			const state = Map({entries: List.of('Trainspotting', '28 Days Later', 'Sunshine')});
			const nextState = next(state);
			expect(nextState).to.equal(Map({
				vote: Map({
					pair: List.of('Trainspotting', '28 Days Later')
				}),
				entries: List.of('Sunshine')
			}));
		});
		it('should take winner and put it into entries', () => {
			const state = Map({
				vote: Map({
					pair: List.of('Trainspotting', '28 Days Later'),
					tally: Map({
						'Trainspotting': 4,
						'28 Days Later': 2
					})
				}),
				entries: List.of('Sunshine', 'Millions', '127 Hours')
			});
			const nextState = next(state);
			expect(nextState).to.equal(Map({
				vote: Map({
					pair: List.of('Sunshine', 'Millions')
				}),
					entries: List.of('127 Hours', 'Trainspotting')
			}));
		});
		it('if tied, next should put BOTH back', () => {
			const state = Map({
				vote: Map({
					pair: List.of('Trainspotting', '28 Days Later'),
					tally: Map({
						'Trainspotting': 4,
						'28 Days Later': 4
					})
				}),
				entries: List.of('Sunshine', 'Millions', '127 Hours')
			});
			const nextState = next(state);
			expect(nextState).to.equal(Map({
				vote: Map({
					pair: List.of('Sunshine', 'Millions')
				}),
				entries: List.of('127 Hours', 'Trainspotting', '28 Days Later')
			}));
		});
		it('returns winner when there is only 1 entry left', () => {
			const state = Map({
				vote: Map({
					pair: List.of('Trainspotting', '28 Days Later'),
					tally: Map({
						'Trainspotting': 4,
						'28 Days Later': 2
					})
				}),
				entries: List()
			});
			const nextState = next(state);
			expect(nextState).to.equal(Map({
				winner: 'Trainspotting'
			}));
		});
	}); //end of next

//VOTE
//shuld really only receive the relevant part of the state tree
	describe('vote', () => {
		it('creates a tally for the entry voted', () => {
			const state = Map({
					pair: List.of('Trainspotting', '28 Days Later')
				}),
			const nextState = vote(state, 'Trainspotting');
			expect(nextState).to.equal(Map({
					pair: List.of('Trainspotting', '28 Days Later'),
					tally: Map({
						'Trainspotting': 1
					})
			}));
		});

		it('should add 1 to the existing tally for the entry voted on', () => {
			const state = Map({
					pair: List.of('Trainspotting', '28 Days Later'),
					tally: Map({
						'Trainspotting': 3,
						'28 Days Later': 2,
					})
			});
			const nextState = vote(state, 'Trainspotting');
			expect(nextState).to.equal(Map({
					pair: List.of('Trainspotting', '28 Days Later'),
					tally: Map({
						'Trainspotting': 4,
						'28 Days Later': 2
					})
			}));
		});
	});// end of Vote


});// final one