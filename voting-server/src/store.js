import {createStore} from 'redux';
import reducer from './reducer';

export default function makeStore(){
	return createStore(reducer);
}

//the integration between REDUX & our code only comes in by letting the redux STORE know about the generic reducer ( redux ONLY needs to know about the (1) or more variables inside of the REDUX store)s
//
//
//since, the app in this case is going to act as a server for a separate browser application, the clients need to communicate with the server (& vice versa )