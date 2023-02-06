import React, { Component, PropsWithChildren, FC, useContext } from 'react'
import { View, Button, Text } from '@tarojs/components'
import { useRouter } from '@tarojs/taro'

import { observer, inject } from 'mobx-react'
import { useMobx, useSelector, useDispatch } from '../../hooks'

// 上下文  store
import './index.scss'

type PageStateProps = {
  study: {
    counter: number,
    increment: Function,
    decrement: Function,
    incrementAsync: Function
  }
}

interface Index {
  props: PageStateProps;
}

// 方案一：使用ref转发，配合inject/observer高阶组件
// const Index: FC<any> = React.forwardRef((props, ref)=>{
//   const { study } = props
//
//   return (
//     <View className='index'>
//       <View>{ study.counter }</View>
//       <Button onClick={()=>study.increment()}>自增</Button>
//     </View>
//   )
// })


// 方案二：自定义封装useSelector()/useDispatch()，使用Hooks代替高阶组件！
// const Index: FC<any> = ()=> {
//
//   const { counter } = useSelector(state=>state.study)
//   const dispatch = useDispatch()
//   return (
//     <View className='index'>
//       <View>{ counter }</View>
//       <Button
//         onClick={()=>{
//           dispatch({type:'study/incrementAsync',payload:50})
//         }}
//       >异步自增</Button>
//       <Button
//         onClick={()=>{
//           dispatch({type:'study/increment',payload:20})
//         }}
//       >同步自增</Button>
//     </View>
//   )
// }

// 方案三：自定义useMobx()
const Index: FC<any> = ()=> {

  const study = useMobx('study')
  const router = useRouter()

  return (
    <View className='index'>
      <View>{ study.counter }</View>
      <Button onClick={()=>study.increment(10)}>同步自增</Button>
      <Button onClick={()=>study.incrementAsync(20)}>异步自增</Button>
    </View>
  )
}

export default Index
