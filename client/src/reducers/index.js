import {
	SELECT_RACE,
	SELECT_NAME,
	SET_POPULATION_SIZE,
	POST_MESSAGE,
	NEW_PLAYERS,
	ADD_SOCKET,
	LOGIN,
	LOGOUT,
	SHOW_STATISTICS
} from '../constants'

const initState = {
	race: 'red',
	messages: {},
	message: "let's start",
	isLogin: false,
	statistics: [0,0,0]
}

const rootReducer = (state = initState, action) => {
	switch(action.type){
		case SELECT_NAME:
			return {
				...state,
				name: action.payload
			}
		case SHOW_STATISTICS:
			return {
				...state,
				statistics: action.payload
			}
		case LOGIN:
			return{
				...state,
				isLogin: true
			}
		case LOGOUT:
			return{
				...state,
				isLogin: false
			}
		case SELECT_RACE:
			return {
				...state,
				race: action.payload
			}
		case NEW_PLAYERS:
			return {
				...state,
				players: action.payload
			}
		case SET_POPULATION_SIZE:
			return {
				...state,
				population: action.payload
			}
		case POST_MESSAGE:
			return {
				...state,
				message: action.payload
			}
		case ADD_SOCKET:
			return {
				...state,
				socket: action.payload
			}
		
		case 'SHOW_MESSAGE':
			const {race, message} = action.payload
			const messages = { ...state.messages } 
			messages[race] = message
			return{
				...state,
				messages: messages
			}
		default:
			return state
	}
}


export {
	rootReducer
}