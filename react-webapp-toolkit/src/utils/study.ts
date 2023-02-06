import { BlobOptions } from "buffer"
import { type } from "os"
import React from "react"

let a: number = 100
a = 200
const b: string = 'hello'
const c: boolean = true

const d: null = null
const e: undefined = undefined

// 数组类型
const f: Array<number> = [1,2,3]
const g: number[] = [1,2,400]

const h: number[][] = [[1,1,1], [2,2]]
const i: Array<Array<string>> = [['a'], ['b'], []]
const j: Array<boolean[]> = [[false], [true]]

// any类型
let k: any = 100
k = 'hello'

// 字面量类型
let l: 'qf' = 'qf'
let m: 'done' | 'doing' = 'done'
m = 'doing'

// 枚举类型（数据有限、并且不重复）
// 枚举一般用在中英文转换上！！
enum Cate {
  office = '办公用品',
  car = '汽车用品',
  clothe = '男装女装'
}
console.log('---', Cate.car)
let ck = 'clothe'
console.log('---', Cate[ck])

// 元组（本质上就是数组）
// 元组的特点：长度是固定的，并且每个位置上的类型也是固定的。
// 元素不是什么新的API，就是一种类型的写法！！
let t: [string, number, boolean, 'qf', null[]] = ['', 1, false, 'qf', [null]]
console.log(t[0])
console.log(t.length)

// 函数类型（入参类型、返回值类型）
function add (a: number, b?: number) : string {
  if (b) {
    return a + b + ''
  }
  return a  + ''
}

const s1: string = add(10, 20)
const s2: string = add(30)

// 函数重载（函数名相同，参数数量、参数类型、返回值类型至少有一个不同，就叫做函数重载）
// function sub (a: number) : number
// function sub (b: string) : string
// function sub (c: number, b: number) : number {
//   // 编写实现代码
// }

const Home1: React.FC = () => {
  return null
}

interface Child {
  name: string,
  age: number,
  id: number
}

// 对象类型（形状、接口）
interface Person { 
  name: string,   // 必有属性
  age: number, 
  addr: string, 
  status: 'alive' | 'dead',
  mobile?: string,  // 可选属性
  children?: Child[],
  // [propName: string]: any, // 支持扩展属性
  [key: string]: any,
  onRun: (s: number) => number,  // 约定入参类型和返回类型
  readonly id: number,  // 只读属性
}

let zs: Person  = {
  name: '张三',
  age: 20,
  addr: '广东深圳',
  status: 'alive',
  mobile: '110',
  children: [
    { id: 1, name: '老大', age: 10 },
    { id: 2, name: '老二', age: 5 }
  ],
  gender: 'man',
  lucky: 1,
  level: true,
  onRun: (a: number) => {
    // do something
    return a + 2
  },
  id: 1000
}

zs.onRun(30)
zs.name = '李四'

// 类型别名
type Point = { x: number, y: number }
const p1: Point = { x: 1, y: 2 }
const p2: Point = { x: 10, y: 200 }

type N = string | number | boolean | null
const n1: N = 'nn'
const n2: N = null

type S = 'pending' | 'fulfilled' | 'rejected'
const s3: S = 'rejected'

// interface和type的区别
// 1、interface自定义类型，可以参与面向对象编程；type类型别名，只能使用“类型交叉（&）”进行继承。
// 2、interface自定义类型支持重复定义（自动合并）；而type自定义不支持重复定义。
// 3、interface不能用于定义“类型交叉”和“类型联合”；而type可以用来定义“类型交叉”和“类型联合”。

type A = {
  x: number,
  y: number
}
type B = A & {
  z: number
}
const o1: B = { x: 1, y: 2, z: 3 }

interface C {
  a: boolean
}
interface C {
  b: number,
  c?: string
}
const o2: C = {
  a: true,
  b: 100
}

interface D {
  d: number
}

type E = C | D   // 类型联合
const e1: E = {
  b: 100,
  a: true
}
type F = C & D   // 类型交叉
const e2: F = {
  a: true,
  b: 100,
  d: 200
}

function run1 (arg: string) : void {

}
run1('hehe')

function run2 (arg: number): void {

}
run2(100)

// 泛型：当我们定义interface类型、函数类型、class类时，用类型占位符指定类型，当真正使用时再给出具体的类型。
function run<T, U> (a: T, b?: U) : void {

}
run<string, string>('hehe', 'hehe')
run<number, null>(100, null)
run<boolean[], any>([true, false], 100)

interface ModalProps {
  open?: boolean,
  title: string
}

const Modal: React.FC<ModalProps> = (props) => {
  const [num, setNum] = React.useState<number>(1)
  return null
}

interface H<T, U> {
  a: T,
  b: U,
  c: string
}
const h1: H<number, boolean> = {
  a: 100,
  b: true,
  c: 'cccc'
}

function eat<T extends Date> (a: T) : void {

}
eat<Date>(new Date())

type T = [string, number, boolean]  // 元组
const tt: T = ['aa', 10, true]


interface QfArray {
  [index: number]: number,
  length: number
}
const qfa: QfArray = [1,2,3]


const x: Qf = {
  a: 'eh',
  b: 1
}




export default {}