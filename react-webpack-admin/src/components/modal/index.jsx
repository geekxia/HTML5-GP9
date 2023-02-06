import './style.scss'
import Modal from './Modal'
import confirm from './confirm'

Modal.info = function (props) {
  confirm(props)
}

Modal.error = function (props) {
  console.log('')
}

export default Modal
