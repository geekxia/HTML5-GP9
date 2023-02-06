import PropTypes from 'prop-types'
import './style.scss'
import cn from 'classnames' // 用于处理动态样式的className字符串

function Button (props) {
  const { children, type, onClick } = props
  // 动态className样式
  const style = cn('qf-button', type)
  return (
    <span className={style} onClick={onClick}>
      {children}
    </span>
  )
}

Button.propTypes = {
  type: PropTypes.oneOf(['primary', 'danger', 'default']),
  onClick: PropTypes.func,
}
Button.defaultProps = {
  type: 'default',
  onClick: () => {}
}

export default Button
