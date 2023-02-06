import { useState, useEffect } from 'react'

import { Col, Row } from 'antd'

import SaleBarChart from './echarts/SaleBarChart'
import StuPieChart from './echarts/StuPieChart'

import TemperChart from './bizcharts/TemperChart'

// Echarts使用：实例化图表，用后端data数据设计options、调用setOption()渲染图表！
// BizCharts使用：用antd组件的使用方式是一样的。

export default () => {
  const [list1, setList1] = useState([])
  const [list2, setList2] = useState([])
  useEffect(()=>{
    const timer = setTimeout(()=>{
      setList1([1,1])
      setList2([2,2])
    }, 100)
  }, [])

  return (
    <div>
      <Row>
        <Col span={12}>
          <SaleBarChart data={list1} />
        </Col>
        <Col span={12}>
          <StuPieChart data={list2} />
        </Col>
      </Row>

      <Row style={{marginTop:'20px'}}>
        <Col span={24}>
          <TemperChart />
        </Col>
      </Row>

    </div>
  )
}
