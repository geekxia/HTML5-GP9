import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { SettingOutlined } from '@ant-design/icons'
import { Drawer, Form } from 'antd'
import { GithubPicker } from 'react-color'

import { toggleColor } from '@/store/actions'

export default () => {

  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()
  const { primaryColor } = useSelector(state=>state.app)
  const close = () => {
    setOpen(false)
  }

  return (
    <div className='main'>
      <Outlet />
      <div
        className='setting'
        onClick={()=>setOpen(true)}
        style={{
          background: ('var(--ant-primary-color)')
        }}
      >
        <SettingOutlined />
      </div>
      <Drawer
        title="设置"
        placement='right'
        closable
        onClose={close}
        open={open}
      >
        <Form
          name="setting"
          layout='horizontal'
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 20,
          }}
          initialValues={{
            remember: true,
          }}
        >
          <Form.Item label="主题色">
            <GithubPicker
              triangle='hide'
              value={primaryColor}
              width='220px'
              onChange={ev=>dispatch(toggleColor(ev.hex))}
            />
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  )
}
