import { MobXProviderContext } from 'mobx-react'
import { useContext, useState } from 'react'

// 访问子store，要解决响应式问题，还得使用observer
export function useMobx (key) {
  if (!key) {
    throw new Error('请填写有效的入参')
    return
  }
  const ctx = useContext(MobXProviderContext)
  const [_, setTick] = useState(0)
  const state = ctx[key]

  const methods = {}  // 对子store中的actions方法二次包装
  // 遍历__proto__上的属性们
  Object.getOwnPropertyNames(state.__proto__).forEach(k=>{
    if (k !== 'constructor' && typeof state.__proto__[k] === 'function') {
      // 这个payload，走mobx流程的参数
      methods[k] = payload => {
        const fn = state[k](payload)
        if (fn && typeof fn.then === 'function') {
          fn.then(()=>setTick(c=>c+1))
        } else {
          setTick(c=>c+1)
        }
      }
    }
  })
  // 返回子store以及包装的actions方法们
  return { ...state, ...methods }
}

// 访问子store中某个状态数据
// const { num } = useSelector(state=>state.study)
export function useSelector(fn) {
  const state = useContext(MobXProviderContext)
  return fn(state)
}

// 封装一个“走mobx流程”的方法
// const dispatch = useDispatch()
// dispatch({ type, payload })
export function useDispatch () {
  const store = useContext(MobXProviderContext)
  const [_, setTick] = useState(0)
  return ({ type, payload}) => {
    //  走流程
    console.log('---type', type)
    const tt = type.split('/')
    // 调用指定的子store的action方法
    const fn = store[tt[0]][tt[1]](payload)
    if (fn && typeof fn.then === 'function') {
      fn.then(()=>setTick(_=>_+1))
    } else {
      setTick(_=>_+1)  // 触发更新
    }
    console.log('---payload', payload)
  }
}
