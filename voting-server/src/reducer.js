import {setEntries, next, vote, INITIAL_STATE} from './core';
//actions

// {type: 'SET ENTRIES', entries: []}

// {type: 'NEXT'}

// {type: 'VOTE', entry: ""}

//reducer: a function that takes the state, and any kind of action and invokes the CORE function that matches teh action
//if the reducer is called w/ an UNDEFINED state, the reducer has to handle it
export default function reducer(state = INITIAL_STATE, action){
	switch(action.type){
		case 'SET_ENTRIES':
			return setEntries(state, action.entries);
		case 'NEXT':
			return next(state);
		case 'VOTE':
			return state.update('vote', voteState => vote(voteState, action.entry));
	}
	//if reducer doesn't recognize the action, it returns the same/current  state.
	return state;
}

//immutable's .update is useful to transform the result of the current value
