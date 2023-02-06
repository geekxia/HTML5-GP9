// 1、React类组件有生命周期，函数式组件没有生命周期。

// 2、类组件的生命周期（3-2-1）
  // 第一阶段（装载阶段）：constructor() / render() / componentDidMount()
  // 第二阶段（更新阶段）：[shouldComponentUpdate()] / render() / componentDidUpdate()
  // 第三阶段（卸载阶段）：componentWillUnmount()

// 3、面试题：shouldComponentUpdate()
  // - 作用：用于控制更新阶段执行与否。如果这个生命周期返回true，更新阶段正常执行；如果返回false，更新阶段不执行。
  // - 注意：在Component中有这个生命周期，在PureComponent中已经淘汰这个生命周期。
  // - shouldComponentUpdate()和PureComponent，在某种程度上，在尝试解决相同的问题：减少没有必要的更新阶段的发生。前者是让你来了实现，后者是由React亲自来实现。

// 4、两个阶段（render阶段、commit阶段）
  // - 什么是render阶段？在React背后生成Fiber树的过程就叫做“render阶段”，特点是异步的、可中断的。当浏览器主线程比较忙时，会被中断；当浏览器不那么忙时，render阶段继续执行，直到Fiber树生成完成。在React17和18中，是一样的。
  // - 什么是commit阶段？在React背后，循环Fiber树生成真实DOM的过程叫做“commit阶段”。在React17中，这个过程是不可中断的。在React18中，这个过程默认也是不可中断的，但是可以使用startTransition()来标记“断点”，如果遇到浏览器比较忙的时候，在这个“断点”处可中断。（这个新特性，在React18中被称之为“并发特性”）。

import { PureComponent, Component } from 'react'

class StudyLife extends Component {
  // constructor()
  // 构造器函数，当组件实例化时执行。所以这里做一些初始化工作。
  constructor(props) {
    // 在super()前面不要做任何事
    super(props) // 调用父类的构造器，必须是第一行代码！
    // 在super()后面，可做一些初始化工作。但不能执行副作用（DOM/BOM操作、定时器、调接口）。

    // 用于定义声明变量
    // 注意：不要用props来初始化state。
    // 注意：props是只读的，在组件内部不能直接修改props。
    // 原则：在组件内部，始终保持props和state的独立性，也就是它们之间不要交叉赋值。但可以参与运算！
    // 注意：在构造器函数中，不能调用 this.setState()
    this.state = {
      num: 1,
      user: { name: '张三', age: 10 }
    }
    // 做一些初始化的工作
    this.flag = true
    console.log('----constructor')
  }

  // componentDidMount()
  // 相当于Vue中的mounted()，表示DOM渲染第一次渲染
  // 官方建议执行副作用的地方，比如DOM/BOM/定时器/调接口/this.setState()。
  componentDidMount () {
    console.log('----componentDidMount')
  }

  // shouldComponentUpdate()
  // 是一个控制更新阶段的"开关"。它的两个参数：props表示新的props，state表示新的state。
  // 它给了开发者一种可能的性能优化方案。举个例子：比如在state上有10个声明式变量，其中有9个会参与视图渲染，还有1个状态变量不能与视图渲染。那么，当我们this.setState()修改这个状态变量时，要不要执行更新阶段？显示是不要的。使用这个生命周期来控制。
  // 探索一个问题：在react开发中，这个生命周期为什么很少用？编写优化的逻辑不好写；this.forceUpdate()强制打开这个“开关”。
  shouldComponentUpdate (props, state) {
    console.log('----shouldComponentUpdate')
    console.log('----新值', state)
    console.log('----旧值', this.state)
    return false
  }

  // componentDidUpdate()
  // 相当于Vue中的updated()，表示DOM更新已完成
  // 说明一下这个生命周期的两个参数：props更新之前的旧props，state是更新之前的旧state。
  // 作用：用于监听声明式变量的变化，相当于this.setState()的callback的功能，也相当于Vue中watch的功能。需要说明的是，在React开发中，this.setState()的callback几乎不用。当我们需要监听声明式变量的变化时，建议使用这个生命周期实现。
  // 问题：在这个生命周期能不能调用this.setState() ？ 是可以的，但不要终止条件，也就是说不能让更新阶段无休止。
  // 后来React官方为了尝试解决这个问题，它给了一个PureComponent构造函数，它淘汰了shouldComponentUpdate()。在某种程度上，PureComponent在尝试解决与shouldComponentUpdate()相似的问题。
  componentDidUpdate (props, state) {
    console.log('----componentDidUpdate')
    if (state.num !== this.state.num) {
      console.log('--- num changed')
      if (state.num < 2) {
        this.setState(_=>({num: _.num + 1}))
      }
    }
  }

  // componentWillUnmount()
  // 相当于Vue中的beforeDestroy()，表示组件即将销毁！
  // 一般用于清除定时器、关闭长连接、清理缓存等。
  componentWillUnmount () {
    console.log('----componentWillUnmount')
  }

  renderList () {
    return [1,2,3,4]
  }

  // render()
  // 这是类组件中唯一的一个必须得有的生命周期，用于定义组件的视图结构（它的返回值就是）。
  // 注意：在render()内部，不能直接调用或间接调用this.setState()。
  // render() 它是创建Fiber树的地方。每一个JSX节点本质上都是createElement()方法，这个方法是生成Fiber单元的唯一方法。render()是生成Fiber树的过程是异步的（如果浏览器主线程比较忙，可以随时中断/重启render()）。Fiber树是生成真实DOM树的原材料。
  // 在React中，有三种方式触发re-render：this.setState() / this.forceUpdate() / 当props变化时。
  render () {
    // do something 可以做一些数据处理工作，但不要执行一些副作用！
    // 在这里不建议编写复杂的耗费性能的代码。
    const { num } = this.state
    console.log('----render')

    return (
      <div>
        <h1>学习生命周期</h1>
        { this.renderList() }
        <hr/>
        <h1>{ num }</h1>
        <button onClick={()=>this.setState(_=>({num:_.num+1}))}>自增</button>
        <button onClick={()=>this.forceUpdate()}>强制更新</button>
      </div>
    )
  }
}

export default StudyLife

// 【Fiber架构浅谈】

// render () {
//   return (
//     <div>
//       <div>
//         <h1>你好</h1>
//         <span>世界</span>
//       </div>
//       <ul>
//         <li>一</li>
//         <li>二</li>
//         <li>
//           <a>千锋</a>
//         </li>
//       </ul>
//     </div>
//   )
// }

// 【生Fiber树时的三个指针】
// parent  指向父Fiber
// child   指向大儿子Fiber
// sibling 指向下一个兄弟Fiber

// 每一棵Fiber树都是一帧状态

// 当re-render时  会生成一棵新的Fiber树（再加上第四个alternate指针，指向它对应那个旧Fiber单元）

// 协调运算（旧Fiber, 新Fiber）新旧Fiber对比，找到变化的Fiber单元们！

// -oldFiber没有， 在newFiber存在， --新增的节点  【】
// -oldFiber有，newFiber没有        --删除的节点   【】
// -oldFiber有, newFiber也有       --不变的节点（节点属性可能变化）【】

// commit阶段()  按顺序把变化/删除/新增的节点更新到真实DOM中去
