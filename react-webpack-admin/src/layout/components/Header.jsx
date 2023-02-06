import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  MenuFoldOutlined, MenuUnfoldOutlined,
  FullscreenOutlined, FullscreenExitOutlined,
  FontSizeOutlined, TranslationOutlined
} from '@ant-design/icons'
import { Breadcrumb, Col, Row, Dropdown, Menu, Image } from 'antd'

// 用于对浏览器容器整体进行全屏操作（页面全屏）。
import screenfull from 'screenfull'
// 如果某个元素需要实现合屏（局部元素全屏）用ahooks中的useFullscreen
import cn from 'classnames'

import useBreadcrumb from '../useBreadcrumb'
import { toggleSize, toggleLang, toggleCollapsed, resetUser } from '@/store/actions'

function Toggle (props) {
  const { value } = props
  const dispatch = useDispatch()
  const onChange = () => {
    // 向store通信，更新布局的收缩状态！！！
    dispatch(toggleCollapsed(!value))
  }
  return (
    <span className='trigger' onClick={onChange} >
    {
      value ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
    }
    </span>
  )
}

const sizes = [
  { key: 1, label: 'Middle', value: 'middle' },
  { key: 2, label: 'Large', value: 'large' },
  { key: 3, label: "Small", value: 'small' }
]

const langs = [
  { key: 1, label: '中文', value: 'zh_CN' },
  { key: 2, label: 'English', value: 'en_GB' }
]

const users = [
  { key: 2, label: '个人中心', value: 'profile' },
  { key: 1, label: '退出', value: 'logout' },
]

export default props => {

  const breads = useBreadcrumb()
  const navigate = useNavigate()  // navigate('/jsx', {replace; })
  const [full, setFull] = useState(false)
  const dispatch = useDispatch()
  const { size, lang } = useSelector(state=>state.app)
  const { avatar } = useSelector(state=>state.user)



  const isLast = (idx) => {
    return idx === breads.length - 1
  }

  const skip = (ele, idx) => {
    // 最后一个面包屑节点，不跳转路由
    if (isLast(idx)) {
      return
    }
    if (breads.length > 1) {
      navigate(ele.path || ele.children[0].path)
    }
  }

  const toggle = () => {
    if (screenfull.isEnabled) {
    	screenfull.request()  // 全屏请求
    }
    if (full) {
      screenfull.toggle()
    }
    // console.log('---full', full)
  }

  useEffect(()=>{
    const handler = () => setFull(flag=>!flag)
    screenfull.on('change', handler)
    return () => screenfull.off('change', handler)
  }, [])



  return (
    <Row>
      <Col sm={24} md={12}>
        <Toggle {...props} />
        <Breadcrumb>
          {
            breads.map((ele,idx)=>(
              <Breadcrumb.Item
                key={ele.key}
                onClick={()=>skip(ele,idx)}
                style={{
                  color: isLast(idx) ? '#ccc' : '#fff',
                  cursor: isLast(idx) ? 'default' : 'pointer'
                }}
              >
              { ele.label }
              </Breadcrumb.Item>
            ))
          }
        </Breadcrumb>
      </Col>

      <Col sm={0} md={12} style={{textAlign:'right'}} className='handler'>
        {/* 页面全屏操作 */}
        <span onClick={toggle}>
          { !full ? <FullscreenOutlined /> : <FullscreenExitOutlined /> }
        </span>

        {/* 全局切换组件大小 */}
        <span>
          <Dropdown
            overlay={<Menu items={
              sizes.map(ele=>({
                key: ele.key,
                label: (
                  <span
                    onClick={()=>dispatch(toggleSize(ele.value))}
                    style={{
                      color: (size==ele.value) ? ('var(--ant-primary-color)') : 'black'
                    }}
                  >
                    { ele.label }
                  </span>
                ),
              }))
            }/>}
            placement="bottomRight"
            arrow
          >
            <FontSizeOutlined />
          </Dropdown>
        </span>

        {/* 国际化 */}
        <span>
          <Dropdown
            overlay={<Menu items={
              langs.map(ele=>({
                key: ele.key,
                label: (
                  <span
                    onClick={()=>dispatch(toggleLang(ele.value))}
                    style={{
                      color: (lang==ele.value) ? ('var(--ant-primary-color)') : 'black'
                    }}
                  >
                    { ele.label }
                  </span>
                ),
              }))
            }/>}
            placement="bottomRight"
            arrow
          >
            <TranslationOutlined />
          </Dropdown>
        </span>

        <span>
          <Dropdown
            overlay={<Menu items={
              users.map(ele=>({
                key: ele.key,
                label: (
                  <span
                    onClick={()=>{
                      if (ele.value === 'logout') {
                        dispatch(resetUser())
                      }
                    }}
                  >
                    { ele.label }
                  </span>
                ),
              }))
            }/>}
            placement="bottomRight"
            arrow
          >
            <Image
              preview={false}
              width={40}
              height={40}
              style={{borderRadius:'5px'}}
              src={avatar}
            />
          </Dropdown>
        </span>
      </Col>



    </Row>
  )
}
