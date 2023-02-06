// 1、Hooks常识
  // - Hooks API，是一套API，自React16.8开始新增的，用于在函数式组件中模拟“那些缺失的特性”，比如state、ref、生命周期、上下文等。
  // - 变革：既然使用Hooks API可以模拟类组件那样的特性，那我们在编写React应用时只使用函数式组件，当需要用到类组件那样的特性时，我们用Hooks进行模拟。结论是：市场上基本上都Hooks写法，不再使用类组件了。
  // - 常用的Hooks：useState、useEffect、useContext、useMemo、useCallback、useReducer、useRef。。。
  // - React18又新增了三个重要的Hooks：useId、useTransition、useDeferedValue
  // - 注意：Hooks API只能用在函数式组件中，不能用在类组件中。
  // - 概念：函数式组件，也被称之为“无状态组件”。

// 2、useState()
  // - 语法：const [state, setState] = useState(初始值)
  // - 作用：用于声明一个state变量，当setState()修改state时，当前所在函数式组件会重新运行，视图自动更新。
  // - 提问：使用useState()定义声明式变量时，为什么用const声明？（避免手动修改state；const变量没有“变量提升”的特点，所以要声明再使用）为什么useState()的返回值是数组解构语法？（对象解构和数组解构的语法差异）
  // - setState（useState()返回值的第二个方法）：在React17中，默认是异步的，多次set*操作会自动合并，只触发一次re-render；在React17中，如果在宏任务或Promise.then()中，set*操作是同步的，多次set*操作不会被合并，会触发多次re-render。在React18中，无论在哪里，set*总是异步的，多次set*总会被合并，只re-render一次。
  // - 提问：既然set*操作会触发当前函数式组件重新执行，那为什么useState()定义的变量没有被重置？这些Hooks API实际上操作React底层，也就是useState()的变量从React底层中返回回来的。
  // - 注意：在使用set*方法时，第1，永远要搞清楚新值是否与旧值有关，如果有关setState(cb)，如果无关setState(10)；第2，注意set*的异步性（全并性问题）；第3，set*异步性（从组件更新流程的角度思考）。

// 3、useEffect()
  // - 语法：useEffect(()=>{fn1(); return ()=>{fn2();}}, [依赖数组])
  // - 作用：用于在函数式组件中执行各种副作用（比如DOM操作、调接口等），模拟类组件的三个生命周期componentDidMount()/componentDidUpdate()/componentWillUnmount()

  // - 执行流程：useEffect(()=>{fn1(); return ()=>{fn2();}}, [依赖数组])
    // - 情况一：当没有依赖数组这个参数时。组件初始化，fn1()执行，fn2()不执行；组件re-render时，fn2()先执行，fn1()执行；组件销毁时，fn2()执行，fn1()不执行。
    // - 情况二：当依赖数组是空数组时。组件初始化，fn1()执行，fn2()不执行；组件re-render时，fn1()和fn2()都不执行；组件销毁时，只执行fn2()，fn1()不执行。
    // - 情况三：当有依赖数据且不为空时。组件初始化，fn1()执行，fn2()不执行；组件re-render，如果导致组件re-render的变里在依赖数组中，fn2()先执行，fn1()后执行；如果导致re-render的变量不在依赖数组中，fn1()和fn2()都不执行；组件销毁时，只执行fn2()，fn1()不执行。

  // - useEffect()的使用原则
    // - 原则1：在同一个函数式组件中，可以同时使用多个useEffect()。
    // - 原则2：一个useEffect()，建议只执行一个副作用。
    // - 原则3：当在函数式组件要执行各种副作用时，不要直接将其“裸露”在函数式组件中，严格使用useEffect()进行包裹，包裹的好处是“依赖数组”可以更好地控制这些副作用的执行机制。
    // - 原则4：在React开发中，副作用大致分两类，一类是需要清除的副作用，要编写fn2()逻辑；一类是不需要清除的副作用，fn2()可以没有。

  // 4、useLayoutEffect()
    // - 语法：useLayoutEffect(()=>{fn1(); return ()=>{fn2()}}, [依赖数据])
    // - 作用：它的作用和useEffect()一样，都是用于执行各种副作用的，它们的运行流程也是一样的。
    // - 区别：它们的区别是，useEffect()在DOM更新变动之后执行，useLayoutEffect()在DOM更新变动之前执行。
    // - 注意：一般用不到useLayoutEffect()，也不建议用。在这种场景下，可以考虑用一下，希望有些副作用在DOM变动之前执行。

import { useState, useEffect, useLayoutEffect } from 'react'

const StudyHooks1 = props => {
  console.log('---start')

  // do something

  const [num, setNum] = useState(1)
  const [flag, setFlag] = useState(true)
  const [name, setName] = useState('')
  const [list, setList] = useState([])
  const [info, setInfo] = useState({a:1,b:2})
  const [count, setCount] = useState(100)

  const add = () => {
    // setTimeout(()=>{
    //   console.log('----1', num)
    //   // setNum(num=>num+1)
    //   // setNum(num=>num+1)
      // setNum(num+1)
    //   setNum(num+1)
    //   setFlag(false)
    //   console.log('----2', num)
    // }, 1000)

    setNum(num+1)
  }

  // 学习useEffect()标准语法
  useEffect(()=>{
    // fn1() 相当于componentDidMount()
    // 执行各种副作用，比如调接口、DOM操作、ref操作、定时器。。。
    console.log('---fn1')
    // const dom = document.getElementById('hehe')
    // console.log('---num对应的DOM情况', dom.innerText)
    return () => {
      // fn2() 相当于componentWillUnmount()
      // 清除那些需要清除的副作用
      console.log('---fn2')
    }
  }, [num])
  // 这个[依赖数据]，相当于componentDidUpdate()
  // 为了理解这个“相当于”，你要先理解watch/this.setState(,callback)/componentDidUpdate这几个技术点的应用场景

  useEffect(()=>{
    console.log('--- current num', num)
    // 执行副作用时，如果没有什么要销毁的，后面这个fn2()可以不写。
    // return () => { fn2() }
  }, [num])

  // useEffect(()=>{
  //   setInterval(()=>{
  //     console.log('--- current count', count)
  //     setCount(count=>count-1)
  //   }, 1000)
  // }, [])

  useEffect(()=>{
    const timer = setTimeout(()=>{
      setCount(count-1)
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [count])

  useLayoutEffect(()=>{
    console.log('---layout effect')
    return () => {}
  }, [num])

  console.log('---end')

  return (
    <div>
      <h1>学习Hooks API</h1>
      <h1 id='hehe'>{ num }</h1>
      <button onClick={add}>自增</button>
      <hr/>
      <h1>倒计时：{ count } 秒</h1>
    </div>
  )
}

export default StudyHooks1
