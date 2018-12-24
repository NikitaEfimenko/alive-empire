import React, { createRef, Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { Button, Container } from 'reactstrap'
import io from 'socket.io-client'
import { Route, withRouter, Switch } from 'react-router-dom'
import {Howl, Howler} from 'howler'
import './Game.css'
import {
  Chat,
  Statistics,
  GameBar
} from './modules'
import { 
  BlurContainer,
} from './components'

import {
  InitModal,
  AboutModal
} from './containers'

import { 
  initSocket,
  sendLoginInfo,
  login,
  sendMousePosition
} from './actions'


import Engine from './engine'
import './animate.css'

const sounds = [
  'music/Polyphia G.O.A.T. (Official Music Video).mp3',
  'music/Polyphia – O.D..mp3',
  'music/Polyphia - Crush.mp3'
]

const Music = (sounds) => {
  let id = 0;
  const count = sounds.length
  const howlers = sounds.map(x => new Howl({
    src:x,
    volume:0.9,
    onend: function(){
      id = (id + 1) % count
      howlers[id].play()
    }
  }))
  const play = () => howlers[0].play()
  return {
    play
  }
}

Music(sounds).play()

const description = {
  blue:'Хоть и некрасивые, но очень милые создания. Очень быстрые 0.00000000001231412 см/год и это не предел!',
  red:'Выглядят как болванчики, но это обман. Нет они и впрямь очень глупые, но очень сильные. Осторожно!!! (Второе имя "Тупикус Коляндриусис"',
  green:"Очень стесняются общаться в обществе, полные интроверты, но плодятся как кролики (привет всем стесняшкам)"
}

const iconUrls = ['./icon1.png','./icon2.png','./icon3.png']
const iconObj = {blue:'./icon1.png',red:'./icon2.png',green:'./icon3.png'}
const shadow = {'blue':{r:100,g:100,b:255},'red':{r:255,g:100,b:100},'green':{r:5,g:100,b:5}}
const urls = ['./hero1.png', './hero.png', './hero2.png', './waterbear.png']
const images = urls.map( url => new Image())
images.forEach((img, id) => img.src = urls[id])

const rules = [{name:'blue',image: images[0],shadow:shadow['blue']}, {name:'red', image:images[1],shadow:shadow['red']}, {name:'green', image:images[2],shadow:shadow['green']}]

const configs = {
  urls: iconUrls,
  descriptions: description
}


class Game extends Component {
state = {
  statistics: [],
}
constructor(props){
   super(props)
   this._canvas = createRef()
   this.engine = null
}
componentDidMount(){
  this.init()
  this.socket = io()
  this.props.initSocket(this.socket, this.engine)
  window.addEventListener('resize', this.init)
}
init = () => {
  this.resize()
  this.engine = Engine(this._canvas.current)
  rules.forEach(this.engine.addConfig)
  this.change()
  this.engine.onMouse((x,y) => this.props.sendMousePosition(this.socket, x, y))
}

resize = () => {
  const parent = this._canvas.current.parentElement;
  this._canvas.current.width = parent.clientWidth
  this._canvas.current.height = parent.clientHeight
}

login = () => {
  this.change()
  this.props.Login()
  this.props.sendLoginInfo(this.socket, this.props.config)
}

change = () => {
  this.engine.use(this.props.race)
}

  render(){
    const { statistics } = this.state
    const  color = shadow[this.props.race]
    return (
      <Fragment>
        <Switch>
          <Route exact path='/' render={ () => {
            return <InitModal isLogin = {this.props.isLogin} login = {this.login} configs = {configs} />
            }}/>
          <Route path='/about' component={AboutModal}/>
        </Switch>
        <BlurContainer  kernel={14} is={!this.props.isLogin}>
          <div  className='h-100 w-100 background tools'>
            <canvas  ref={this._canvas}/>
            <Statistics color={`rgb(${color.r},${color.g},${color.b}`}  value={100}  list={this.props.stats}/>
            <Container className='d-flex'>
              <GameBar  url={iconObj[this.props.race]} />
            </Container>
          </div>
        </BlurContainer>
      </Fragment>
    )
  }
}


/*
*/
//Вернуть и очень много работы с engine


//  <Statistics color={`rgb(${color.r},${color.g},${color.b}`}  value={statistics[this.props.race]} list={statistics} urls = {iconUrls}/>
// <Button  color='danger' onClick={this.toggle()}> on </Button>

const mapStateToProps = state => {
  return {
    isLogin: state.isLogin,
    race: state.race,
    config: {
      race: state.race,
      name: state.name
    },
    stats:[
      {race:'blue', url: iconUrls[0], score: state.statistics[0]},
      {race:'red', url: iconUrls[1], score: state.statistics[1]},
      {race:'green', url: iconUrls[2], score: state.statistics[2]}
    ]
  }
}

const mapDispatchToProps = dispatch => {
  return {
    initSocket: (socket, engine) => dispatch(initSocket(socket, engine)),
    Login: () => dispatch(login()),
    sendMousePosition: (socket, x, y) => dispatch(sendMousePosition(socket, x, y)),
    sendLoginInfo: (socket, config) => dispatch(sendLoginInfo(socket, config)),
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Game))

