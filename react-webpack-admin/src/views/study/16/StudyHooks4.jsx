// 9、useRef()
  // - 语法：const ref = useRef(null)
  // - 作用：创建一个ref对象。默认情况下，函数式组件中没有ref接收方式，所以使用createRef()或者useRef()创建ref对象。
  // - 区别：createRef()在类组件和函数式组件中都能使用，useRef()只能用在函数式组件中。

// 10、useImperativeHandle()
  // - 语法：useImperativeHandle(forwardedRef, {})
  // - 作用：当ref作用在函数式组件上（要配合ref转发一起用），useImperativeHandle()用于给ref转发添加额外方法属性。
  // - 扩展：在antd(v4)中有一个<Form form={useForm()} />，通过useForm()可以访问到<Form>组件内部的DOM对象，并执行若干的dom方法。

import { useRef, useImperativeHandle, createRef, forwardRef } from 'react'

const Child = forwardRef(
  (props, forwardedRef) => {
    const iptRef = useRef()
    // 给“被转发出去的ref对象”添加功能方法
    useImperativeHandle(forwardedRef, ()=>({
      focus: () => {
        iptRef.current.focus()
      },
      validate: () => {
        console.log('执行表单验证')
      }
    }))
    return (
      <div>
        <input ref={iptRef} type="text"/>
      </div>
    )
  }
)


const StudyHooks4 = () => {
  const r1 = createRef() // 创建一个ref接收的方式
  const r2 = useRef()
  const r3 = useRef()

  const print = () => {
    console.log('r1', r1.current)
    console.log('r2', r2.current)
    console.log('r3', r3.current)
  }

  // 测试r3上的功能方法
  const test = () => {
    r3.current.focus()
    r3.current.validate()
  }
  return (
    <div>
      <h1>学习Hooks编程</h1>
      <div ref={r1}>千锋</div>
      <div ref={r2}>教育</div>
      <Child ref={r3} />
      <button onClick={print}>打印</button>
      <button onClick={test}>测试</button>
    </div>
  )
}

export default StudyHooks4
