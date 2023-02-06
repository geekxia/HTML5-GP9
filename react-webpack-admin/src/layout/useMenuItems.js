import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

// const items = [
//   { label: '菜单项一', key: 'item-1' }, // 菜单项务必填写 key
//   { label: '菜单项二', key: 'item-2' },
//   {
//     label: '子菜单',
//     key: 'submenu',
//     children: [{ label: '子菜单项', key: 'submenu-item-1' }],
//   },
// ];

// 功能：用于把路由数据，转换成Menu菜单所需要的数据
function getItem(route) {
  if (!route.hidden) {
    return {
      key: route.key,  // 用于控制Menu展开或高亮样式
      icon: route.icon,
      children: route.children?.map(getItem),  //
      label: <Link to={route.path}>{ route.label }</Link>,
      // type: null
    }
  }
}

function useMenuItems () {
  const { accessRoutes } = useSelector(state=>state.permission)
  // do something
  // 使用store中的accessRoutes权限路由来渲染Menu
  return accessRoutes.map(getItem)
}

export default useMenuItems
