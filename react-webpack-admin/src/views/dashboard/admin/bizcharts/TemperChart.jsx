import { useMemo } from 'react'
import { Chart, Line, Point, Tooltip, Legend } from 'bizcharts'

// 数据源
const response = [
	{
		month: "Jan",
		city: "Tokyo",
		temperature: 7
	},
	{
		month: "Jan",
		city: "London",
		temperature: 3.9
	},
	{
		month: "Feb",
		city: "Tokyo",
		temperature: 6.9
	},
	{
		month: "Feb",
		city: "London",
		temperature: 4.2
	},
	{
		month: "Mar",
		city: "Tokyo",
		temperature: 9.5
	},
	{
		month: "Mar",
		city: "London",
		temperature: 5.7
	},
	{
		month: "Apr",
		city: "Tokyo",
		temperature: 14.5
	},
	{
		month: "Apr",
		city: "London",
		temperature: 8.5
	},
	{
		month: "May",
		city: "Tokyo",
		temperature: 18.4
	},
	{
		month: "May",
		city: "London",
		temperature: 11.9
	},
	{
		month: "Jun",
		city: "Tokyo",
		temperature: 21.5
	},
	{
		month: "Jun",
		city: "London",
		temperature: 15.2
	},
	{
		month: "Jul",
		city: "Tokyo",
		temperature: 25.2
	},
	{
		month: "Jul",
		city: "London",
		temperature: 17
	},
	{
		month: "Aug",
		city: "Tokyo",
		temperature: 26.5
	},
	{
		month: "Aug",
		city: "London",
		temperature: 16.6
	},
	{
		month: "Sep",
		city: "Tokyo",
		temperature: 23.3
	},
	{
		month: "Sep",
		city: "London",
		temperature: 14.2
	},
	{
		month: "Oct",
		city: "Tokyo",
		temperature: 18.3
	},
	{
		month: "Oct",
		city: "London",
		temperature: 10.3
	},
	{
		month: "Nov",
		city: "Tokyo",
		temperature: 13.9
	},
	{
		month: "Nov",
		city: "London",
		temperature: 6.6
	},
	{
		month: "Dec",
		city: "Tokyo",
		temperature: 9.6
	},
	{
		month: "Dec",
		city: "London",
		temperature: 4.8
	}
];


export default ({ data }) => {

	const list = useMemo(()=>{
		// 对后端的data做处理
		return response
	}, [data])

	return (
    <Chart
			scale={{
				temperature: { min: 0 },
				city: {
					formatter: v => {
						return {
							London: '伦敦',
							Tokyo: '东京'
						}[v]
					}
				}
			}}
			padding={[20, 20, 60, 40]}
			autoFit
			height={420}
			data={list}
			interactions={['element-active']}
		>
      <Point position="month*temperature" color="city" shape='circle' />
      <Line shape="smooth" position="month*temperature" color="city" label="temperature" />
      <Tooltip shared showCrosshairs region={null} g2-tooltip-list-item={{display:'flex'}}/>
      <Legend background={{
        padding:[5,100,5,36],
        style: {
          fill: '#eaeaea',
          stroke: '#fff'
        }
      }} />

    </Chart>
  )
}
