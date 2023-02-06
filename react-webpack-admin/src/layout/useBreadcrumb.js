import { useLocation } from 'react-router-dom'
import { useMemo } from 'react'
import { asyncRoutes } from '@/views'

function useBreadcrumb () {

  const { pathname } = useLocation()
  return useMemo(()=>{
    console.log('----面包屑重新计算了')
    
    let result = [asyncRoutes[0]]  // 面包屑数组中第一个元素，永远是首页
    if (pathname !== '/dashboard') {
      asyncRoutes.forEach(ele1=>{
        if (ele1.path === pathname) {
          result.push(ele1)
        }
        if (ele1.children) {
          ele1.children.forEach(ele2=>{
            if (ele2.path === pathname) {
              result.push(ele1)
              result.push(ele2)
            }
          })
        }
      })
    }
    return result
  }, [pathname]) // 仅当pathname变化时重新生成面包屑

}

export default useBreadcrumb
