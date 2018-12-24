import React, {Fragment} from 'react'
import { connect } from 'react-redux'
import {
  ClassSelector
} from '../../modules'
import { 
  Modal,
  LoginForm,
} from '../../components'
import {
  sendPlayerInfo
} from '../../actions'


const InitModal = ({isLogin, login, configs, ...props}) => {
  return (
		 <Modal appear={true}  close={login} to='/game' closeKey={13}>
          {!isLogin && <Fragment> 
                    <hr/>
                        <LoginForm/>
                    <hr/>
                  </Fragment>} 
          <p className='text-center'>Раса: {props.race} </p>
          <hr/>
          <ClassSelector description configs={configs}/>
          <hr/>
      </Modal>
	)
}

const mapStateToProps = (state) => {
	return {
		race: state.race
	}
}


const ConnectedComponent = connect(mapStateToProps)(InitModal)

export {
	ConnectedComponent as InitModal
}



