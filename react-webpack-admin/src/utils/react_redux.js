import { createContext, useContext, useEffect, useReducer, useState, Component } from 'react'

// <Provider store>

const ReactReduxContext = createContext() // <Provider value>  <Consumer>

export function Provider (props) {
  const { store, children } = props
  return (
    <ReactReduxContext.Provider value={store}>
      { children }
    </ReactReduxContext.Provider>
  )
}

// const num = useSelector(state=>state.study.num)
// 注意：这个state (store.getState())
export function useSelector (callback) {
  // 从上下文中取出store={dispatch, getState(), ....}
  const store = useContext(ReactReduxContext)
  // 这个dispatch， 相当于类组件中的this.forceUpdate()
  const [_, dispatch] = useReducer(s=>s+1, 0)
  // const [count, setCount] = useState(0)
  useEffect(()=>{
    const unsubscrible = store.subscribe(()=>{
      // 表示store变了，也表示上下文中的store变了
      // 触发当前所在组件重新渲染，重新从上下文中取出最新store数据
      dispatch()
      // setCount(c=>c+1)
    })
    return () => unsubscrible()
  }, [])

  return callback(store.getState())
}

// const dispatch = useDispatch()
export function useDispatch () {
  const store = useContext(ReactReduxContext)
  return store.dispatch
}

// connect(mapState, mapDispatch)(UI)
export function connect (mapStateToProps, mapDispatchToProps) {
  return function (WrappedComponent) {
    // 返回一个新组件（函数式组件）
    // return props => {
    //   const store = useContext(ReactReduxContext)
    //   const [count, setCount] = useState(0) // 状态变量，用于触发组件更新
    //   const state = mapStateToProps(store.getState())
    //   const methods = mapDispatchToProps(store.dispatch)
    //   useEffect(()=>{
    //     const unsubscrible = store.subscribe(()=>setCount(c=>c+1))
    //     return ()=>unsubscrible()
    //   }, [])
    //   return <WrappedComponent {...props} {...state} {...methods}/>
    // }

    // 返回一个新组件（类组件）
    class NewWrappedComponent extends Component {
      componentDidMount () {
        const store = this.context
        this.unsubscrible = store.subscribe(()=>this.forceUpdate())
      }
      componentWillUnmount() {
        this.unsubscrible()
      }
      render () {
        const store = this.context
        const state = mapStateToProps(store.getState())
        const methods = mapDispatchToProps(store.dispatch)
        return (
          <WrappedComponent {...this.props} {...state} {...methods}/>
        )
      }
    }
    NewWrappedComponent.contextType = ReactReduxContext
    return NewWrappedComponent

  }
}
