import { useEffect, useRef, useMemo } from 'react'
// import { useDebounce } from 'ahooks'
import { debounce } from '@/utils'

export default ({ data }) => {

  const ref = useRef(null)

  const [options, flag] = useMemo(()=>{
    let list = []
    let flag = false
    // 第一步，数据处理
    if (data.length>0) {
      list = [
        { value: 2048, name: '技术力' },
        { value: 735, name: '项目力' },
        { value: 580, name: '开发力' }
      ]
      flag = true
    }
    // 第二步，使用后端数据和echarts官方配置，设计options
    const options = {
      title: {
        text: '千锋学员能模型',
        left: 'center',
        top: 'bottom',
        padding: 15
      },
      tooltip: {
        trigger: 'item'
      },
      backgroundColor: 'white',
      legend: {
        top: '5%',
        left: 'center'
      },
      color: ['red', 'green', 'blue'],
      series: [
        {
          name: '技术力',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '40',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: list
        }
      ]
    }
    return [options, flag]
  }, [data])

  useEffect(()=>{
    // 第一步，实例化echarts图表对象
    const main = echarts.init(ref.current)
    // 第四步：添加图表响应监听
    // 注意要实现图表的响应式，各种宽度都写活！！！
    // 添加防抖，节省性能！！
    const handler = debounce(() => main.resize(), 500)
    window.addEventListener('resize', handler)

    if (flag) {
      // 第三步，渲染Echarts图表
      main.setOption(options)
      main.resize()
    }
    return () => {
      window.removeEventListener('resize', handler)
    }
  }, [flag])

  return (
    <>
      {/* 图表的挂载节点 */}
      <div ref={ref} style={{maxWidth:'100%', height: '300px', margin:'0 auto' }} />
    </>
  )
}
