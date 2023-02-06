import { useState } from 'react'
import { Menu } from 'antd'
import useMenu from '../useMenu'
import useMenuItems from '../useMenuItems'

import logo1 from '@/assets/logo1.png'
import logo2 from '@/assets/logo2.png'

function Logo (props) {
  const { value } = props
  return (
    <div className={value ? 'logo2' : 'logo'}>
      <img src={ value ? logo1 : logo2 } alt=""/>
    </div>
  )
}

export default props => {

  const [selectedKeys, openKeys] = useMenu() //
  const items = useMenuItems()
  const [keys, setKeys] = useState(openKeys)
  console.log('-----', selectedKeys, openKeys)

  return (
    <>
      <Logo {...props} />
      <Menu
        theme="dark"
        mode="inline"
        openKeys={keys}
        selectedKeys={selectedKeys}
        items={items}
        onOpenChange={ev=>setKeys(ev)}
      />
    </>
  )
}
