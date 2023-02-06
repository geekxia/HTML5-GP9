import produce from 'immer'
// 作用：提升store数据深拷贝的效率，也就是提升redux工作效率！！！
// 语法：produce('深拷贝的对象', '拷贝已完成的回调')
// 语法：const newState = produce(state, (state)=>{对拷贝结果do something})

// 纯函数（不能修改入参，相同入参永远是确定的返回值）
// state参数：当前最新的state数据
// action参数：是一种特殊信息，由React组件dispatch(action)过来的。action={type,payload}

const initState = {
  num: 800,
  list: [1, 2]
}
function reducer (state=initState, {type,payload}) {
  // 1、不能直接修改state，要深复制一份
  // let newState = JSON.parse(JSON.stringify(state))
  // let newState = Object.assign({}, state)
  // let newState = {...state}

  // 2、根据action信号来修改深复制之后的state
  // if (action.type==='NUM_ADD') {
  //   newState.num += action.payload
  // }
  // if (action.type==='NUM_SUB') {
  //   newState.num -= action.payload
  // }

  // 3、返回修改的最新的state
  // return newState

  return produce(state, state=>{
    switch (type) {
      case 'STUDY_NUM_ADD':
        state.num += payload
        break
      case 'STUDY_NUM_SUB':
        state.num -= payload
        break
      default:
    }
  })
}

export default reducer
