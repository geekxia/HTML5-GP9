import { Component } from 'react'

import { connect } from 'react-redux'
// import { connect } from '@/utils/react_redux'

import { numAdd, numSub } from '@/store/actions'

class StudyRedux1 extends Component {

  add () {
    // 目标是改变状态管理中的数据，不能直接改！！
    // 只能 dispatch(action)实现
    // 注意：react-redux(v8)默认注入了dispatch()方法
    this.props.dispatch({type:"NUM_ADD", payload:5})
  }

  render () {
    console.log('---props', this.props)
    const { num, add, sub } = this.props
    return (
      <div>
        <h1>类组件</h1>
        <h1>{ num }</h1>
        <button onClick={()=>add(10)}>自增</button>
        <button onClick={()=>sub(2)}>自减</button>
      </div>
    )
  }
}

export default connect(
  state => ({
    num: state.study.num,
    list: state.study.list
  }),
  dispatch => ({
    add (payload) {
      dispatch(numAdd(payload))
    },
    sub (payload) {
      dispatch(numSub(payload))
    }
  })
)(StudyRedux1)
