// 1、组合模式
  // - 意义：在React中，组合是React组件化的基础。也就是说，在React中实现组件的复用，用的是组合模式，而非继承！

// 2、怎么使用组合思想来设计React组件呢
  // - 对UI视图进行分析，找出局部“块”之间的异同点，抽象出一个一个的局部“块”。
  // - 把这些局部“块”分门别类地封装成独立的小组件（**props设计**）
  // - 借助组合思想，把这个局部“块”联合起来

// 3、Portals（用于把jsx视图渲染到父级的DOM节点，类似Vue3中的<teleport to>）
  // - 语法：ReactDOM.createPortal(<jsx/>, container)
  // - 意思是把 <jsx/> 渲染到指定的container这个DOM节点上。

// 4、盘点组件化中常用的小知识点
  // - render props (自定义props是一个“自定义渲染”，通常还可以接收动态参数)
  // - props.children （通常是JSX数组或函数，表示自定义组件内部所嵌套的内容）
  // - 属性穿透 {...props}  在组合中，方便props的共享
  // - 属性校验 prop-types这个包、属性默认值（defaultProps）
  // - ref属性、React.createRef、React.forwardRef  统称为"Ref转发"
  // - classnames 实现动态样式

// 5、面试题：如何封装JS组件？
  // - 什么是JS组件呢？Modal.confirm({title,content,onOk})，通过交互事件弹出的React组件。
  // - 思路：在当前React应用中，在交互事件中，使用ReactDOM创建一个新的React应用（在这个应用中显示JS组件视图）
  // - 做法：在React18中，createRoot(dom).render(<Modal/>)，在React17中，ReactDOM.render(<Modal/>, dom)

import { useState } from 'react'
import Modal from '@/components/modal'
import Button from '@/components/button'

function StudyCompose () {
  const [show, setShow] = useState(false)
  const handler = () => {
    Modal.info({
      title: '重要消息',
      content: (<div>你确定要删除吗？</div>),
      onOk: () => {
        console.log('我知道了')
      }
    })
  }
  return (
    <div>
      <h1>学习组合</h1>
      <button onClick={()=>setShow(true)}>修改用户名</button>
      <Modal
        visible={show}
        onCancel={(ev)=>{setShow(false)}}
        title={<div style={{color:'red'}}>修改用户名</div>}
        closable
        closeIcon={<span>X</span>}
        onOk={() => {
          console.log('提交')
          setShow(false)
        }}
      >
        用户名：<input type="text"/>
      </Modal>
      <hr/>

      <button onClick={handler}>点击</button>
    </div>
  )
}

export default StudyCompose
