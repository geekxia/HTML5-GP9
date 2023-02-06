// 1、父子组件通信
  // - 约定：当我们谈论组件关系时，谈论的是自定义封装组件，不包括那些普通的JSX节点。
  // - 父传子，使用自定义属性（props普通属性）
  // - 子传父，使用自定义事件（props事件属性，一般事件属性以onHandler进行命名）

// 2、状态提升
  // - 什么是状态提升？在React中，当两个组件（一般是兄弟关系）需要通信时，我们通常的做法是找到这两个组件最近的父级组件，然后这个需要共享的状态变量定义在这个父级组件中，再通过props向下传输来实现。
  // - 状态提升是一种最基础的组件间的通信方案。

// 3、组件的props校验
  // - 官方推荐：cnpm i prop-types -S
  // - Component.propTypes = { } 校验属性类型，以及是否必填。

// 4、组件的props默认值
  // - Component.defaultProps = {}  给非必填的props添加默认值

import { Component } from 'react'
import PropTypes from 'prop-types'

function ChildA (props) {
  // console.log('---ChildA props', props)
  const { value, onChange } = props

  const arr = [
    { id: 1, lang: 'zh', label: '中文' },
    { id: 2, lang: 'en', label: '英文' },
    { id: 3, lang: 'jp', label: '日文' },
    { id: 4, lang: 'fr', label: '法文' },
  ]

  return (
    <>
      <div>我是A组件</div>
      <div>
      {
        arr.map(ele=>(
          <span
            key={ele.id}
            style={{
              display: 'inline-block',
              padding: '15px',
              border: '1px solid #ccc',
              cursor: 'pointer',
              color: value === ele.lang ? 'red' : 'black'
            }}
            onClick={()=>{
              console.log('----clicked', ele)
              onChange(ele.lang) // 调用父组件给的自定义事件，并回传数据！！
            }}
          >
            {ele.label}
          </span>
        ))
      }
      </div>
    </>
  )
}

function Celsius (props) {
  return (
    <div>
      摄氏温度：<input type="text" {...props} />
    </div>
  )
}

class Fahrenheit extends Component {
  render () {
    return (
      <div>
        华氏温度：<input type="text" {...this.props} />
      </div>
    )
  }
}

function ChildB (props) {
  return (
    <div>
      <div>我是B组件</div>
    </div>
  )
}
// props属性校验
ChildB.propTypes = {
  name: PropTypes.string.isRequired,  // isRequired表示必填，并且现在要求写在最后
  age: PropTypes.number,
  show: PropTypes.bool,
  list: PropTypes.array,
  onRun: PropTypes.func,
  header: PropTypes.element, // ReactElement类型（null | undefined | <jsx/>）
  footer: PropTypes.node,    // ReactNode类型（ReactElement类型 | string | number | array）
  body: PropTypes.elementType, // func | string | React组件 | null | undefined
  dog: PropTypes.instanceOf(Dog),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),  // 类型之一
  size: PropTypes.oneOf(['middle','default','mini']),  // 文本类型
  // 对象类型
  info: PropTypes.shape({
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    addr: PropTypes.string,
    children: PropTypes.array
  }),
  phone: PropTypes.any,   // 任意类型
}
// 给组件的props添加默认值
ChildB.defaultProps = {
  age: 0
}

function Dog() {}

class StudyLift extends Component {
  constructor (props) {
    super(props)
    this.state = {
      lang: 'zh',
      temper: 0  // 需要在两个子组件中共享的那个状态
    }
  }
  render () {
    const { lang, temper } = this.state
    return (
      <div>
        <h1>学习状态提升</h1>
        <ChildA value={lang} onChange={lang=>{
          this.setState({ lang })
        }} />
        <hr/>

        <Celsius
          value={temper}
          onChange={
            ev => {
              this.setState({
                temper: Number(ev.target.value)
              })
            }
          } />
        <hr/>

        <Fahrenheit
          value={temper*9/5+32}
          onChange={
            ev=>{
              const { value } = ev.target
              this.setState({temper: (value - 32) *5 / 9 })
            }}
        />
        <hr/>

        <ChildB
          name='张三'
          age={20}
          show
          list={[1,2]}
          onRun={()=>{}}
          header={<div>你好</div>}
          footer={[1,2,<div>3</div>]}
          body={ Celsius }
          dog={new Dog()}
          width={100}
          size='mini'
          info={{
            name: '李四',
            age: 2,
            addr: '深圳',
            children: []
          }}
        />
      </div>
    )
  }
}

export default StudyLift
