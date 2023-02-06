// 5、useContext()
  // - 语法：const ctx = useContext(上下文对象)
  // - 作用：用于获取当前上下文对象的Provider所提供的上下文数据。
  // - 理解：它是<Consumer>{ctx=><jsx/>}<Consumer>的一种简写。

// 6、useReducer()
  // - 语法：const [state, dispatch] = useReducer(reducer, initialState)
  // - 作用：useReducer()一次性可以声明式多个“声明式变量”，相当于useReducer()等价多个useState()的功能；本质上，useReducer()在函数式组件模拟Redux数据流。
  // - 强调：useReducer()返回值的第二个函数（dispatch）相当于类组件中的this.forceUpdate()。
  // - 面试题：在函数式组件中怎么模拟类组件中this.forceUpdate()的功能？（useReducer()的dispatch；或者setCount(c=>c+1)触发。）

import { useContext, useReducer, createContext } from 'react'

const StoreContext = createContext()  // 创建上下文对象

const Child = props => {
  const job = useContext(StoreContext)
  return (
    <div>我的child组件：{ job }</div>
  )
}

// reducer函数（在编写这个函数时，要求是纯函数）
// state参数：当前最新的state
// action参数：表示一种特殊的信号 { type, payload }
const reducer = (state, action) => {
  // console.log('---有信号来了', action)
  // console.log('---state', state)
  const newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case 'NUM_ADD':
      newState.num += action.payload
      break
    case 'NUM_SUB':
      newState.num -= action.payload
      break
    case 'TASK_INPUT':
      newState.task = action.payload
      break
    case 'LIST_ADD':
      newState.list.push({
        id: Date.now(),
        task: newState.task
      })
      newState.task = ''
      break
    default:
  }
  return newState // 快照
}

const initialState = {
  num: 1,
  count: 1,
  task: '',   // Todo表单的值
  list: [],   // TodoList数据
  info: {},
  show: false
}

const StudyHooks2 = props => {

  console.log('---re-render')
  const [state, dispatch] = useReducer(reducer, initialState)

  const add = () => {
    // 向reducer函数派发一个“信号”，这个信号的格式是约定的{type,payload}
    dispatch({type:'NUM_ADD', payload:5})
  }

  const sub = () => {
    dispatch({type:'NUM_SUB', payload:2})
  }

  // console.log('---state', state)
  return (
    <StoreContext.Provider value='高薪就业'>
      <h1>学习Hooks编程</h1>
      <Child />
      <hr/>
      <h1>{ state.num }</h1>
      <button onClick={add}>自增</button>
      <button onClick={sub}>自减</button>
      <hr/>

      <input
        type="text"
        value={state.task}
        onChange={ev=>dispatch({type:'TASK_INPUT',payload:ev.target.value})}
      />
      <button onClick={()=>dispatch({type:'LIST_ADD',payload:null})}>添加</button>
      {
        state.list.map(ele=>(
          <div key={ele.id}>
            <span>{ele.id}</span>
            -
            <span>{ele.task}</span>
          </div>
        ))
      }
      <hr/>

      <button onClick={()=>dispatch({type:'',payload:''})}>触发更新</button>
    </StoreContext.Provider>
  )
}

export default StudyHooks2
