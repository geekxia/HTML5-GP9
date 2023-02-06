import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { Upload, message } from 'antd'

// antd(v2、v3、v4、v4.20、v5)
import ImgCrop from 'antd-img-crop'
// 注意：修改了antd-img-crop源码中的visible
// 与Form.Item进行双向通信的问题？？

export default ({ value, onChange }) => {

  // console.log('img upload value', value)
  const [list, setList] = useState([])
  useEffect(()=>{
    if (!value) setList([])
    if (value) setList([{ thumbUrl: CDN_URL+value }])
  }, [value])

  const { token } = useSelector(state=>state.user)

  const imgCheck = (file) => {
    const exts = ['image/jpg', 'image/png']
    if (!exts.includes(file.type)) {
      message.error('图片只能使用png/jpg格式', 1)
      return Promise.reject()
    }

    if (file.size/1024/1024 > 2) {
      message.error('图片不能超过2M', 1)
      return Promise.reject()
    }

    console.log('---图片验证成功')
    return Promise.resolve(file)
  }


  const imgChange = ({ file, fileList, event }) => {
    setList([...fileList])  // 解决Upload被fileList受控后只执行一次的问题
    // console.log('---file', file)
    // console.log('---fileList', fileList)
    // onChange会触发三次，最后一次才表示真正地成功
    if (file.status==='done') {
      const img = file.response.data.img
      // 把后端返回成功的图片地址，回传给父组件（Form.Item）
      onChange(img)
    }
  }

  return (
    <ImgCrop rotate>
      <Upload
        action={BASE_URL+'/api/v1/react/upload/img'}
        name='good'
        onChange={imgChange}
        onRemove={()=>onChange('')}
        listType="picture-card"
        headers={{
          Authorization: token
        }}
        beforeUpload={imgCheck}
        fileList={list}
      >
        {list.length === 0 && '+ Upload'}
      </Upload>
    </ImgCrop>
  )
}
