import { HashRouter } from 'react-router-dom'
import Permission from './Permission'

import { Provider } from 'react-redux'
// import { Provider } from '@/utils/react_redux'

import store from '@/store'

// 实现动态主题色（配置css-loader时，注意exclude属性包裹范围）
import 'antd/dist/antd.variable.min.css'
// import '@/assets/init.css'

const App = () => {
  return (
    <HashRouter>
      <Provider store={store}>
        <Permission />
      </Provider>
    </HashRouter>
  )
}


export default App
