// 1、ref属性（其一是一种快捷的DOM访问方式，其二用于引用一个变量）

// 2、ref的三种使用场景
  // - 场景1：ref作用在普通的HTML节点上，返回的是DOM对象
  // - 场景2：ref作用在类组件上，返回的是类组件实例对象
  // - 场景3：ref作用在函数式组件上（默认会报错，原因是函数式组件没有实例对象），配合forwardRef转发可以访问函数式组件内部的DOM对象。

// 3、ref三种语法
  // 语法1：<div ref='box' />   // this.refs.box
  // 语法2：<div ref={dom=>this.boxRef=dom} />   // 使用ref={callback} 手动收集ref对象(DOM对象、类组件实例)
  // 语法3：<div ref={createRef()的返回值} />  // const ref = createRef()  通过ref.current来访问DOM对象或类组件实例
  // 注意：以上三种语法，不仅可以作用在HTML节点上，作用在类组件上也是没有问题的。

// 4、特殊场景；ref配合forwardRef一起，作用在函数式组件上！
  // - 当ref属性作用在“自定义的函数式组件”上时，默认会报错。
  // - 这时就要用到React.forwardRef((props,ref)=>(<jsx/>))来解决问题。这时访问的不是函数式组件实例，而函数式组件内部的某一个变量（DOM节点，也可能是一个普通的非DOM变量）
  // - 语法：const FC = forwardRef((props, ref)=>(<jsx ref={ref}/>))
  // - 补充：后面在讲 Hooks API 时，还有两个 useRef / useImperativeHandle 和ref使用息息相关！

import React, { Component, useRef, forwardRef, createRef } from 'react'

// 类组件
class ChildA extends Component {
  render () {
    return (
      <div>
        <div>我是类组件 child b</div>
      </div>
    )
  }
}

// 函数式组件
const ChildB = forwardRef((props, ref) => {
  return (
    <div>
      <div ref={ref}>我是函数式组件 child c</div>
    </div>
  )
})


class StudyForward extends Component {

  constructor (props) {
    super(props)
    this.fff = createRef()
  }

  submit () {
    console.log('所有的ref对象：', this.refs, this.eee, this.fff)
    // this.refs.box.style.color = 'red'
    // this.eee.style.color = 'blue'
    // this.fff.current.style.color = 'red'
  }

  render () {
    return (
      <div>
        <h1>学习ref转发</h1>
        {/* ref作用在普通HTML节点上，得到的DOM对象 */}
        <input type="text" ref='ipt' />

        <div ref='box'>你好</div>
        <div ref={dom=>this.eee=dom}>世界</div>
        <div ref={this.fff}>千锋</div>

        {/* ref作用在类组件上，得到组件实例对象 */}
        <ChildA ref='bbb' />

        {/* ref作用在函数式组件上，得到函数式组件内部的一个DOM对象 */}
        <ChildB ref='ccc' />

        <br/>
        <button onClick={()=>this.submit()}>提交</button>
      </div>
    )
  }
}

export default StudyForward
