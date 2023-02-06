
// 用于给列表页面对应的详情文章，生成对应的路由
export async function getStaticPaths(ctx) {
  const res = await fetch('https://cnodejs.org/api/v1/topics')
  const { data } = await res.json()
  console.log('---文章列表', data?.length)
  return {
    paths: data.map(ele=>(
      { params: { id: ele.id } }
    )),
    fallback: false,   // 如果访问不到paths中的路由，给一个404页面
  }
}


// 用paths方法返回的路由数组，执行再次调接口
export async function getStaticProps (ctx) {
  const id = ctx.params.id

  const res = await fetch(' https://cnodejs.org/api/v1/topic/'+id, {
    data: JSON.stringify({
      accesstoken: 'd9346378-924f-435b-a835-9fad64acaba9'
    })
  })
  const { data } = await res.json()
  // 数据各种处理
  return {
    props: {
      info: data
    }
  }
}

export default ({ info }) => {
  return (
    <div>
      <h1>详情页</h1>
      <div dangerouslySetInnerHTML={{__html: info.content}}></div>
    </div>
  )
}
