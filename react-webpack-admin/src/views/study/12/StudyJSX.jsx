// 1、什么是JSX？JSX是一种语法糖，由React官方开源的，表示 JavaScript XML。

// 2、怎么理解JSX？在编写React组件时，JSX语法是可选的。如果不使用JSX语法，就免去了JSX代码的编译，但是编写组件就比较麻烦了。所以React官方推荐使用JSX语法来编写组件，从视觉上来讲，视图结构会更加清晰，但需要使用@babel/preset-react进行编译，编译得到React.createElement()这种浏览器能够读懂的代码。

// 3、语法：React.createElement('标签名', {属性列表}, [孩子们])  它的返回值，在React中被称之为“React元素”。扩展理解：createElement()返回值是“Fiber单元”，Fiber单元是“Fiber树”的最小的组成结构。 Fiber架构是React16发布的。

// 4、在JSX中，如果要使用变量，要用 {} 包起来，像这样 <div>{ a }</div>。被 {} 包起来的代码，就叫做表达式。也就是 {} 中只能使用表达式，不能使用JS语句。

// 5、在JSX语法中，组件名称的首字母都是大写的。一个常识，大阅读React代码，凡是首字母大写的函数变量都是"react组件"，凡是首字母小写的函数变量（无论它返回什么）都是普通函数。

// 6、JSX是变量、是对象、也是表达式。const ele = <div />，也就是说 ele是变量，是object类型，也是表达式。

// 7、JSX中有三个变化的属性：className（等于H5中的class属性）、tabIndex（等于H5中的tabindex属性）、htmlFor（等于H5中的for属性）。

// 8、JSX中有三个新增属性：ref（快捷DOM访问方式）、key（用于性能优化）、dangerouslySetInnerHTML（相当于vue中的v-html）。

// 9、JSX视图中，如果一个元素没有孩子（子元素），建议写闭合。像这样 <div /> 或 <Foo />。在编写JSX视图时，如果有子元素，可随意嵌套。

// 10、JSX可以随意嵌套，哪怕是后端返回的动态数据。像这样 <div>{ response.data.title }</div>。这种语法是安全的，因为JSX默认就支持防注入攻击（XSS）。

// 11、JSX是对象，为什么呢？因为JSX会被Babel编译成React.createElement()的函数调用，返回对象。所以JSX被称之为“React元素”。一个React元素（Fiber单元）大约长这样：{type:'类型',props:{chidren:[], ...}}。

// 12、因为JSX语法糖等价于React.createElement()语法，所以在任何用到JSX语法的JS模块作用域中都要先导入React这个类。在Webpack环境中，我们可以使用 webpack.ProviderPlugin()这个插件，一次性地向所有JS模块中注入React这个全局变量。

// 13、JSX支持“点语法”。像这样使用JSX元素：<React.Fragment />  或 <Qf.Swiper />

// 14、什么props？在React中，props是一个特别的概念，它表示父组件作用域传递给当前组件的属性们。在当前组件中，如何访问porps？如果是类组件，使用this.props来访问；如果是函数式组件，它的入参就是props。那么props可以是哪些数据类型呢？可以是基本数据类型、可以是数组、可以是对象、可以是函数、还可以是JSX变量。像这样 <Child disabled a='1' b={2} c={[1,2]} d={{a:1,b:2}} e={()=>{}} f={<div/>} />，在Child组件的props上可以接收这些数据。

// 15、当使用props向子组件传递函数类型的变量时，这里有一些规范说明。我们这样约定：如果这个函数在子组件是用于事件处理的，属性名建议这样命名'onHandlerSome..'；如果这个函数在子组件中用于视图渲染，属性建议这样命名'renderSome...'；如果这个函数是普通函数，不用于事件，也不用于视图渲染，属性名建议这样'formatDate..'。

// 16、在JSX语法中，传递props时，支持属性展开语法。像这样 <Child {...props} />。这种玩法在组件通信中叫做“属性穿透”。

// 17、props.children 在React这是一个特殊的props属性，它代表的是自定义组件内部所嵌套的变量（这个可能是JSX变量，也可能是一个渲染函数）。约定，在封装组件时，你的自定义属性不要用'children'这个名字。

// 18、在JSX语法中，数组是一种重要的数据类型。JSX支持对数组的直接渲染。像这样 <div>{ [<div/>, <a/>] }</div>。这是列表渲染的语法基础。所以你们经常可以看到这样的渲染函数： render(){ return [] }。注意：当JSX直接渲染数组，常常需要添加key属性。

// 19、在JSX渲染视图时，{} 中的变量如果是布尔值、null、undefined这三种，将被直接忽略，不渲染任何内容。

// 20、JSX是变量，是对象，并且是“不可变对象”。也就是说，JSX变量一旦声明，我们在业务逻辑中不能对JSX变量直接修改。具体的意思是，因为JSX是{type,props}这样的对象结构，这个对象是不可变的。进一步理解，JSX变量（Fiber单元）是渲染真实的原材料。

import React, { Component } from 'react'

// const view1 = (
//   <div title='千锋' className='qf'>
//     <h1 id='box'>学习JSX语法</h1>
//     <ul>
//       <li>第一行</li>
//       <li>第二行</li>
//     </ul>
//   </div>
// )


// const view2 = React.createElement(
//   'div',
//   { title: '千锋', className: 'qf' },
//   [
//     React.createElement('h1', { key:1, id:'box' }, '学习JSX语法'),
//     React.createElement('ul', { key:2 }, [
//       React.createElement('li', { key: 3 }, '第一行'),
//       React.createElement('li', { key: 4 }, '第二行')
//     ])
//   ]
// )

// 在JSX眼中，这是React组件，使用<Foo />
function Foo () {
  return <div>你好</div>
}

// 在JSX眼中，这是普通函数，使用 foo()
function foo () {
  // 任何JS语句
  return <div>世界</div>
}

// const f = <Foo />
// const f = React.createElement(Foo, {})  // Fiber
// console.log(typeof f)

// 点语法
const Qf = {
  Swiper: () => <div>轮播图</div>,
  Tabbar: function () { return <div>底部菜单</div> }
}


// 这两个是标准的React组件
const Swiper = () => <div>轮播图</div>
const Grid = () => <div>九宫格</div>
// 这是一个非常普通的对象
const qf = {
  s: Swiper,
  g: Grid
}
// 这是一个组件
const Story = props => {
  const { type } = props
  const Result = qf[type]
  // 注意：在JSX视图，<>里面的变量名首字母都必须大写！！！
  return <Result />
}

function Child (props) {
  console.log('---child props', props)
  const { renderFooter, onChange, ...otherProps } = props // 属性过滤
  return (
    <div>
      <div>孩子</div>
      { renderFooter() }
      <GrandChild {...otherProps}  />
    </div>
  )
}

function GrandChild (props) {
  console.log('---GrandChild props', props)
  return <div>孙子</div>
}

function Modal (props) {
  console.log('---Modal props', props)

  const { children } = props
  let res = null
  if (typeof children === 'function') {
    res = children()
  } else {
    res = children
  }

  return (
    <div style={{border:'1px solid #ccc'}}>
      <div>我是弹框</div>
      { res }
    </div>
  )
}

function GridBox (props) {
  const { num } = props
  let result = []
  for (let i=0; i<num; i++) {
    let row = []
    for (let j=0; j<num; j++) {
      const text = i*3 + j
      row.push(
        <span
          key={text}
          style={{
            display:'inline-block',
            width:'50px',
            height:'50px',
            border:'1px solid #ccc'
          }}
        >
          { text }
        </span>
      )
    }
    result.push(<div key={i}>{ row }</div>)
  }
  return result
}

class StudyJSX extends Component {
  calTotal (a, b) {
    return a + b
  }
  render () {
    const { Tabbar } = Qf
    const bar = true
    const obj = { m: '千锋', n: '教育' }

    let cc = <div>测试不可变变量</div>
    // cc['name'] = 'cc'  // wrong
    // delete cc.type   // wrong
    cc = <a href=""></a>  // ok

    return (
      <div>
        <h1 className='box'>{ 1+2 }</h1>
        <h1>{ Math.random() }</h1>
        <h1>{ this.calTotal(1,2) }</h1>
        <hr/>
        <Foo>呵呵</Foo>
        <hr/>
        { foo() }
        <hr/>
        <label htmlFor='x'>姓名：</label>
        <input name='x' type="text" tabIndex='80' /><br/>
        <label htmlFor='y'>密码：</label>
        <input name='y' type="text" tabIndex='2' /><br/>
        <hr/>
        <Qf.Swiper />
        <Tabbar />
        <hr/>
        <Story type='g' />
        <Story type='s' />
        <hr/>
        <Child
          a='1'
          b={ 2 }
          c
          d={ [1,2,3] }
          e={ { a:1, b:2, c:<div/>, bar } }
          f={ ()=>console.log('---') }
          g={ <div>你好</div> }
          h={ [undefined, true, null, 1, <div />] }
          i={ Math.random() * 100 }
          onChange={ev=>console.log('收到孩子的消息', ev)}
          renderFooter={()=>(<footer>自定义底部</footer>)}
          format={(arg)=>(arg*100)}
          { ...obj }
        />
        <hr/>

        <Modal>100</Modal>
        <Modal>{ 200 }</Modal>
        <Modal>{ true }</Modal>

        <Modal>
          <div>主体内容</div>
          <div>你好</div>
        </Modal>

        <Modal>{ ()=>(<div>自定义主体内容</div>) }</Modal>

        <div>{`Hello ${this.props.msg || 'World'}`}</div>
        <div>Hello {this.props.msg || 'World'}</div>

        <GridBox num={3} />
      </div>
    )
  }
}

export default StudyJSX
