import { useRouter } from 'next/router'

export async function getStaticProps (ctx) {

  const res = await fetch('https://cnodejs.org/api/v1/topics')
  const { data } = await res.json()
  console.log('---文章列表', data?.length)
  return {
    props: {
      list: data
    }
  }
}

export default ({ list }) => {
  const router = useRouter()

  return (
    <div>
      <h1>SSG页面</h1>
      <div>
      { list.map(ele=>(
        <h1 key={ele.id}
          onClick={()=>router.push('/ssg/'+ele.id)}
        >
          { ele.title }
        </h1>
      ))}
      </div>
    </div>
  )
}
