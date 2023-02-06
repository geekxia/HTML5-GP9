import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const modules = {
  // 定制富文本工具栏
  toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline','strike', 'blockquote'],
    [{ 'color': ['#ff0000', '#00ff00', '#0000ff'] }, { 'background': [] }],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image'],
    ['clean']
  ]
}

export default props => {
  const { value, onChange, height } = props

  return (
    <ReactQuill
      theme="snow"
      modules={modules}
      value={value}
      onChange={onChange}
      style={{
        height: (height || 200) + 'px'
      }}
    />
  )
}
