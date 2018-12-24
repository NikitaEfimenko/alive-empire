import {
	SELECT_RACE,
	SELECT_NAME,
	SET_POPULATION_SIZE,
	POST_MESSAGE,
	NEW_PLAYERS,
	ADD_SOCKET,
	LOGIN,
	LOGOUT,
	SHOW_STATISTICS,
	JOKE,
	IRONY
} from '../constants'

const initState = {
	race: 'red',
	messages: {},
	message: "let's start",
	isLogin: false,
	statistics: [0,0,0]
}

const phrases = [
	"предатель!!!", 
	"да,да брось нас в самый важный момент...", 
	"трусливая букашка!!!",
	"От меня и то 'БОЛЬШЕ' толку",
	"Одноклеточное!!!"
	]
const phrase = [
	"Серьезно?! ты не можешь закрыть окно? А хочешь победить в 'бесконечной войне'?=)))",
	"Ну и глуповат ты...=)",
	"Молодец!!! ты это сделал!!!"
]

const rootReducer = (state = initState, action) => {
	switch(action.type){
		case SELECT_NAME:
			return {
				...state,
				name: action.payload
			}
		case JOKE:
			return {
				...state,
				message: phrases[Math.floor(Math.random() * phrases.length)]
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
		case IRONY:{
			return {
				...state,
				message: !state.isLogin ? phrase[Math.floor(Math.random() * phrase.length)]: state.message
			}
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