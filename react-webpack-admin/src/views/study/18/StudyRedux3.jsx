// 在类组件中，只能使用connect()访问store并与store交互
// 在函数式组件中，不仅可以使用connect()实现，还可以使用useSelector()/useDispatch()实现

import { useSelector, useDispatch } from 'react-redux'
// import { useSelector, useDispatch } from '@/utils/react_redux'

import { useIntl, FormattedMessage } from 'react-intl'

import { Button, DatePicker } from 'antd'

import { numAdd } from '@/store/actions'

export default () => {

  const num = useSelector(state=>state.study.num)
  const dispatch = useDispatch()
  const intl = useIntl()
  console.log('----intl', intl)

  return (
    <div>
      {/* <h1>{ intl.formatMessage({id: 'redux.title'})}</h1> */}
      <h1><FormattedMessage id='redux.title' /></h1>
      
      <h1>{ num }</h1>
      <button onClick={()=>dispatch(numAdd(5))}>自增</button>
      <hr/>

      <div>千锋</div>
      <Button type='primary'>全屏</Button>
      <DatePicker />
    </div>
  )
}
