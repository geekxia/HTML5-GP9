import { useSelector } from 'react-redux'
import './style.scss'

export default (props) => {
  const { children } = props
  const { collapsed }= useSelector(state=>state.app)
  return (
    <div
      className='submit'
      style={{
        left: !collapsed ? '200px' : '80px'
      }}
    >
      { children }
    </div>
  )
}
