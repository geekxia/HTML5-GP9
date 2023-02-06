import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default () => {
  const [content, setContent] = useState('')
  const { query } = useRouter()
  const id = query.id

  useEffect(()=>{
    // 在useEffect中使用async/await同步代码！！
    async function getList () {
      const res = await fetch(' https://cnodejs.org/api/v1/topic/'+id, {
        data: JSON.stringify({
          accesstoken: 'd9346378-924f-435b-a835-9fad64acaba9'
        })
      })
      const { data } = await res.json()
      console.log('---文章详情', data)
      setContent(data.content)
    }
    if (id) getList()  // 当id存在时，获取文章详情
  }, [id])

  return (
    <div>
      <h1>详情页 { query.id }</h1>
      <div dangerouslySetInnerHTML={{__html: content}}></div>
    </div>
  )
}
