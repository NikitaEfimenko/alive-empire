import React, { Fragment } from 'react'
import './GameBar.css'
import { Input, Container, Button } from 'reactstrap'
import { connect } from 'react-redux'
import {
	Message, ChatInput
} from '../../components'
import { click1 } from '../../music'
import { Link } from 'react-router-dom'

const BigIcon = ({onClick, url, to}) => {
	return (
		<Link to ={to}>
			<img width='120px' height='120px'  onClick={onClick} className='kok' src={url}/>
		</Link>
	)
}

const GameBar = ({ url, text}) => {
	return (
		<Container fluid className='game-bar_container'>
			<div className='game-bar-hero'>
				<BigIcon onClick={click1} url={url} to='/'/>
 				<Message  placement='top' text={text}/>
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

const ConnectedComponent = connect(mapStateToProps)(GameBar)

export {
	ConnectedComponent as GameBar
}

