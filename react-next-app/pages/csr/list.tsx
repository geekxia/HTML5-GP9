import { useState, useEffect } from 'react'
import { Link, useRouter } from 'next/router'
import useSWR from 'swr'

import styles from '../../styles/article.module.css'

// CSR
export default () => {
  const [num, setNum] = useState(1)  // 定时器
  const router = useRouter()  // 路由

  const { data } = useSWR(
    'https://cnodejs.org/api/v1/topics',
    (url) => fetch(url).then((res) => res.json())
  )

  useEffect(()=>{
    const timer = setTimeout(()=>{
      setNum(n=>n+1)
    }, 1000)
    return () => {
      clearTimeout(timer)
    }
  }, [num])

  return (
    <div>
      <h1>{ num }</h1>
      {
        (data?.data||[]).map(ele=>(
          <h1
            key={ele.id}
            onClick={()=>router.push('/csr/'+ele.id)}>
            { ele.title }
          </h1>
        ))
      }
      <hr/>
    </div>
  )
}
