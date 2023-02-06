import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Switch,
  PageHeader,
  message
} from 'antd'

import GoodSelect from './components/GoodSelect'
import ImgUpload from './components/ImgUpload'
import Submit from '@/components/submit'
import { fetchGoodForm, fetchGoodInfo } from '@/api'

const { Option } = Select;

export default () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [flag, setFlag] = useState(true)
  // const [info, setInfo] = useState({})
  const [form] = Form.useForm();  // 这个form实例很重要，有哪些功能？
  // form是什么意思？由Form组件经由ref转发暴露出来的一个表单操作的API
  // form实例上，常用的方法有哪些？（提交、触发校验、填充默认值的）

  useEffect(()=>{
    if (id) {
      fetchGoodInfo(id).then(({ info })=>{
        console.log('---商品详情', info)
        // if (info) setInfo(info)
        form.setFieldsValue(info)
      })
    }
  }, [])

  // 提交（Form组件自带双向绑定功能，自动帮你取表单的值）
  const onFinish = () => {
    // console.log('Received values of form: ', values);
    // form.submit(values)
    // 表单提交时，一定要用代码手动再校验一次
    form.validateFields().then(()=>{
      let values = form.getFieldsValue()
      console.log('---提交', values)
      if (id) values['id'] = id
      fetchGoodForm(values).then(res=>{
        console.log('----提交成功', res)
        if (res.info) {
          message.success(`商品${id?'修改':'添加'}成功`, 1, ()=>{
            navigate('/good/list', {replace: true})
          })
        }
      })
    })
  };

  return (
    <>
      <PageHeader
        onBack={() => navigate(-1)}
        title={ id ? '商品编辑' : '商品新增' }
        subTitle="This is a subtitle"
        style={{marginBottom:'20px', background: 'white'}}
      />
      <div className='good-form'>
        <Form
          labelCol={{span: 3}}
          wrapperCol={{span: 8}}
          form={form}
          name="good"
          onFinish={onFinish}
          initialValues={{
            img: '',  // 相当于表单的defaultValue，不能用于受控
          }}
          scrollToFirstError
          onValuesChange={()=>{
            // form.validateFields().then(()=>setFlag(true)).catch(()=>setFlag(false))
            console.log('---- form change')
          }}
        >
          <Form.Item
            name="name"
            label="商品名称"
            validateTrigger='onBlur'
            rules={[
              // 校验什么：必填与非必填，数据类型，基本格式校验
              // 校验时机：onChange、onBlur
              { required: true, message: '商品名称是必填字段！' },
              { pattern: /[\u4e00-\u9fa5]{4,8}/, message: '商品名称要求是中文字符串' }
            ]}
          >
            {/* 凡是被Form.Item所包裹的表单，相当于给它添加了value属性和onChange*/}
            <Input />
          </Form.Item>

          <Form.Item
            name="desc"
            label="商品描述"
            validateTrigger='onBlur'
            rules={[
              { required: true, message: '请输入商品详细描述！' },
              { min: 15, message: '商品名称要求是15个以上的字符' }
            ]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            name="price"
            validateTrigger='onBlur'
            label="商品价格"
            rules={[
              { required: true, message: '请输入商品详细描述！' },
              // 自定义校验规则（*）
              {
                validator: (rule, value) => {
                  // do something
                  // 举例：要求价格大于0.5元
                  if (Number(value) > 0.5) {
                    return Promise.resolve()
                  } else {
                    // return Promise.reject(new Error('商品价格不能小于0.5元'))
                    return Promise.reject()
                  }
                },
                message: '商品价格不能小于0.5元'
              }
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            name="cate"
            label="商品品类"
            rules={[
              {
                required: true,
                message: '请输入商品详细描述！',
              },
            ]}
          >
            { /* value + onChange */ }
            <GoodSelect />
          </Form.Item>

          <Form.Item
            name="hot"
            label="是否热销"
            valuePropName='checked'
          >
            { /* checked + onChange */ }
            <Switch />
          </Form.Item>

          <Form.Item
            name="img"
            label="商品图片"
            rules={[
              { required: true, message: '请输入商品详细描述！' },
            ]}
          >
            <ImgUpload />
          </Form.Item>

          {/*<Form.Item
            wrapperCol={{ offset: 3 }}
          >
          <Button type="primary" htmlType="submit">
            新增
          </Button>
          </Form.Item>*/}
        </Form>

        <Submit>
          <Button type="primary" onClick={onFinish}>
            { id ? '立即修改' : '提交' }
          </Button>
        </Submit>
      </div>
    </>
  )
}
