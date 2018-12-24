const express = require('express')
const socket = require('socket.io')
const Engine = require('./engine')



  const alive1 = x => x >= 1

  const rules1 = (prev, res, alive) => {
     if (alive(prev)){
      if (res > 2 && res < 3 ){
        return res*0.1 + prev
      }
      else {
        return 0.5*prev
      }
    }
    else{
        return (res > 1 && res < 4)
    }
}

  const alive3 = x => x == 1

  const rules3 = (prev, res, alive) => {
    if (alive(prev)){
      if (res == 2 || res == 3 ){
        return 1
      }
      else {
        return 0
      }
    }
    else{
        return (res == 3)
    }
  }

  const alive2 = x => x >= 1

  const rules2 = (prev, res, alive) => {
    	if (alive(prev)){
      if (res == 2 || res == 3 ){
        return 1
      }
      else {
        return 0
      }
    }
    else{
        return (res == 3)
    }
  }



const rules = [{name:'blue',alive:alive3, rules:rules3}, {name:'red',alive:alive3, rules:rules3}, {name:'green',alive:alive3, rules:rules3}]


const engine = Engine(80, 60)
rules.forEach(engine.addConfig)

const app = express()

app.use(express.static(__dirname + '/client/build'))

const server = app.listen(process.env.PORT || 5000)

const io = socket(server)

let players = {}

io.sockets.on('connection', socket => {
	//console.log(`connection - ${socket.id}`)
	setInterval(() => {
		io.sockets.emit('render', engine.get())
		engine.epoch()
		io.sockets.emit('statistics', engine.Statistics())
	}, 80)
	socket.on('send-login-info', data => {
		players[socket.id] = data
		io.sockets.emit('new-players', players)
	})
	socket.on('send-message', message =>  {
		const config = {
			message: message,
			race: players[socket.id]['race']
		}
		socket.broadcast.emit('response-message', config)
	})
	socket.on('send-mouse-position', (config) => {
		const state = players[socket.id]
		const fullState =  { 
			...state,  
			...config,
		}
		players[socket.id] = fullState
		engine.drawing(fullState)
	})
	socket.on('disconnect', () => {
	//	console.log(`disconnect -  ${socket.id}`)
		delete players[socket.id]
	//	console.log(players)
	})
})


console.log(`create server on ${process.env.PORT || 5000}`)