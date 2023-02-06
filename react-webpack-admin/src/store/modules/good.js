import produce from 'immer'

// 配合cookie或localStorage做持久化存储
const initState = {
  cates: []
}

export default (state=initState, {type, payload}) => (
  produce(state, state => {
    switch (type) {
      case 'GOOD_CATES':
        state.cates = payload
        break
      default:
    }
  })
)
