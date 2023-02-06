import { WaterMark } from '@ant-design/pro-components'

function getUserInfo () {
  return new Promise(resolve=>{
    setTimeout(()=>{
      resolve({
        username: '张三',
        role: 'admin'
      })
    }, 500)
  })
}


// 为应用程序注入初始化数据（用户信息）
// @umijs/plugin-initial-state
export async function getInitialState() {
  const data = await getUserInfo()
  // 返回initialState
  return {
    userinfo: data
  }
}

// 定制布局（参考ProLayout组件）
// @umijs/plugin-layout
export async function layout (arg) {
  console.log('---layout arg', arg)
  return {
    footerRender: (props) => {
      // console.log('footerRender props', props)
      return null
    },
    // 权限算法定制菜单的设计
    // menuRender: (props) => {
    //   console.log('---menuRender props', props)
    //   return (
    //     <div>我是菜单</div>
    //   )
    // }
    // waterMarkProps: (<WaterMark content="千锋教育" />)
  }
}
