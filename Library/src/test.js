var { reduxify } = require('./reduxifyExtractor.js');

function postComments(state=[], action){
	switch(action.type){
		case 'ADD_COMMENT':
			return [...state,  {
				user: action.author,
				text: action.comment
			}];
		case 'REMOVE_COMMENT':
			return [
			//from start to where we want to delet
				...state.slice(0, action.i),
				//after deletd one, to the end
				...state.slice(action.i + 1)
			]
		default:
			return state;
	}
	return state;
}
// console.log(postComments.toString());

// console.log(JSON.stringify(postComments));
console.log(reduxify.ReducerExtractor(postComments.toString()));