import {
	SELECT_NAME,
	SELECT_RACE,
	SET_POPULATION_SIZE,
	POST_MESSAGE,
	NEW_PLAYERS,
	ADD_SOCKET,
	LOGIN,
	SHOW_STATISTICS
} from '../constants'

export const selectRace = (name) => {
	return {
		type:SELECT_RACE,
		payload: name
	}
}

export const login = () => {
	return {
		type:LOGIN,
	}
}



export const sendMessage = (socket, message) => {
	return dispatch => {
		socket.emit('send-message', message)
	}
}


export const postMessage = (message) => {
		return {
			type:POST_MESSAGE,
			payload: message
		}
}


export const selectName = (name) => {
	return {
		type:SELECT_NAME,
		payload: name
	}
}



const newPlayers = players => {
	return {
		type: NEW_PLAYERS,
		payload: players
	}
} 

const showMessage = (config) => {
	return {
		type:'SHOW_MESSAGE',
		payload: config
	}
}

const addSocket = socket => {
		return {
			type: ADD_SOCKET,
			payload: socket
		}
}

const showStatistics = statistics => {
	return {
		type: SHOW_STATISTICS,
		payload: statistics
	}
}

export const initSocket = (socket, engine) => {
		return dispatch => {
			socket.on('new-players', players => {
					dispatch(newPlayers(players))
			})
			socket.on('response-message', config => {
					dispatch(showMessage(config))
			})
			dispatch(addSocket(socket))
			
			socket.on('render', world => {
				engine.set(world)
				engine.paint()
			})
			socket.on('statistics', statistics => {
				dispatch(showStatistics(statistics))
			})
		}
}


//client-server async action

export const sendLoginInfo = (socket, config) => {
	return dispatch => {
			socket.emit('send-login-info', config)
	}
}

export const sendMousePosition = (socket, x, y) => {
	return dispatch => {
		const config = {
			x: x,
			y: y
		}
		socket.emit('send-mouse-position', config)
	}
}

//server-client async action




 

