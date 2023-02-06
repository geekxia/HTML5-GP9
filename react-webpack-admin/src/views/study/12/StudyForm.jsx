// 1、表单绑定（讨论的是表单如何取值的问题）
  // - 在React中，表单是单向绑定的，意思是取表单的值只能通过表单事件来取值。
  // - 如何取表单的值？建议使用受控表单的方式进行取值。

// 2、两个重要概念
  // - 受控表单：表单的value属性或者checked属性，直接或间接地由声明式变量所控制着。反之，就是非受控表单。
  // - 受控组件：一个组件的自定义属性由声明式变量直接或间接控制着。反之，就是非受控组件。

// 3、React表单取值的小技巧
  // - 思路：当组件中有多个表单需要取值，我们可以复用onChange的事件处理器。
  // - 怎么实现？两种方式：事件传参，或者给表单添加name属性。

// 4、一个特殊的表单（文件上传）
  // - 文件上传：<input type="file" /> 是React中唯一的一个推荐用非受控的表单。

import { Component } from 'react'

class StudyForm extends Component {

  constructor (props) {
    super(props)
    this.state = {
      age: 0,
      gender: ''
    }
  }

  submit1 () {
    const data = {
      name: document.getElementById('name').value
    }
    console.log('----提交', data)
  }

  getFeildValue (ev) {
    const { value, name } = ev.target
    if (name==='gender') {
        this.setState({[name]: value})
    } else {
      this.setState({[name]: value})
    }
  }

  submit2 () {
    const data = {
      age: this.state.age
    }
    console.log('----提交', data)
  }

  render () {
    return (
      <div>
        <h1>学习表单绑定</h1>
        姓名：<input type="text" id='name' />
        <br/>
        <button onClick={()=>this.submit1()}>提交</button>
        <hr/>


          {/*年龄：<input type="number" value={this.state.age} onChange={ev=>this.getFeildValue(ev, 'age')} />
          <input type="radio" value='man' checked={this.state.gender==='man'} onChange={ev=>this.getFeildValue(ev, 'gender')} />男
          <input type="radio" value='woman' checked={this.state.gender==='woman'} onChange={ev=>this.getFeildValue(ev, 'gender')} />女*/}


        年龄：<input type="number" name='age' value={this.state.age} onChange={ev=>this.getFeildValue(ev)} />
        性别：
        <input type="radio" value='man' name='gender' checked={this.state.gender==='man'} onChange={ev=>this.getFeildValue(ev)} />男
        <input type="radio" value='woman' name='gender' checked={this.state.gender==='woman'} onChange={ev=>this.getFeildValue(ev)} />女

        <br/>
        <button onClick={()=>this.submit2()}>提交</button>
      </div>
    )
  }
}

export default StudyForm
