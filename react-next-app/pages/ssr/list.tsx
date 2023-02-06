import { useRouter } from 'next/router'

export async function getServerSideProps (ctx) {
  console.log('----ctx', ctx)
  // 在这里执行调接口

  const res = await fetch('https://cnodejs.org/api/v1/topics')
  const { data } = await res.json()
  console.log('---文章列表', data?.length)

  // 把数据返回到页面组件中去
  return {
    props: {
      list: data
    }
  }
}

const Page = ({ list }) => {

  const router = useRouter()

  return (
    <div>
      <h1>SSR页面</h1>
      <div>
      { list.map(ele=>(
        <h1 key={ele.id}
          onClick={()=>router.push('/ssr/'+ele.id)}
        >
          { ele.title }
        </h1>
      ))}
      </div>
    </div>
  )
}

export default Page
