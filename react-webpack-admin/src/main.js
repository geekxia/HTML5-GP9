// cnpm i react -S  （React18是2022年3月39日，这个包用于封装React组件）
// cnpm i react-dom -S （版本和React是对应的，这个包用于渲染React组件）

// React18挂载SPA应用的写法
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

const app = createRoot(document.getElementById('app'))
// app.render(<App version='18' />)
app.render(React.createElement(App, {version:'18'}))

// React17是这么挂载的
// import React from 'react'
// import ReactDOM from 'react-dom'
// import App from './App'
// ReactDOM.render(<App />, document.getElementById('app'))

// 环境说明：不建议像Vue通过CDN方式的学习。
// <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
// <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
// <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
