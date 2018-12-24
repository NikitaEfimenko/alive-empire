import React, { Fragment } from 'react'
import './GameBar.css'
import { Input, Container, Button } from 'reactstrap'
import { connect } from 'react-redux'
import {
	Message, ChatInput
} from '../../components'
import { click1 } from '../../music'
import { Link } from 'react-router-dom'
import Text from './config'
import { joke } from '../../actions'

const BigIcon = ({onClick, url, to}) => {
	return (
		<Link to ={to}>
			<img width='120px' onClick={onClick} height='120px' className='kok' src={url}/>
		</Link>
	)
}


const GameBar = ({ url, text, ...props}) => {
	const handle = (joke) => () => {
		click1()
		joke()
	}
	return (
		<Container fluid className='game-bar_container'>
			<div className='game-bar-hero'>
				<BigIcon onClick={handle(props.joke)} url={url} to='/'/>
 				<Message time={5000} placement='top' text={text}/>
 			</div>
			<ChatInput/>
		</Container>
	)
}

const mapStateToProps = state => {
	return {
		text: state.message
	}
}

const mapDispatchToProps = dispatch => {
	return {
		joke: () => dispatch(joke())
	}
}

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(GameBar)

export {
	ConnectedComponent as GameBar
}

