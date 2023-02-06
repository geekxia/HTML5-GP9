import { useState, useEffect, FC } from 'react'

import { PullToRefresh, List, InfiniteScroll } from 'antd-mobile'

import QfTabBar from '@/components/tabbar'
import { getList, toggleFlag } from '@/store/slices/article'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'

// 在组件化中使用TS
interface QfItemProps {
  id: string,
  title: string,
  [key: string] : any
}

const QfItem: FC<QfItemProps> = props => {
  const { id , title } = props
  return (
    <div>
      <div>{ id }</div>
      <div>{ title }</div>
    </div>
  )
}

const Find: React.FC<{}> = () => {

  const dispatch = useAppDispatch()

  // 当hasMore=false时，loadMore不执行！！
  const [hasMore, setHasMore] = useState<boolean>(false)
  const [params, setParams] = useState<API.CnodoParams>({page:1,limit:30})
  // 数据流
  const { list } = useAppSelector(state=>state.article)

  // 初始化第一次触发调接口渲染
  useEffect(()=>{
    console.log('---0')
    if (list.length === 0) {
      // 在@reduxjs/toolkit中，dispatch()是基于Promise封装的！
      dispatch(toggleFlag(0))  // 通知store正在初始化
      dispatch(getList(params)).then((res:any)=>{
        setHasMore(true)  // 开启触底加载（loadMore）
      })
    }
  }, [])

  return (
    <div style={{paddingBottom: '1.5rem' }}>
      <PullToRefresh
        onRefresh={async () => {
          console.log('---1')
          await dispatch(toggleFlag(1))  // 通知store正在下拉刷新
          await dispatch(getList({...params, page:1}))
          setParams(p=>({...p, page: 1}))
        }}
      >
        <List>
          {
            list.map(ele=>(
              <List.Item key={ele.id}>
                <QfItem id={ele.id} title={ele.title} />
              </List.Item>
            ))
          }
        </List>
        <InfiniteScroll
          threshold={50}
          loadMore={
            async () => {
              console.log('---2')
              // 正确的写法
              await dispatch(toggleFlag(2))  // 通知store正是触底
              await dispatch(getList({...params, page: params.page + 1}))
              setParams(p=>({...p, page: p.page + 1}))
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
