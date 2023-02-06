import { useEffect, useState } from 'react'
import { Button } from 'antd'
import { useHistory, useSelector, useDispatch } from 'umi'

export default () => {
  const history = useHistory()
  const { num, list } = useSelector(state=>state.article)
  const dispatch = useDispatch()
  const [page, setPage] = useState<any>(1)

  useEffect(()=>{
    dispatch({ type: 'article/getList', payload: { page, limit: 5 } })
  }, [page])


  const skip = () => {
    history.push('/article/detail/666')
  }
  const handleAdd = () => {
    dispatch({ type: 'article/add', payload: 2 })
  }
  return (
    <div>
      <Button type='primary' onClick={skip}>跳转详情</Button>
      <h1>{ num }</h1>
      <Button type='primary' onClick={handleAdd}>自增</Button>
      <hr/>
      <Button type='primary' onClick={()=>setPage(p=>p+1)}>下一页</Button>
      {
        list.map(ele=>(
          <div key={ele.id}>{ele.title}</div>
        ))
      }
    </div>
  )
}
