// 1、什么是高阶组件？
  // - 高阶组件（Higher Order Component）本质上是纯函数，它接收一个React组件作为入参，返回一个新的React组件。所以，高阶组件也常常叫做高阶函数。
  // - 两个概念：这个被入参的React组件，常常被称之为“UI组件”。这个高阶组件（纯函数），被称之为“容器组件”。
  // - 语法1：const hoc1 = UI => (新组件)
  // - 语法2：const hoc2 = (...args) => (UI => (新组件))
  // - 什么是纯函数？如果一个函数，其函数体中不对入参做任何修改，并且相同入参永远得到相同的返回值，这样的函数就是纯函数。
  // 面试题：在React中哪些场景下会用到纯函数？函数式组件、高阶组件、Redux的reducer函数。

// 2、高阶组件的意义
  // - 高阶组件不是什么新语法（不是新API），而是一种代码复用技巧，是类组件编程的产物。
  // - 作用：代码逻辑的复用。
  // - 理解：高阶组件实际上是在对入参（UI组件）进行若干的修饰，比如给UI组件添加公共的视图结构、公共的方法或属性等。
  // - 面试题：你在工作中有没有封装过高阶组件？解决过什么具体的问题？（权限设计、注入工具方法）

// 3、关于封装高阶组件的若干注意事项
  // - 在封装高阶组件时，都要做“属性继承”，避免props丢失。
  // - 在封装高阶组件时，如果配合ref一起使用，可能遇到其它“坑”，请参考文档中的说明。

import { Component } from 'react'

// 定义一个高阶组件
function test (WrappedComponent) {
  // 返回一个新组件（是一个类组件）
  return class extends Component {
    handler () {
      console.log('---clicked')
    }
    componentDidMount () {
      console.log('---mounted')
    }
    toFixed (price) {
      return '￥'+Number(price).toFixed(2)
    }
    render () {
      const other = {
        role: 'admin',
        handler: this.handler,
        toFixed: this.toFixed
      }
      return (
        <div style={{background:'#ccc'}}>
          <WrappedComponent {...this.props} {...other} />
          <footer>
            <div>千锋出品</div>
          </footer>
        </div>
      )
    }
  }
}

// 这也是一个高阶组件
const role = W => {
  // do something
  const roleName = 'admin'
  // 返回一个新组件（是一个函数式组件）
  return props => (
    <W {...props} roleName={roleName} />
  )
}

// 这也是一个高阶组件
// const page = roles => Page => props => (<Page />)
// 用法：page(['admin', 'editor'])(Page)
// 应用：用这个高阶组件，来实现权限设计（前端实现权限设计）
const page = roles => {
  // do something
  const roleArr = ['admin']   // 从状态管理中取出当前用户的roles（来自后端）
  // 检测当前用户是否有权访问当前页面
  const hasAuth = roleArr.some(ele=>roles.includes(ele))
  return Page => {
    // do something
    return props => {
      return (
        hasAuth ? <Page {...props} hasAuth={hasAuth} roleArr={roleArr} /> : <div>404</div>
      )
    }
  }
}

// 把高阶组件当作装饰器来使用（装饰器语法只能用在类上）
// 只有在类组件上才能使用这种装饰器语法，如果当前组件是函数式组件，只能这样role(StudyHoc)。
// 当多个高阶组件一起使用时，先后顺序是有讲究的！！！
@page(['admin', 'editor', 'shop'])
@test
@role
class StudyHoc extends Component {
  render () {
    console.log('--- page props', this.props)
    return (
      <div>
        <h1>学习高阶组件</h1>
        <h1>{ this.props.role }</h1>
        <button onClick={()=>this.props.onHandler()}>点击</button>
      </div>
    )
  }
}

export default StudyHoc
