// 一级路由表
import { Navigate } from 'react-router-dom'
import loadable from '@loadable/component'
import Layout from '@/layout'
import Login from './login'

// 系统内部页面
import StudyJSX from '@/views/study/12/StudyJSX'
import StudyState from '@/views/study/12/StudyState'
import StudyRender from '@/views/study/12/StudyRender'
import StudyForm from '@/views/study/12/StudyForm'
import StudyLife from '@/views/study/12/StudyLife'

import StudyLift from '@/views/study/14/StudyLift'
import StudyCompose from '@/views/study/14/StudyCompose'
import StudyForward from '@/views/study/14/StudyForward'

import StudyContext from '@/views/study/16/StudyContext'
import StudyHoc from '@/views/study/16/StudyHoc'
import StudyHooks1 from '@/views/study/16/StudyHooks1'
import StudyHooks2 from '@/views/study/16/StudyHooks2'
import StudyHooks3 from '@/views/study/16/StudyHooks3'
import StudyHooks4 from '@/views/study/16/StudyHooks4'
import StudyHooks5 from '@/views/study/16/StudyHooks5'

import StudyRedux1 from './study/18/StudyRedux1'
import StudyRedux3 from './study/18/StudyRedux3'

import GoodList from './good/GoodList'
import GoodForm from './good/GoodForm'

import {
  PieChartOutlined,
  WeiboOutlined, TwitterOutlined, WechatOutlined
} from '@ant-design/icons'

import { FormattedMessage } from 'react-intl'

// 演示路由懒加载（基于路由的代码分割）
// import Dashboard from './dashboard'
const Dashboard = loadable(()=>import('./dashboard'), {
  fallback: <div>Loading...</div>
})

export const constantRoutes = [
  {
    key: 1,
    path: '/',
    element: <Layout />,
    children: [
      // 经过权限算法，得到当前用户可访问的路由规则们 accessRoutes
      // 在Permission.jsx手动添加当前用户可访问内部页面路由
    ]
  },
  {
    key: 2,
    path: '/login',
    element: <Login />,
  },
]

export const asyncRoutes = [
  {
    key: 9,
    label: <FormattedMessage id='menu.dashboard' />,
    path: '/dashboard',
    element: <Dashboard />,
    icon: <PieChartOutlined />,
    meta: {
      roles: ['admin', 'editor']
    }
  },
  {
    key: 10,
    label: <FormattedMessage id='menu.level1' />,
    path: null,
    icon: <WeiboOutlined />,
    meta: {
      roles: ['editor']
    },
    children: [
      {
        key: 1001,
        label: <FormattedMessage id='menu.level1.jsx' />,
        path: '/jsx',
        element: <StudyJSX />,
        icon: null
      },
      {
        key: 1002,
        label: <FormattedMessage id='menu.level1.state' />,
        path: '/state',
        element: <StudyState />,
        icon: null
      }
    ]
  },
  {
    key: 11,
    label: <FormattedMessage id='menu.level2' />,
    path: null,
    icon: <TwitterOutlined />,
    meta: {
      roles: ['editor']
    },
    children: [
      {
        key: 1101,
        label: <FormattedMessage id='menu.level2.lift' />,
        path: '/lift',
        element: <StudyLift />,
        icon: null
      },
      {
        key: 1102,
        label: <FormattedMessage id='menu.level2.compose' />,
        path: '/compose',
        element: <StudyCompose />,
        icon: null
      }
    ]
  },
  {
    key: 12,
    label: '状态管理',
    path: null,
    icon: <TwitterOutlined />,
    meta: {
      roles: ['admin']
    },
    children: [
      {
        key: 1201,
        label: 'Redux学习1',
        path: '/redux1',
        element: <StudyRedux1 />,
        icon: null
      },
      {
        key: 1202,
        label: 'Redux学习2',
        path: '/redux3',
        element: <StudyRedux3 />,
        icon: null
      }
    ]
  },
  {
    key: 13,
    label: <FormattedMessage id='menu.good.manage' />,
    path: null,
    icon: <TwitterOutlined />,
    meta: {
      roles: ['editor']
    },
    children: [
      {
        key: 1301,
        label: <FormattedMessage id='menu.good.list' />,
        path: '/good/list',
        element: <GoodList />,
        icon: null
      },
      {
        key: 1302,
        label: <FormattedMessage id='menu.good.add' />,
        path: '/good/add',
        element: <GoodForm />,
        hidden: true,
        icon: null
      },
      {
        key: 1303,
        label: <FormattedMessage id='menu.good.edit' />,
        path: '/good/edit/:id',  // 动态路由
        element: <GoodForm />,
        hidden: true,  // 表示不放在菜单上
        icon: null
      }

    ]
  },
  // 二级路由规则中的重定向
  {
    key: 404,
    hidden: true,
    path: '/*',
    element: <Navigate to='/dashboard' />
  }
]
