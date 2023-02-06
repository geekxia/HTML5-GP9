import { useNavigate } from 'react-router-dom'
import { useEffect, useState, useMemo } from 'react'
import { useSelector } from 'react-redux'

import { Row, Col, Input, Select, DatePicker, Button, Tag, Space, Table, Tooltip, Image, Modal } from 'antd'
import { SettingOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import './style.scss'
import { useRequest } from 'ahooks'
import moment from 'moment'

import GoodSelect from './components/GoodSelect'
import { fetchGoodList, fetchGoodDel } from '@/api'
import Submit from '@/components/submit'

const { Option } = Select
const { RangePicker } = DatePicker
const { confirm } = Modal

// 导入Excel表：file-saver、xlsx
const formatJson = (filterVal, list) => {
  return list.map(v => filterVal.map(j => {
    if (j === 'hot') {
      return v[j] ? '是' : '否'
    }
    if (j==='create_time') {
      return moment(v[j]).format('YYYY年MM月DD日')
    }
    return v[j] // 不处理
  }))
}

// 在页面组件中调接口的一些小知识点
// 1、在useEffect中如何编写async/await代码？自己封装async函数并调用；使用useAsyncEffect来实现。
// 2、关注一下ahooks中的 useRequest(fetchAPI)
// 3、切忌：useEffect(async ()=>{})这样使用，不规范，会影响副作用的执行浏览。

export default () => {

  const navigate = useNavigate()  // navigate(-1/'/good/add', { replace: true })
  const { cates } = useSelector(state=>state.good)

  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)
  const [date, setDate] = useState([])
  const [tableKeys, setTableKeys] = useState([])
  const [count, setCount] = useState(0)
  const [filter, setFilter] = useState({
    page: 1,
    size: 10,
    name: '',
    cate: ''
  })

  useEffect(()=>{
    fetchGoodList(filter).then(res=>{
      console.log('---商品列表', res)
      if (res.list) {
        setList(res.list)
        setTotal(res.total)
      }
    })
  }, [count])

  const columns = useMemo(()=>(
    [
      {
        title: '商品名称',
        dataIndex: 'name',
        align: 'center',
        key: 'name',
        // 自定义渲染单元格（*）
        render: (text, row, idx) => {
          // do something
          return (
            <div style={{textAlign:'center'}}>
              <Image src={CDN_URL+row.img} width={80} />
              <div>{ row.name }</div>
            </div>
          )
        }
      },
      {
        title: '商品价格',
        dataIndex: 'price',
        key: 'price',
        align: 'center',
        sorter: (a, b) => (a.price - b.price),
        render: (text) => <div>{`￥${text}`}</div>
      },
      {
        title: '商品品类',
        dataIndex: 'cate',
        key: 'cate',
        align: 'center',
        // 单元格渲染
        render: (text) => {
          let result = null
          if (cates.length > 0) {
            result = cates.find(ele=>ele.cate===text)
          }
          return result?.cate_zh
        }
      },
      {
        title: '是否热销',
        dataIndex: 'hot',
        key: 'hot',
        align: 'center',
        // 单元格渲染
        render: (text) => {
          return text ? '是' : '否'
        }
      },
      {
        title: '发布时间',
        dataIndex: 'create_time',
        key: 'create_time',
        align: 'center',
        // 单元格渲染
        render: (text) => {
          return moment(text).format('YYYY年MM月DD')
          // moment().format()  把时间戳转换成格式化字符
          // moment().valueOf()  把格式化字符串变成时间戳
        }
      },
      {
        title: '操作',
        key: 'handler',
        align: 'center',
        dataIndex: 'handler',
        render: (_, row) => (
          <>
            <Button type='primary'
              onClick={()=>{
                navigate('/good/edit/'+row._id)
              }}
            >编辑</Button>
            <Button
              danger
              disabled={tableKeys.length>0}
              style={{marginLeft:'10px'}}
              onClick={()=>{

                confirm({
                  title: `你确定要删除 ${row.name} 吗？`,
                  icon: <ExclamationCircleOutlined />,
                  onOk() {
                    const ids = row._id
                    fetchGoodDel(ids).then(()=>{
                      setCount(c=>c+1)
                    })
                  }
                });
              }}
            >删除</Button>
          </>
        ),
      }
    ]
  ), [cates, list, tableKeys])

  return (
    <div className='good-list'>
      <div className='filter'>
        <Row align='middle' >
          <Col span={2} style={{textAlign:'right'}}>商品名称：</Col>
          <Col span={4}>
            <Input
              placeholder='请输入商品名称'
              allowClear
              value={filter.name}
              onChange={ev=>setFilter(f=>({...f,name:ev.target.value}))}
            />
          </Col>
          <Col span={3} style={{textAlign:'right'}}>商品名称：</Col>
          <Col span={4}>
            <GoodSelect
              allowClear
              value={filter.cate}
              onChange={cate=>setFilter(f=>({...f,cate}))}
            />
          </Col>
          <Col span={3} style={{textAlign:'right'}}>日期搜索：</Col>
          <Col span={6}>
            <RangePicker value={date} onChange={ev=>{
              // antd时间选择器组件，取值结果是moment对象
              console.log('------时间选择器', ev[0].valueOf())
              console.log('------时间选择器', ev[1].format('YYYY-MM-DD'))
            }} />
          </Col>
        </Row>
        <Row align='middle' style={{marginTop:'20px'}}>
          <Col className='btns'>
            <Button type='primary' onClick={()=>{
              setFilter(f=>({...f, page:1}))
              setCount(c=>c+1)
            }}>查询</Button>
            <Button
              type='primary'
              onClick={()=>{
                setFilter(f=>({...f,name:'',cate:''}))
                setCount(c=>c+1)
              }}
            >重置</Button>
            <Button
              type='primary'
              onClick={()=>{
                // 动态导入语法（目前浏览器不支持）
                import('@/utils/Export2Excel').then(excel => {
                  // 设定Excel表头
                  const tHeader = ['商品名称', '价格', '品类', '是否热销', '发布时间']
                  const filterVal = ['name', 'price', 'cate', 'hot', 'create_time']

                  // 对Excel单元格中的数据进行格式化
                  const data = formatJson(filterVal, list)
                  console.log('---excel', excel)

                  excel.export_json_to_excel({
                    header: tHeader,  //  Excel表的表头
                    data,
                    filename: 'qf-good'
                  })
                })
              }}
            >导出</Button>
          </Col>
        </Row>
      </div>

      <div className='table'>
        <Table
          columns={columns}
          dataSource={list}
          rowKey='_id'
          title={()=>{
            // do something [render props]
            return (
              <Row >
                <Col span={2}>查询表格</Col>
                <Col span={8} offset={14} style={{textAlign:'right'}} className='header'>
                  <Button
                    type='primary'
                    onClick={
                      ()=>navigate('/good/add')
                    }>
                    新增
                  </Button>
                  <Tooltip title='列设置' placement='top'>
                    <SettingOutlined />
                  </Tooltip>

                </Col>
              </Row>
            )
          }}
          rowSelection={{
            // 在首列添加多选
            type: 'checkbox',
            onChange: (keys, rows) => {
              setTableKeys(keys)
            }
          }}
          pagination={{
            pageSizeOptions: [2,5,10,20],
            showSizeChanger: true,
            current: filter.page,
            pageSize: filter.size,
            total,
            showTotal: (t, r) => {
              // console.log('--t', t)
              // console.log('--r', r)
              return <div>{`第 ${r[0]}-${r[1]} 条/总共 ${t} 条`}</div>
            },
            onChange: (page, size) => {
              console.log('----A', page, size)
              setFilter(f=>({...f, page, size}))
              setCount(c=>c+1)
            },
            onShowSizeChange: (page, size) => {
              // console.log('----B', page, size)
              // setFilter(f=>({...f, size, page}))
              // setCount(c=>c+1)
            }
          }}
        />
      </div>
      <Submit>
        <Button
          danger
          disabled={tableKeys.length===0}
          onClick={()=>{
            console.log('---删除', tableKeys)
            confirm({
              title: '你确定要批量删除吗？',
              icon: <ExclamationCircleOutlined />,
              onOk() {
                const ids = tableKeys.reduce((prev, ele)=>(prev+=(';'+ele)), '')
                // console.log('---ids', ids)
                fetchGoodDel(ids).then(()=>{
                  setTableKeys([])
                  setCount(c=>c+1)
                })
              }
            });
          }}
        >
          批量删除
        </Button>
      </Submit>
    </div>
  )
}
