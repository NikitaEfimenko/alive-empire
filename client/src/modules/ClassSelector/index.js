import React, { Fragment, Component } from 'react'
import {Container, Input, Label } from 'reactstrap'
import './ClassSelector.css'
import { connect } from 'react-redux'
import {
	selectRace
} from '../../actions'
import {
	click1
} from '../../music'


const HeroCard = ({ url, onClick, selected}) => {
	const Selected = selected ? 'heroes_selected': 'heroes'
	return(
			<i onClick={onClick} className={Selected}>
				<img width='100px' height='100px' src={url}/>
			</i>
	)
}

const raceName = ['blue','red', 'green']

//здесь имена надо сделать
const  ClassSelector =  (props) => {
	const choice = (id) => () => {
		click1()
		props.selectRace(raceName[id])
	}
		const { configs, description } = props
		const { urls, descriptions } = configs
		return (
			<Container className='class-selector'>
				<Container className='class-selector__classes'>
					{ urls.map((url, id) => <HeroCard onClick={choice(id)} selected={raceName[id] === props.race} key={id} url={url}/>)}
				</Container>
				{ description &&
					<Container className='class-selector__description'>
						<p className='discription-text description'>{descriptions[props.race]}</p>
					</Container>
				}
			</Container>
		)
}

const mapStateToProps = (state) => {
	return {
		race: state.race
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
			selectRace: (name) =>  dispatch(selectRace(name))
	}
}

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(ClassSelector)

export {
	ConnectedComponent as ClassSelector
}