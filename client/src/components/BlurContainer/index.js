import React from 'react'
import './BlurContainer.css'
const blur = (kernel) => {
	return {
		filter:`blur(${kernel}px)`
	}
}

export const BlurContainer = props => 
	<div className='blur-container' style={ props.is ? blur(props.kernel) : {}}>
		{props.children}
	</div>

BlurContainer.defaultProps = {
	kernel: 3
}