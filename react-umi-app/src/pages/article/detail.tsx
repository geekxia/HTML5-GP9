import { useParams } from 'umi'

export default () => {
  const { id } = useParams()
  return (
    <div>
      详情页 { id }
    </div>
  )
}
