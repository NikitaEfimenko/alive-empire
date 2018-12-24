import React, { Fragment, Component } from 'react'
import { Input, Container } from 'reactstrap'
import './LoginForm.css'
import { connect } from 'react-redux'
import { selectName } from '../../actions'

const LoginForm  = ({selectName}) => {
	const handle = event => {
		if (event.keyCode == 13){
			selectName(event.target.value)
			event.target.value = ''
		}
	}
	return (
			<Container>
				<p className='text-center'> Бактериальное прозвище: </p>
				<Input  onKeyDown={handle} placeholder="Имя"/>
			</Container>
		)
	}

const mapDispatchToProps = (dispatch) => {
	return {
		selectName: (name) => dispatch(selectName(name)) 
	}
}

const ConnectedComponent = connect(null, mapDispatchToProps)(LoginForm)

export{
	ConnectedComponent as LoginForm
}
