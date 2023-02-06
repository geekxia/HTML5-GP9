import { Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons'

import { Layout, Menu, ConfigProvider } from 'antd';
import { IntlProvider } from 'react-intl'
import './style.scss'

import QfSider from './components/Sider'
import QfHeader from './components/Header'
import QfContent from './components/Content'

const { Header, Sider, Content } = Layout;

// 导入antd组件库的国际化语言包
import enGB from 'antd/es/locale/en_GB'
import zhCN from 'antd/es/locale/zh_CN'

// react-intl
// 导入业务语言包，给IntlProvider使用（<IntlProvider>、useIntl、<FormattedMessage>）
import intlGB from '@/locales/en_GB'
import intlCN from '@/locales/zh_CN'

// 引入水印组件
import WaterMark from '@/components/water_mark'

import { toggleCollapsed } from '@/store/actions'

const locales = { en_GB: enGB, zh_CN: zhCN }
const intlLocals = { en_GB: intlGB, zh_CN: intlCN }

export default () => {

  // const [collapsed, setCollapsed] = useState(false) //
  const { size, lang, primaryColor, collapsed } = useSelector(state=>state.app) // 响应式：默认订阅store变化
  const dispatch = useDispatch()

  const resizeHandler = ev => {
    // console.log('---resize', ev.srcElement.innerWidth)
    const w = ev.srcElement.innerWidth
    // setCollapsed(w<=900)
    dispatch(toggleCollapsed(w<=900))
  }

  // 监听resize事件
  useEffect(()=>{
    window.addEventListener('resize', resizeHandler)
    return () => {
      window.removeEventListener('resize', resizeHandler)
    }
  }, [])

  // 实现动态主题色。
  // 如果要定制主题？在App.jsx导入import 'antd/dist/antd.css'，找到这个css源码进去修改主题色变量。
  useEffect(()=>{
    ConfigProvider.config({
      theme: { primaryColor }
    })
  }, [primaryColor])

  return (
    <ConfigProvider componentSize={size} locale={locales[lang]}>
      <IntlProvider messages={intlLocals[lang]} locale={lang.split('_')[0]}>
        <div className='qf-layout'>
          <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
              <QfSider value={collapsed} />
            </Sider>

            <Layout className="site-layout">
              <Header
                className="site-layout-background"
                style={{
                  padding: 0,
                }}
              >
                <QfHeader value={collapsed} onChange={()=>setCollapsed(!collapsed)} />
              </Header>
              <Content style={{padding: '20px', boxSizing:'border-box'}}>
                <WaterMark content='千锋出品'>
                  <QfContent />
                </WaterMark>
              </Content>
            </Layout>
          </Layout>
        </div>
      </IntlProvider>
    </ConfigProvider>
  )
}
