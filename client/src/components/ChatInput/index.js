import React from 'react'
import './ChatInput.css'
import { connect } from 'react-redux'
import { postMessage, sendMessage } from '../../actions'
import {
	Input
} from 'reactstrap'

const ChatInput = ({postMessage, socket, sendMessage}) => {
	const handle = event => {
		if (event.keyCode == 13){
			postMessage(event.target.value)
			sendMessage(socket, event.target.value)
			event.target.value = ''
		}
	}
	return (
		<Input className='w-50' placeholder='ЧАТ' onKeyDown={handle}/>
	)
}

const mapStateToProps = state => {
	return {
		socket: state.socket
	}
}

const mapDispatchToProps = dispatch => {
	return {
		postMessage: message => dispatch(postMessage(message)),
		sendMessage: (socket, message) => dispatch(sendMessage(socket, message))
	}
}

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(ChatInput)

export {
	ConnectedComponent as ChatInput
}