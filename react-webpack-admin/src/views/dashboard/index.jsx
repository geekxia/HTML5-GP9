import { useSelector } from 'react-redux'
import { useMemo } from 'react'

import Admin from './admin'
import Editor from './editor'
import './style.scss'

export default () => {
  const { roles } = useSelector(state=>state.user)

  const isAdmin = useMemo(()=>{
    // 需求：如果roles中有admin，就显示Admin；否则显示Editor。
    return roles.includes('admin')
  }, [])

  return (
    <div className='dashboard'>
      { isAdmin ? <Admin /> : <Editor /> }
    </div>
  )
}
