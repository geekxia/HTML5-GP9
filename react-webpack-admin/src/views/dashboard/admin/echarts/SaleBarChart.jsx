import { useEffect, useRef, useMemo } from 'react'
// import { useDebounce } from 'ahooks'
import { debounce } from '@/utils'

export default ({ data }) => {

  const ref = useRef(null)

  const [options, flag] = useMemo(()=>{
    let list1 = []
    let list2 = []
    let list3 = []
    let legendList = []
    let flag = false
    // 第一步，数据处理
    if (data.length>0) {
      list1 = [10,34,37,18,9,20]
      list2 = [20,14,67,8,19,20]
      list3 = [30,34,67,8,9,40]
      legendList = ['HTML5', 'Java', 'Python']
      flag = true
    }
    // 第二步，使用后端数据和echarts官方配置，设计options
    const options = {
      // 图表标题
      title: {
        text: '千锋销售分析',
        link: 'https://baidu.com',
        textStyle: {
          color: 'red'
        },
        left: 'center',
        top: 'bottom',
        padding: 15
      },
      // 图表图例
      legend: {
        data: legendList,
        padding: 15,
      },
      // 调色盘
      // color: ['#ff0000', '#00ff00', '#0000ff'],
      backgroundColor: '#ffffff',
      // 图表全局字体样式
      textStyle: {},
      // 全局的渲染动画
      animation: true,
      // 图表面板
      grid: {
        // width: 500,
        left: 50,
        right: 50,
        show: true,
        borderColor: '#ccc',
        backgroundColor: '#eee'
      },
      // 图表X轴
      xAxis: {
        // 类目
        data: ['二月', '三月', '四月', '五月', '六月', '七月'],
        position: 'bottom',
        name: '月份',
        nameLocation: 'end'
      },
      // 图表Y轴
      yAxis: {

      },
      // 图表提示框
      tooltip: {
        show: true,
        trigger: 'axis',
        borderColor: 'blue',
        textStyle: {
          color: 'red'
        }
      },
      // 图表工具栏
      toolbox: {
        show: true,
        top: 10,
        feature: {
          // dataZoom: {
          //   yAxisIndex: 'none'
          // },
          dataView: { readOnly: false },
          magicType: { type: ['line','stack'] },
          restore: {},
          saveAsImage: {
            title: '下载图片'
          }
        }
      },
      // 数据集（放置固定格式的数据对象）
      series: [
        {
          name: 'HTML5', // 图例名称
          type: 'bar',   // 指定什么类型的图表
          data: list1
        },
        {
          name: 'Java',
          type: 'bar',
          data: list2
        },
        {
          name: 'Python',
          type: 'bar',
          data: list3
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
      <div ref={ref} style={{maxWidth:'100%', height: '300px', margin:'0 auto'}} />
    </>
  )
}
