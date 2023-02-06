
import type { AppProps } from 'next/app'

// 全局样式不用给文件名加module
import '../styles/globals.css'
import Layout from '../components/Layout'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
