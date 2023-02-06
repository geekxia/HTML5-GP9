import { createHashRouter } from 'react-router-dom'

import {
  AppOutline,
  MessageOutline,
  UserOutline,
} from 'antd-mobile-icons'

import App from '../App';

import Study from './study'
import Find from './find'
import User from './user'

export const tabRoutes = [
  {
    key: 1,
    path: "/study",
    element: <Study />,
    // loader: rootLoader,
    icon: <AppOutline />,
    text: '首页'
  },
  {
    key: 2,
    path: "/find",
    element: <Find />,
    // loader: rootLoader,
    icon: <MessageOutline />,
    text: '发现'
  },
  {
    key: 3,
    path: "/user",
    element: <User />,
    // loader: rootLoader,
    icon: <UserOutline />,
    text: '我的'
  }
]

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      ...tabRoutes
    ]
  }
])

export default router
