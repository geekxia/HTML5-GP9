import PropTypes from 'prop-types'

function ThemeToggle (props) {
  const { value, onChange } = props
  const change = ev => {
    const k = ev.target.name
    const v = ev.target.value
    // 把变化后的{color,background}回传给父组件
    onChange({...value, [k]: v})
  }
  return (
    <div>
    前景色：<input type="color" value={value.color} name='color' onChange={ev=>change(ev)} />
    背景色：<input type="color" value={value.background} name='background' onChange={ev=>change(ev)} />
    </div>
  )
}

ThemeToggle.propTypes = {
  value: PropTypes.shape({
    color: PropTypes.string.isRequired,
    background: PropTypes.string.isRequired
  }),
  onChange: PropTypes.func
}

ThemeToggle.defaultProps = {
  value: {
    color: '#000000',
    background: '#ffffff'
  },
  onChange: () => {}
}

export default ThemeToggle
