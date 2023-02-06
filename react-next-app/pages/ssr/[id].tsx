export async function getServerSideProps (ctx) {
  console.log('----ctx', ctx.query)

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
