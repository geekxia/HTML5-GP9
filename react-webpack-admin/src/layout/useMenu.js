import { useLocation } from 'react-router-dom'
import { asyncRoutes } from '@/views'
import { useMemo } from 'react'

// 自定义Hooks（以use*开头，逻辑的封装）
function useMenu () {
  const { pathname } = useLocation()
  console.log('路由信息', pathname)

  return useMemo(()=>{
    // 把算法用useMemo()封装起来
    let selectedKeys = []
    let openKeys = []
    asyncRoutes.forEach(e1 => {
      if (e1.path === pathname) {
        selectedKeys = [e1.key+'']
        openKeys = []
      }
      if (e1.children) {
        e1.children.forEach(e2=>{
          if (e2.path === pathname) {
            selectedKeys = [e2.key+'']
            openKeys = [e1.key+'']
          }
        })
      }
    })
    return [selectedKeys, openKeys]
  }, [pathname])  // 保证useMenu()只在初始化时执行

}

export default useMenu
