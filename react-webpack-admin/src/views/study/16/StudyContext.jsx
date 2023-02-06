// 1、什么是上下文？
  // 由React.createContext()所创建的对象，这个对象就叫“上下文”。在上下文对象中有两个非常重要的上下文组件<Provider>和<Consumer>。
  // 注意：在同一个React应用中，可以创建多个上下文对象，这些上下文对象是相互独立的，彼此不干扰。上下文<Provider>一般用在根组件上。
  // 注意：在React中，上下文数据是没有响应式的。也就是说，<Provider>注入静态数据，后代组件不会随着静态数据的变化而变化。为了实现上下文的响应式，<Provider>必须注入声明式的state数据。

// 2、上下文的意义
  // 上下文是React开发中的一种非常重要的组件间的通信方案。这种通信方案是自上而下的，在父级组件上使用<Provider>注入数据，在后代组件中使用<Consumer>来消费数据。有点类似Vue2中的provide/inject通信。
  // 在不使用上下文的情况下，如果从父级组件向后代组件传递数据，只能使用属性穿透，这比较麻烦。使用上下文，可以实现由父级组件到后代组件的“单对单”的通信，越过中间那些没有必要的组件层级。比如（App - Page - Child - GrandChild），从App到GrandChild的通信，最好使用上下文来实现。

// 3、在类组件中如何使用上下文数据呢？
  // - 第1种语法：'类组件名字'.contextType = '上下文对象'  // 在组件内部使用this.context访问上下文数据
  // - 第2种语法：render() { return <Consumer>{ ctx => <jsx />}</Consumer> }

// 4、在函数式组件中如何使用上下文数据呢？
  // - 第1种语法：return (<Consumer>{ ctx => <jsx />}</Consumer>)
  // - 第2种语法：使用 useContext('上下文对象') 访问上下文数据

import { Component, createContext } from 'react'
import ThemeToggle from '@/components/theme_toggle'

const ThemeContext = createContext()  // 创建上下文对象
const IntlContext = createContext()   // 创建另一个独立的上下文对象

console.log('---上下文', ThemeContext)

// 在类组件中使用上下文数据的第一种写法（推荐）
class GrandChild extends Component {
  render () {
    return (
      <IntlContext.Consumer>
      {
        lang => (
          <ThemeContext.Consumer>
          {
            theme => {
              // do something
              console.log('---上下文数据theme', theme)
              console.log('---上下文数据lang', lang)
              return (
                <div style={theme}>
                  <h3>我是grand-child组件</h3>
                </div>
              )
            }
          }
          </ThemeContext.Consumer>
        )
      }
      </IntlContext.Consumer>
    )
  }
}

// 在类组件中使用上下文数据的第二种写法（不推荐）
// class GrandChild extends Component {
//   render () {
//     // console.log('---GrandChild', this)
//     const context = this.context
//     return (
//       <div style={context}>
//         <h3>我是grand-child组件</h3>
//       </div>
//     )
//   }
// }
// GrandChild.contextType = ThemeContext

class Child extends Component {
  render () {
    return (
      <div>
        <h2>我是child组件</h2>
        <GrandChild />
      </div>
    )
  }
}

class StudyContext extends Component {
  constructor (props) {
    super(props)
    this.state = {
      theme: {
        color: '#000000',
        background: '#ffffff'
      }
    }
  }

  render () {
    const { theme } = this.state
    return (
      <IntlContext.Provider value='zh'>
        <ThemeContext.Provider value={theme}>
          <div>
            <h1>学习上下文</h1>
            <Child />
            <ThemeToggle value={theme} onChange={theme=>this.setState({theme})} />
          </div>
        </ThemeContext.Provider>
      </IntlContext.Provider>
    )
  }
}

export default StudyContext
