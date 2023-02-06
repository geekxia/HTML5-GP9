// 7、useMemo()
  // - 语法：const memoValue = useMemo(() => computeExpensiveValue(a, b), [依赖数组])
  // - 作用：用于对一个复杂的运算进行缓存，以达到性能优化的目的。它有点像Vue中的计算属性。

// 8、useCallback()
  // - 语法：const memoFn = useCallback(fn, [依赖数组])
  // - 作用：用于缓存一个函数。
  // - 说明：useCallback()只能用于缓存一个函数，useMemo()可以缓存任何变量（包括函数）。所以useCallback(fn,[依赖]) 等价于 useMemo(()=>fn, [依赖])。

import { useState, useMemo, useCallback } from 'react'

const StudyHooks3 = () => {

  const [num, setNum] = useState(1)
  const [count, setCount] = useState(100)

  const total = useMemo(()=>{
    console.log('---re-computed')
    // 执行各种复杂运算
    return num * 100 + 2
  }, [num])

  // 初始化声明一个函数，赋值给sub1
  // 有且仅有count发生变化时，这个函数会重新声明，再次赋值给sub1
  const sub1 = useCallback(
    () => {
      setCount(count-1)
    },
    [count]
  )

  const sub2 = useMemo(()=>{
    return () => setCount(count-1)
  }, [count])


  const sub3 = useCallback(
    () => {
      setCount(c=>c-1)
    },
    []
  )

  const sub4 = useMemo(()=>{
    return ()=>setCount(c=>c-1)
  }, [])

  return (
    <div>
      <h1>学习Hooks编程</h1>
      <h1>{ num }</h1>
      <h1>总价：{ total }</h1>
      <button onClick={()=>setNum(n=>n+1)}>自增</button>
      <hr/>
      <h1>{ count }</h1>
      <button onClick={sub4}>自减</button>
    </div>
  )
}

export default StudyHooks3
