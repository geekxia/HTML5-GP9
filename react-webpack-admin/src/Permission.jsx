import { useRoutes, useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useMemo } from 'react'

import { asyncRoutes } from '@/views'
import { getInfo } from '@/store/actions'
import { generateRoutes } from '@/store/permission'

import { constantRoutes } from '@/views'

// 页面加载时显示“加载进度条”
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
NProgress.configure({ showSpinner: false })

// 白名单（无须登录就可以访问的页面们）
const whiteList = ['/login']

// 模拟vue2的路由守卫流程
export default () => {

  NProgress.start() // 开启加载进度条

  const { token, roles } = useSelector(state=>state.user)
  const { accessRoutes } = useSelector(state=>state.permission)
  const navigate = useNavigate()
  const { pathname, search } = useLocation()
  const dispatch = useDispatch()

  // 判断是否有Token
  useEffect(()=>{
    // 当有token、但没有roles时，触发调接口获取用户信息
    if (token && roles.length===0) {
      // 获取用户信息
      dispatch(getInfo())
    }

    if (!token && pathname!=='/login') {
      navigate('/login')
    }
  }, [token])

  useEffect(()=>{
    // 当有roles、但没有accessRoutes(动态路由)时
    if (roles.length > 0 && accessRoutes.length === 0) {
      // 使用roles和路由表，生成当前用户可访问的动态路由
      dispatch(generateRoutes(roles))
    }
  }, [roles])

  useEffect(()=>{
    // 如果当前url=/login，这就是登录流程！！！
    if (accessRoutes.length > 0 && pathname==='/login') {
      const target = search ? search.split('=')[1] : '/dashboard'
      navigate(target, { replace: true })
    }
  }, [accessRoutes])

  // 监听路由变化
  useEffect(()=>{
    if (!token && !whiteList.includes(pathname)) {
      // 如果没有Token，并且访问的是非白名单页面，重定向到登录页
      navigate(`/login?redirect=${pathname}`, { replace: true })
    }
    if (token && pathname === '/login') {
      navigate('/', { replace: true })
    }
    if (token && pathname === '/') {
      navigate('/dashboard', { replace: true })
    }
  }, [pathname])

  useEffect(()=>{
    NProgress.done()
  })

  // 在路由v6中，新增的一种定义路由规则的玩法
  // 即将要生成的路由规则们（constantRoutes, accessRoutes）
  const routes = useMemo(()=>{
    // 对一级路由复制一份
    let routes = [ ...constantRoutes ]
    // 把权限算法生成好的二级路由，添加到Layout子路由中去
    routes[0].children = accessRoutes
    return routes
  }, [accessRoutes])

  const element = useRoutes(routes)

  return element
}
