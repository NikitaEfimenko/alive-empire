import React, {Fragment, Component} from 'react'
import './Chat.css'
import { Container, Input, Button } from 'reactstrap'


const Message = ({message}) => {
	return(
	<Container className='d-flex'>
		<Container className='icon'>
			<img width='30px' height='30px' src={message.url}/>
			<p> {`${message.name}`} </p>	
		</Container>
		<Container className='message'>
			<p> {`${message.text}`} </p>
		</Container>
	</Container>
	)
}

export class Chat extends Component {
	state = {
		value: '' 
	}
	handle = event => {
		if (event.keyCode == 13){
			this.setState({
				value:event.target.value
			})
			event.target.value = ''
		}
	}
	
	render(){
		return (
				<Container className='chat w-100'>
					<Container className='textarea'>
						{this.props.messages.map((message, id) =>  <Message key={id} message={{...message, text:this.state.value}}/>)}
					</Container>
					<Container className='input'>
						<Input onKeyDown={this.handle} onChange={this.handleOnChange}/>
					</Container>
				</Container>
			)
		}
}

Chat.defaultProps = {
	messages: []
}

