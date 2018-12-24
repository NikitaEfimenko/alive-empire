import React, {Fragment} from 'react'
import './Statistics.css'
import { Container } from 'reactstrap'
import { GameBar } from '../'
import { Message } from '../../components'
import { connect } from 'react-redux'
import { click1 } from '../../music'
import { Link } from 'react-router-dom'

const MiddleIcon = ({url, to}) => {
	return (
		<Link to={to}>
			<img width='50px' height='50px' src={url}/>
		</Link>
	)
}

const StatisticsItem = ({score, url, message}) => {
	return (
			<Container onClick={click1} className='statistic-item'>
				<MiddleIcon url={url} to='/'/>
				<p> {score} </p>
				<Message placement='bottom' text={message} />
			</Container>
	)
}


const StatisticsUnconnect = ({value, color,list, messages}) => {
	return (
		<Fragment>
			<ul className='statistics statistics-list'>
				{list.map((el, id) => <li key={id}> <StatisticsItem  message={messages[el.race]} score={el.score} url={el.url}/> </li>)}			
			</ul>
		</Fragment>
		)
}

//			<div className='game-bar' style={{height:value, background:color}}/> 

const mapStateToProps = state => {
	return {
		messages: state.messages,
	}
}

const Statistics = connect(mapStateToProps)(StatisticsUnconnect)

export {
	Statistics
}
