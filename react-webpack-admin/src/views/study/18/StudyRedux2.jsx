import { Component } from 'react'
import { connect } from 'react-redux'

// 作用：用于把上下文中的store数据映射到props上
function mapStateToProps (state) {
  console.log('---map, state', state)
  return {
    num: state.num,
    list: state.list
  }
}

// 作用：用于编写与store交互的业务逻辑
function mapDispatchToProps (dispatch) {
  return {
    add (payload) {
      dispatch({ type: 'NUM_ADD', payload })
    }
  }
}

@connect(mapStateToProps, mapDispatchToProps)
class StudyRedux1 extends Component {

  add () {
    // 目标是改变状态管理中的数据，不能直接改！！
    // 只能 dispatch(action)实现
    // 注意：react-redux(v8)默认注入了dispatch()方法
    this.props.dispatch({type:"NUM_ADD", payload:5})
  }

  render () {
    console.log('---props', this.props)
    const { num, add } = this.props
    return (
      <div>
        <h1>类组件</h1>
        <h1>{ num }</h1>
        <button onClick={()=>add(10)}>自增</button>
      </div>
    )
  }
}

export default StudyRedux1
