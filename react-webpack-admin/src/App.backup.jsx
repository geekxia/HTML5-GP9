import { HashRouter, BrowserRouter, Routes, Route } from 'react-router-dom'

import Layout from '@/layout'
import Login from '@/views/login'


import { asyncRoutes } from '@/views'



const App = () => {

  // 用于定义路由规则（在路由v5中，只能这样渲染路由规则！在路由v6，除了这样，还可以使用useRoutes()来实现！）
  const createRoutes = () => {
    let result = []
    asyncRoutes.forEach(ele1=>{
      if (ele1.path) {
        result.push(
          <Route key={ele1.key} path={ele1.path} element={ele1.element} />
        )
      }
      if (ele1.children) {
        ele1.children.forEach(ele2=>{
          if (ele2.path) {
            result.push(
              <Route key={ele2.key} path={ele2.path} element={ele2.element} />
            )
          }
        })
      }
    })
    return result
  }

  return (
    <HashRouter>
      <Routes>
        {/* 一级路由 */}
        <Route path='/' element={<Layout />}>
          { createRoutes() }
        </Route>
        <Route path='/login' element={<Login />} />

      </Routes>
    </HashRouter>
  )
}



// 两种封装组件的方式：类组件、函数式组件。（自React诞生以来，一直都存在，你可随意地用这两种方式编写组件）

// 一、函数式组件：没有this、没有生命周期、没有ref、没有state、没有上下文；它有props；相比类组件来说，函数式组件的性能更好；自React16.8以后，在函数式组件中可以使用Hooks API来模拟以上缺失的那些特性。自React16.8以后，React开发非常鼓励使用函数式组件并且践行Hooks编程。

// import { useState } from 'react'
// function App(props) {
//
//   console.log('App----props', props)
//   const [num, setNum] = useState(1)
//
//   return (
//     <div className='box'>
//       <h1>Hello React</h1>
//       <h1>{ num }</h1>
//       <button onClick={()=>setNum(num+1)}>自增</button>
//     </div>
//   )
// }

// 二、类组件：有this、有生命周期、有state、有ref、有上下文；也有props；相比函数式组件性能较差；在类组件中不能使用 Hooks API；自React16.8以后，不鼓励再使用类组件。类组件的编写一般使用面向对象语法。

// import { Component } from 'react'
// class App extends Component {
//   constructor (props) {
//     super(props)
//     // 定义声明式变量
//     this.state = {
//       num: 1
//     }
//   }
//   add () {
//     this.setState({
//       num: this.state.num + 1
//     })
//   }
//   render () {
//     console.log('----this', this)
//     const { num } = this.state
//     return (
//       <div>
//         <h1>Hello React</h1>
//         <h1>{ num }</h1>
//         <button onClick={()=>this.add()}>自增</button>
//       </div>
//     )
//   }
// }

export default App
