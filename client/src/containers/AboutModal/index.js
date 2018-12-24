import React, {Fragment} from 'react'
import { 
  Modal
} from '../../components'
import './AboutModal.css'

const text = '"В современном мире каждый выживает как может, но никто даже не догадывается какая война происходит у наших ног, рук, в наших кружках, на дверных ручах общественных мест. Эта кровавая война может идти бесконечно и только ты сможешь это исправить..."'

export const AboutModal = () => {
  return (
		 <Modal appear={true} to='/game' close={(x)=>x} closeKey={13}>
          <hr/>
            <p className='text-justify'>{text} </p>
          <hr/>
            <p className='text-center'>
                <p className='discription-text'> "Всем удачи в Новом Году!" </p>
            </p>
            <p className='discription-text text-right'>👨Nikita Efimenko</p>
          <hr/>
      </Modal>
	)
}


