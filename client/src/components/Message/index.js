import React, {Fragment, Component, PureComponent} from 'react'
import './Message.css'
import {
	Container
} from 'reactstrap'


const stl = (position) =>  {
	const cls = (position === 'bottom') ? 'my_message-bottom': 'my_message-top'
	return cls
}

const Message = ({text, placement}) => {
	return(
		<div className={`my_message ${stl(placement)}`} >
			<p className='discription-text'>{text}</p>
		</div>
	)
}


class MessageContainer extends Component{
	state = {
		is:false
	}
	componentWillReceiveProps(nextProps){
		if (nextProps.children !== this.props.children){
			this.setState({is: true})
		}
	}
	componentDidUpdate(props, state){
			if (this.state.is){
				clearTimeout(this.id) 
				this.id = setTimeout(this.close, this.props.time)
			}
	}

	close = () => this.setState({is: false})

	render(){
		return(
			<Fragment>
				{this.state.is && this.props.children}
			</Fragment>
		)
	}
}

class MessageN extends PureComponent { 
	render(){
		const {text, placement} = this.props
		return(
			<MessageContainer time={this.props.time}>
				<Message text={text} placement={placement}/>
			</MessageContainer>
		)
	}
}

MessageN.defaultProps = {
	time: 4000
}

export {
	MessageN as Message
}