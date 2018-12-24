import React, {Component}  from 'react'
import './Modal.css'
import {
	Container
} from 'reactstrap'
import {
	click2
} from '../../music'
import { Link, withRouter } from 'react-router-dom'

class Modal extends Component {
	handler = () => {	
		click2()
		this.props.history.push(this.props.to)
		this.props.close()
	}
	keyClose = event => {
		if (event.keyCode == this.props.closeKey){
			this.handler()
		}
	}
	render(){
		const { children } = this.props
		return (  
			this.props.appear &&
			<div onKeyDown={this.keyClose} className='modal-layer'>
				<Container className='inner-modal-layer'>
						<p className='modal-cross' onClick={this.handler}>
					 		X 
						</p>
					{ children }
				</Container>
			</div>
			)
	}
}

const RoutedModal = withRouter(Modal)

export {
	RoutedModal as Modal
}

