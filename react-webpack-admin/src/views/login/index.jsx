import { useDispatch } from 'react-redux'

import { Button, Checkbox, Form, Input } from 'antd';
import './style.scss'
import { login } from '@/store/actions'

const Login = () => {
  const dispatch = useDispatch()

  // 提交登录
  const onFinish = (values) => {

    // 标准语法：dispatch({type,payload})  // plain objects
    // dispatch()实际上在和store交互
    // 新思路：希望dispatch(fn)能支持派发一个function（用redux-thunk捕获）
    // 这里的dispatch()都不支持Promise的，后面学习@reduxjs/toolkit时它支持Promise
    dispatch(login(values))

    // 在组件内部，触发一个actions方法，走流程，去更新state
    // this.$store.dispatch('user/login', values)
  }

  return (
    <div className='login'>
      <div className='wrap'>
        <Form
          name="basic"
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密 码"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 4,
              span: 16,
            }}
          >
            <Checkbox>记住用户名</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 4,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default Login
