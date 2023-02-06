import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Select } from 'antd'

import { getAllCates } from '@/store/actions'

const { Option } = Select

export default props => {

  const dispatch = useDispatch()
  const { cates } = useSelector(state=>state.good)

  useEffect(()=>{
    // 走流程，派发一个调接口的function，给到redux-thunk
    dispatch(getAllCates())
  }, [])

  return (
    <Select
      style={{ width: '100%' }}
      placeholder='全部'
      {...props}
    >
      {
        cates.map(ele=>(
          <Option key={ele._id} value={ele.cate}>{ele.cate_zh}</Option>
        ))
      }
    </Select>
  )
}
