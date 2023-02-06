import { Component } from 'react'
import PropTypes from 'prop-types'

import ReactDOM from 'react-dom'
import Button from '../button'

function Head (props) {
  const { onCancel, title, closable, closeIcon } = props
  return (
    <header>
      <div>{ title }</div>
      <div>
        { closable && <div onClick={onCancel}>{closeIcon}</div> }
      </div>
    </header>
  )
}

function Main (props) {
  const { children } = props
  return (
    <main>
      { children || <div>默认主体内容</div> }
    </main>
  )
}

function Foot (props) {
  const { footer, onOk, onCancel } = props
  // console.log('----footer', footer)
  const renderFooter = () => {
    let result = (
      <>
        <Button onClick={onCancel}>取消</Button>
        <Button type='primary' onClick={onOk}>确定</Button>
      </>
    )
    if (footer===null) result = null
    if (footer) result = footer
    return result
  }
  return (
    <footer>
      { renderFooter() }
    </footer>
  )
}

// Modal框
class Modal extends Component {
  render () {
    const { visible, children, footer } = this.props
    // 默认情况下，把Modal视图渲染到document.body中去
    return ReactDOM.createPortal(
      (
        <div
          className='layer'
          style={{
            display: visible ? 'block' : 'none'
          }}
        >
          <div className='wrap'>
            <Head {...this.props} />
            <Main>{ children }</Main>
            { footer !== null && <Foot {...this.props} /> }
          </div>
        </div>
      ),
      this.props.getContainer
    )
  }
}

Modal.propTypes = {
  visible: PropTypes.bool,
  onCancel: PropTypes.func,
  title: PropTypes.node, // ReactNode类型
  closable: PropTypes.bool,
  closeIcon: PropTypes.element, // ReactElement类型
  footer: PropTypes.node,
  onOk: PropTypes.func,
  getContainer: PropTypes.oneOfType([
    PropTypes.instanceOf(HTMLElement),
    PropTypes.string
  ])
}

Modal.defaultProps = {
  visible: false,
  onCancel: () => {},
  title: '标题',
  closable: true,
  closeIcon: <span>X</span>,
  onOk: () => {},
  getContainer: document.body,  // 指定Modal弹框的挂载节点
}

export default Modal
