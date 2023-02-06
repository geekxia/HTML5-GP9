import { FC } from "react"
import { useNavigate, useLocation } from "react-router-dom"

import { TabBar } from "antd-mobile"
import { tabRoutes } from "@/views"


const QfTabBar : FC<{}> = props => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <>
      <TabBar
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'white'
        }}
      >
        {
          tabRoutes.map(ele=>(
            <TabBar.Item
              key={ele.key}
              icon={
                (active)=>(
                  <span
                    style={{ color: pathname===ele.path ? 'red' : 'black' }}
                    onClick={()=>navigate(ele.path)}>
                      {ele.icon}
                    </span>
                )
              }
              title={<span style={{ color: pathname===ele.path ? 'red' : 'black' }}>{ele.text}</span>}
            />
          ))
        }
      </TabBar>
    </>
  )
}

export default QfTabBar
