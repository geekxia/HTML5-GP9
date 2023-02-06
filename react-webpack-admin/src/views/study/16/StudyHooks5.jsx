// 11、useId()
  // - 语法：const id = useId()
  // - 作用：用于在函数式组件中创建一个永远不会变化的唯一值。

// 12、useDeferredValue()
  // - 语法：const deferedValue = useDeferredValue("state表达式")
  // - 作用：其作用和防抖节流的功能相似，用于延迟一个频繁执行的操作。useDeferredValue()延迟的时间是不确定的，要看浏览器“脸色”，如果浏览器主线程比较忙，延迟时间就长一些。防抖的延迟时间是固定的，与浏览器主线程忙不忙无关。
  // - 理解：useDeferredValue()可以保证浏览器界面上那些比较重要的用户交互更流畅，比如用户输入、动画等。

// 13、useTransition()
  // - 语法：const [isPending, startTransition] = useTransition()
  // - 具体在写业务时：startTransition(()=>{更新任务})，那么这个"更新任务"在commit阶段中可能会被中断，实际上中不中断，得看浏览器主线程的“脸色”。
  // - 作用：用于那种大批量数据的渲染。它的替代方案的“虚拟长列表”。
  // - 补充：在React17中，render阶段是异步可中断的，commit阶段是同步的、不可中断的。在React18中，render阶段是异步可中断的，commit阶段默认仍然是同步的、不可中断的，但是可以使用startTranstion()人为标记为“可中断”的。

// 14、自定义Hooks及第三方库
  // - 自定义Hooks：从语法角度来讲，自定义Hooks就是用已有Hooks进行二次封装的。它本质上是一种代码逻辑的复用技巧。
  // - 自定义Hooks原则：所有的自定义Hooks都必须以use*开头；自定义Hooks可以被复用，并且其作用域是完全独立的；自定义Hooks和我们学过的内置Hooks一样，都只能用函数式组件中，并且只能用在函数式组件的顶层作用域中。
  // - 两个重要的Hooks库：react-use、ahooks。

import { useId, useDeferredValue, useTransition, useState, useEffect } from 'react'

const StudyHooks5 = () => {


  const [num, setNum] = useState(1)
  const id1 = useId()
  const id2 = useId()

  const [text, setText] = useState('')
  const deferedText = useDeferredValue(text)

  const [isPending, startTransition] = useTransition()
  const [list, setList] = useState([1,1,1])

  useEffect(()=>{
    if (text) {
      console.log('---调接口，执行搜索')
    }
  }, [deferedText])

  const change = () => {
    // 把这段更新标记成“可中断”的
    startTransition(()=>{
      // 触发re-render（render阶段、commit阶段）
      setList(Array(10000).fill(1))
    })
  }

  return (
    <div>
      <h1>学习Hooks编程</h1>
      <h1>{ num }</h1>
      <div>{ id1 }</div>
      <div>{ id2 }</div>
      <button onClick={()=>setNum(n=>n+1)}>自增</button>
      <hr/>

      名称搜索：<input type="text" value={text} onChange={ev=>setText(ev.target.value)} />
      <hr/>

      <button onClick={change}>渲染十万条数据</button>
      <h1>{ isPending ? '已中断' : '正常' }</h1>
      <div>
      {
        list.map((num,idx)=>(<h1 key={idx}>{ num }</h1>))
      }
      </div>
    </div>
  )
}

export default StudyHooks5
