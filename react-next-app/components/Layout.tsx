import type { NextApp } from 'next'

import Script from 'next/script'
import Head from 'next/Head'
import Image from 'next/image'

const Layout: NextApp<any> = ({ children }) => {
  return (
    <>
      <Script src='/rem.js' />
      <nav></nav>
      { children }
      <footer></footer>
    </>

  )
}

export default Layout
