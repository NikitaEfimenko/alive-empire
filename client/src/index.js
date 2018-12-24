import React from 'react';
import { render } from 'react-dom';
import Game from './Game';
import { rootReducer } from './reducers'
import { Provider } from 'react-redux'
import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk' 
import { BrowserRouter as Router } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.css'


const ReduxDevtoolsExtension = ( window.__REDUX_DEVTOOLS_EXTENSION__ ) ? window.__REDUX_DEVTOOLS_EXTENSION__() : noop => noop


const store = createStore(rootReducer,
	compose(
		applyMiddleware(thunk),
		ReduxDevtoolsExtension
	)
)

store.dispatch({type:'INIT'})

render(
<Provider store={store}>
	<Router>
		<Game />
	</Router>
</Provider>, 
document.getElementById('root'));