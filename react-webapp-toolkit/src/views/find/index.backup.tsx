import { useState, useEffect } from 'react'

import { PullToRefresh, List, InfiniteScroll } from 'antd-mobile'

import QfTabBar from '@/components/tabbar'
import { getList } from '@/store/slices/article'
import { useAppDispatch } from '@/hooks/redux'

const Find: React.FC<{}> = props => {

  const dispatch = useAppDispatch()

  // 当hasMore=false时，loadMore不执行！！
  const [hasMore, setHasMore] = useState<boolean>(false)
  const [params, setParams] = useState<API.CnodoParams>({page:1,limit:30})
  // 不走流程
  const [list, setList] = useState<any[]>([])

  // 初始化第一次触发调接口渲染
  useEffect(()=>{
    // console.log('---0')
    if (list.length === 0) {
      // 在@reduxjs/toolkit中，dispatch()是基于Promise封装的！
      dispatch(getList(params)).then((res:any)=>{
        setList(res.payload)
        setHasMore(true)  // 开启触底加载（loadMore）
        console.log('---res', res)
      })
    }

  }, [])

  return (
    <div style={{paddingBottom: '1.5rem' }}>
      <PullToRefresh
        onRefresh={async () => {
          console.log('---1')
          // dispatch(toggleFlag(true))
          const res: any = await dispatch(getList({...params,page:1}))
          // 取出最新列表数据，重置list
          setList(res.payload)
        }}
      >
        <List>
          {
            list.map(ele=>(
              <List.Item key={ele.id}>{ele.title}</List.Item>
            ))
          }
        </List>
        <InfiniteScroll
          threshold={50}
          loadMore={
            async () => {
              console.log('---2')
              // 修改入参
              setParams((p:any)=>({...p, page: p.page+1}))
              // 正确的写法
              const res: any = await dispatch(getList(params))
              // 取出下一页数据，追加到list中去！
              setList(list=>([...list, ...res.payload]))
            }
          }
          hasMore={hasMore}
          children={<>没有了</>}
        />

      </PullToRefresh>
      <QfTabBar />
    </div>
  )
}

export default Find
