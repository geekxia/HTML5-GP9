import { Component, useState } from 'react'
import PropTypes from 'prop-types'
import { createRoot } from 'react-dom/client'
import Button from '../button'

// 带有提示的小弹框
function TipModal (props) {
  const { title, icon, content, onOk } = props
  const [visible, setVisible] = useState(true)
  const handler = (ev) => {
    onOk(ev)  // JS组件
    setVisible(false)
  }
  return (
    <div className='layer' style={{display:visible?'block':'none'}}>
      <div className='tip'>
        <span>icon</span>
        <span>{ title }</span>
        <div>{ content }</div>
        <Button type='primary' onClick={handler}>知道了</Button>
      </div>
    </div>
  )
}

TipModal.propTypes = {
  onOk: PropTypes.func,
}
TipModal.defaultProps = {
  onOk: () => {}
}

function confirm (props) {
  // console.log('---JS组件', props)

  // 手动创建一个挂载节点
  const dom = document.createElement('div')
  document.body.appendChild(dom)

  // 创建一个新的React挂载节点（另一个SPA应用）
  createRoot(dom).render(
    <TipModal {...props} />
  )
}

export default confirm
export { TipModal }
