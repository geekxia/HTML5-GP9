export async function  getServerSideProps (ctx) {
  const res = await fetch('http://localhost:3000/api/v1/cheer')
  const { data } = await res.json()
  console.log('---about data', data)
  return {
    props: {
      content: data.content
    }
  }
}

export default ( {content} ) => {
  return (
    <>
    <div>关于我</div>
    <div dangerouslySetInnerHTML={{__html: content}}>{  }</div>
    </>
  )
}
