import React, {Component}  from 'react'
import './Modal.css'
import {
	Container
} from 'reactstrap'
import {
	click2
} from '../../music'
import { Link, withRouter } from 'react-router-dom'
import {
	compose, withHoverAnimation, withPressAnimation
} from '../../libs'
import { connect } from 'react-redux'
import {
	irony,
} from '../../actions'

const Cross = ({handler}) => <p className='modal-cross' onClick={handler}>
					 		X 
						</p>

const JokedCross = compose(withHoverAnimation)(Cross)

class Modal extends Component {
	handler = () => {	
		click2()
		this.props.joke()
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
					{this.props.isLogin ? <Cross handler={this.handler} />: <JokedCross handler={this.handler} />}
					{ children }
				</Container>
			</div>
			)
	}
}
const mapStateToProps = state => {
	return {
		isLogin : state.isLogin
	}
}

const mapDispatchToProps = dispatch => {
	return {
		joke: () => dispatch(irony())
	}
}


const RoutedModal = withRouter(connect(mapStateToProps,mapDispatchToProps)(Modal))

export {
	RoutedModal as Modal
}

