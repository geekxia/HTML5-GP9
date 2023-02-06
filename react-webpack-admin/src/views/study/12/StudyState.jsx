// 1、常识：默认情况下，在类组件中是有state，在函数式组件中没有state（自React16.8后，可以使用useState来模拟State）。

// 2、state概念，表示声明式变量。声明式是MVVM库的核心，特点是当声明式变量发生化时，视图自动更新，这就是所谓的响应式。

// 3、如何定义state？
  // - 如果是类组件，在constructor()中使用this.state={}来定义，或者使用成员属性state={}来定义。
  // - 如果是函数式组件，默认是没有state的。如果React版本库大于16.8，你可以用useState()来定义。

// 4、如何使用state？
  // - 如果是类组件，在代码作用域中使用this.state来访问这些声明式变量。
  // - 如果是函数式组件，useState()定义的声明式变量，直接访问，没有this。

// 5、如何修改state？
  // - 注意：在React中，永远不要直接修改声明式变量state，这不会触发视图更新。因为state有特殊意义，用于控制视图的更新。
  // - 如果是类组件，官方建议使用 this.setState() 这个专属方法来“间接”修改state。好处是，这个专属方法会默认触发re-render。

// 6、详解类组件中的this.setState()这个重要方法
  // - 特点：这个方法默认可以触发re-render，并且默认是异步的。
  // - 语法1：this.setState({}, callback)  当修改声明式变量时，如果新值与旧值无关，建议使用这种语法。
  // - 语法2：this.setState((state,props)=>({}), callback)  当修改声明式变量时，如果新值是由旧值计算而来，建议使用这种语法。

// 7、谈一谈this.setState()的异步性
  // - 在React17中，this.setState()默认是异步的，但是在定时器等宏任务中、还有Promise.then()中是同步的。
  // - 在React18中，无论this.setState()写在哪里，即使在宏任务和Promise.then()中都是异步的。（这在React18中，叫做batching）
  // - 提问：为什么React要把this.setState()设计成异步的？为了实现batching，当多次this.setState()时，可以只re-render一次。这就是所谓的this.setState()的“合并性”特点。

// 8、谈一谈this.setState()的合并性
  // - 只有异步的this.setState()，才有“合并性”，也就说多个this.setState()会被“挂起”，等待作用域中所有同步代码都执行了，才把多个this.setState()进行合并，只re-render一次。
  // - 注：在React18中，因为this.setState()永远都是异步的，所以总是会自动“合并”多个this.setState()，即batching。

// 9、谈一谈this.setState({}/fn, callback)的callback方法
  // - 因为this.setState()是异步，所以这个callback表示异步执行完成。需要注意的是，这个callback很少用。

// 10、简单聊一聊函数式组件中的state及其修改的语法
  // - 在函数式组件中默认是没有state的，要使用useState()来定义。
  // - 定义state的语法：const [num, setNum] = useState(1)
  // - 在函数式组件中怎么修改state？  setNum(100) / setNum(num+1) / setNum(num => num+1)

// 11、关于state的若干原则
  // - 原则1：永远不要直接修改state，在类组件中使用this.setState()来修改，在函数式组件使用useState()的第二个函数来修改。
  // - 原则2：每次修改state时，都要预先考虑“新值与旧值是否有关”，决定用哪种语法修改state。
  // - 原则3：注意this.setState()的异步性和合并性，尤其是在React17中。在React18中无须关心这个问题，永远都是异步的，并且会自动合并。

import { Component } from 'react'

class StudyState extends Component {
  // state = { num: 1 }

  constructor (props) {
    super(props)
    this.state = {
      num: 1,
      count: 1,
      name: '',
      foo: 300
    }
  }

  add1 () {
    // this.state.num++
    // this.state.num = 100
    // ++this.state.num
    // this.setState({
    //   num: ++this.state.num   // 这个代码不规范，因为你在直接修改state
    //   num: (this.state.num + 1)  // 这个写法，也不规范。
    // })

    // 因为num是声明式变量，要自增，也就新num是由旧num加1得到的。所以新值与旧值有关。
    // this.setState((state, props)=>{
    //   return {
    //     num: state.num + 1
    //   }
    // })

    setTimeout(()=>{
      // 这是React18，所以this.setState()仍然是异步的
      // 如果这是React17，this.setState()将变成同步的
      this.setState(state=>({ num: state.num + 1 }))
      console.log('--- new num', this.state.num)
    }, 1000)
  }

  add2 () {
    setTimeout(()=>{
      // do something
      this.setState({
        count: 100
      }, ()=>console.log('----count', this.state.count))
      // do something
      this.setState({
        name: '张三',
        count: 200
      }, ()=>console.log('----count', this.state.count))
      // do something
      this.setState(state=>({name:'李四', count:state.count+50}), ()=>console.log('----count', this.state.count))
      // do something
      this.setState(state=>({count:state.count+10}), ()=>console.log('----count', this.state.count))
    }, 10)
  }

  sub () {
    console.log('1----foo', this.state.foo)
    this.setState(state=>{
      return {
        foo: state.foo - 1
      }
    }, ()=>console.log('2----foo', this.state.foo))
    console.log('3----foo', this.state.foo)
  }

  render () {
    console.log('---render')
    const { num, count, name, foo } = this.state
    return (
      <div>
        <h1>学习State</h1>
        <h1>{ num }</h1>
        <button onClick={()=>this.add1()}>自增</button>
        <hr/>

        <h1>{ count }</h1>
        <h1>{ name }</h1>
        <button onClick={()=>this.add2()}>改变</button>
        <hr/>

        <h1>{ foo }</h1>
        <button onClick={()=>this.sub()}>自减</button>
      </div>
    )
  }
}

export default StudyState
