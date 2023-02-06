// 1、事件绑定（给元素绑定事件）
  // - 在类组件中，有两种方式绑定事件，一种是ES5的方式，一种是箭头函数的方式。
  // - 用箭头函数绑定事件：在事件作用域有this，this就是当前组件实例对象。
  // - 用ES5方式绑定事件，像这样 onClick={this.handler.bind(this)}，这种写法几乎没人用了。
  // - 关于事件对象：在React中没有像Vue那样的事件修饰符，所以做任何与事件有关的逻辑，都参考二阶段事件绑定的玩法。

// 2、条件渲染（根据条件来显示与隐藏元素）
  // - 单一元素的条件渲染：{ bol && <jsx/> }
  // - 两个元素的条件渲染：{ bol ? <jsx1> : <jsx2> }
  // - 多个元素的条件渲染：建议封装“自定义渲染”函数，以便于代码的可维护性
  // - 动态class： <jsx className={`a b c ${this.state.d}`} /> 常用模板字符串语法
  // - 动态style:  <jsx style={{ css属性名: css属性值 }}>

// 3、列表渲染（对一个数组进行渲染）
  // - 语法基础：JSX默认就支持对数组的直接渲染。像这样 <div>{ [<jsx/>] }</div>
  // - 渲染列表的思路：对后端返回的数组数据进行遍历，生成一个能够渲染成DOM的Array<JSX>。
  // - 官方建议：使用 map() 方法来实现列表渲染。

// 4、合成事件（**）
  // - 在React中，所有的事件（on*系列的事件属性）都被重新封装过。为什么要干这件事儿？目的是控制事件作用域，把this.setState()挂起来，为了方便对多个this.setState()进行合并。
  // - 有哪些合成事件？on*系列的事件、生命周期钩子。（合成事件在React17中，主要是为了解决this.setState()的合并性问题）

import { Component } from 'react'

class StudyRender extends Component {
  constructor (props) {
    super(props)
    this.state = {
      bol1: true,
      bol2: true,
      row: 0,
      cc: 'a',
      color: 'black',
      show: 'block',
      who: 'Top',
      size: 0,
      list: [
        { id: 1, name: '张三', age: 10 },
        { id: 2, name: '李四', age: 20 },
        { id: 3, name: '越五', age: 30 },
        { id: 4, name: '张六', age: 40 }
      ],
      info: {
        name: '张三',
        age: 10,
        addr: '深圳',
        mobile: 110
      },
      num: 1
    }
  }

  click1 (flag, ev) {
    ev.stopPropagation()  // 阻止冒泡
    console.log('----click1', this)
    console.log('----click1', ev)
    console.log('----click1', flag)
  }

  click2 (flag, num, ev) {
    ev.preventDefault()   // 阻止默认事件
    console.log('----click2', this)
    console.log('----click2', flag)
    console.log('----click2', ev)
  }

  confirm (ev) {
    if (ev.keyCode === 13) {
      console.log('----登录', ev)
    }
  }

  renderDayText () {
    let result = null
    if (this.state.bol2) {
      result = <h1>白天</h1>
    } else {
      result = <h1>黑夜</h1>
    }
    return result
  }

  renderRowLine () {
    let result = null
    switch (this.state.row) {
      case 0:
        result = <h1>第一行文字</h1>
        break
      case 1:
        result = <h1>第二行文字</h1>
        break
      case 2:
        result = <h1>第三行文字</h1>
        break
      case 3:
        result = <h1>第四行文字</h1>
        break
      default:
    }
    return result
  }

  renderUserList () {
    return this.state.list.map(ele=>(
      <div key={ele.id}>
        <span>姓名：{ ele.name}</span>
        <span> </span>
        <span>年龄：{ele.age}</span>
        {/* <button onClick={()=>console.log('当前用户', ele)}>禁用</button> */}
        <button onClick={()=>this.disableHandle(ele)}>禁用</button>
      </div>
    ))
  }

  renderUserInfo () {
    return Object.keys(this.state.info).map(ele=>(
      <div key={ele}>{ele} : {this.state.info[ele]}</div>
    ))
  }

  disableHandle (user) {
    console.log('当前用户', user)
  }

  // 相当于vue中的mounted
  componentDidMount () {
    // 注：用非合成事件的方式绑定事件。
    // 在React18中，this.setState()都是异步的，并且可以自动合并多个this.setState()。
    // 在React17中，this.setState()是同步的，不能对多个this.setState()进行合并，会导致多次re-render。
    document.getElementById('btn').addEventListener('click', ()=>{
      console.log('1----num', this.state.num)
      this.setState(state=>{
        return {
          num: state.num + 1
        }
      }, ()=>console.log('2----num', this.state.num))
      this.setState(state=>{
        return {
          num: state.num + 2
        }
      }, ()=>console.log('3----num', this.state.num))
      console.log('4----num', this.state.num)
    })
  }

  render () {
    console.log('---re-render')
    return (
      <div>
        <h1>学习渲染</h1>
        <button onClick={(ev)=>this.click1('qf', ev)}>点击1</button>
        <button onClick={this.click2.bind(this, 'qf', 100)}>点击2</button>
        <hr/>
        用户名：<input type="text" onKeyUp={(ev)=>this.confirm(ev)} />
        <hr/>

        { this.state.bol1 && <h1>千锋教育</h1> }
        <button onClick={()=>this.setState(s=>({bol1: !s.bol1}))}>切换</button>
        <hr/>

        {
          this.state.bol2
            ? <h1>白天</h1>
            : <h1>黑夜</h1>
        }
        { this.renderDayText() }
        <button onClick={()=>this.setState(_=>this.setState({ bol2: !_.bol2}))}>切换</button>
        <hr/>

        { this.renderRowLine() }
        <button onClick={()=>this.setState(_=>({row: (_.row+1)%4}))}>切换</button>
        <hr/>

        <h1 className={`foo ${this.state.cc}`}>千锋</h1>
        <button onClick={()=>this.setState({cc: 'box'})}>改变样式</button>
        <hr/>

        <h1 style={ {color: this.state.color, fontSize: '30px', display: this.state.show } }>教育</h1>
        <button onClick={()=>this.setState({color: 'blue'})}>改变样式</button>
        <button onClick={()=>this.setState(_=>({show: (_.show==='block'?'none':'block')}))}>显示/隐藏</button>
        <hr/>

        <div style={{
          border: '1px solid #ccc',
          height: '50px',
          ['padding'+this.state.how]: this.state.size+'px'
        }} />
        <button onClick={()=>this.setState(_=>{
          const whos = ['Top', "Left", 'Bottom', 'Right']
          return {
            how: whos[_.size%4],
            size: _.size + 1
          }
        })}>变化</button>
        <hr/>

        {
          this.state.list.map((ele,idx)=>{
            // do something
            let tmp = {...ele}
            tmp.age += 1
            if (tmp.age >= 20) {
              return (
                <div key={tmp.id}>姓名：{ tmp.name} 年龄：{tmp.age}</div>
              )
            }
          })
        }
        <hr/>

        {/* 单行注释 */}
        { this.state.list.map(ele=>(
          <div key={ele.id}>
            <span>姓名：{ ele.name}</span>
            <span> </span>
            <span>年龄：{ele.age}</span>
          </div>
        )) }
        <hr/>

        { this.renderUserList() }
        <hr/>

        { this.renderUserInfo() }
        <hr/>

        <h1>{ this.state.num }</h1>
        <button id='btn'>点击</button>



      </div>
    )
  }
}


export default StudyRender
