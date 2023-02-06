import { Component, PropsWithChildren, FC } from 'react'
import { Provider } from 'mobx-react'

// 从Taro核心包中导入API和Hooks
import Taro, { useLaunch } from '@tarojs/taro'

// import store from './store_backup'  // mobx(v4)
import store from '@/store'  // mobx(v6)

import './app.scss'

const App: FC<PropsWithChildren> = props =>  {

  useLaunch(()=>{
    Taro.login().then(res => {
      console.log('---code', res.code)
    })
  })

  return (
    <Provider {...store}>
      {/* 在Taro开发中，你不需要编写路由集成的代码，背后默认就有路由 */}
      {/* 在这里显示所有的页面 */}
      { props.children }
    </Provider>
  )
}

export default App
