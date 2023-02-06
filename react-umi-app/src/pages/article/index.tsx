import { FC, useRef } from 'react'

import { useHistory, request, ApplyPluginsType } from 'umi'

// 导入TS类型
import type { ActionType, ProColumns } from '@ant-design/pro-components';

import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer, ProCard, ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Dropdown, Menu, Space, Tag } from 'antd';

import { fetchCnode } from '@/services/article';

enum Cate {
  share = '分享',
  ast = '问答'
}

// 表格列
const columns: ProColumns<API.Article>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '标题',
    dataIndex: 'title',
    // 是否参与筛选
    // hideInSearch: true,
    // 用什么类型的表单来筛选
    order: 0,
    copyable: true,
    // width: 200,
    ellipsis: true,
    align: 'center',
    tip: '标题过长会自动收缩'
  },
  {
    disable: true,
    title: '品类',
    order: 1000,
    dataIndex: 'tab',
    align: 'center',
    // 在表格表头添加筛选
    filters: true,
    onFilter: true,
    ellipsis: true,
    // render: (_:any, row) => {
    //   const zh = Cate[row.tab]
    //   return <span>{ zh }</span>
    // }
    // 同时渲染单元格和筛选面板下拉框
    valueType: 'select',
    valueEnum: {
      default: { text: '全部' },
      share: {
        text: '分享',
        status: 'Error',
      },
      ask: {
        text: '问答',
        status: 'Success',
        // disabled: true,
      },
      good: {
        text: '精华',
        status: 'Processing',
      },
      job: {
        text: '招聘',
        status: 'Processing',
      },
    },
  },
  {
    disable: true,
    title: '访问量',
    dataIndex: 'reply_count',
    search: false,
    renderFormItem: (_, { defaultRender }) => {
      return defaultRender(_);
    },
    render: (_, row) => (
      <span>{row.reply_count} / {row.visit_count}</span>
    ),
  },
  {
    title: '创建时间',
    dataIndex: 'create_at',
    align: 'center',
    // 在筛选面板上加一个日期筛选
    valueType: 'date',
    hideInTable: false,
    search: {
      transform: (value: any) => {
        console.log('----value', value)
      }
    }
    // render: (time: any) => {
    //   return <span>{time}</span>
    // }
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <Button key='1'>编辑</Button>
    ],
  },
];

const ArticleList: FC<{}> = () => {

  const history = useHistory()
  const actionRef = useRef<ActionType>()

  return (
    <PageContainer
      header={{
        title: '文章列表',
        subTitle: '千锋发表的精品文章',
        onBack: () => { history.goBack() },
        extra: [
          <Dropdown
            key="dropdown"
            trigger={['click']}
            overlay={
              <Menu>
                <Menu.Item>菜单项一</Menu.Item>
                <Menu.Item>菜单项二</Menu.Item>
              </Menu>
            }
          >
            <Button key="4" style={{ padding: '0 8px' }}>
              <EllipsisOutlined />
            </Button>
          </Dropdown>
        ]
      }}
      waterMarkProps={{
        content: '千锋出品'
      }}
    >

    <ProTable<API.Article>
      columns={columns}
      actionRef={actionRef}
      search={{
        searchText: '搜索'
      }}
      cardBordered
      request={async (search, sort, filter) => {
        // 调接口，给表格注入数据的！！
        console.log('----request', search, sort, filter);
        // 返回
        // return fetchCnode(params)
        const params = {
          tab: search.tab==='default'?'':search.tab,
          page: search.current,
          limit: search.pageSize
        }
        const res = await fetchCnode(params)
        console.log('---res', res)
        // 
        return {
          data: res.data,
          total: 100
        }
      
      }}
      editable={{
        type: 'multiple',
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        onChange(value) {
          console.log('value: ', value);
        },
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      options={{
        setting: {
          listsHeight: 400,
        },
      }}
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        // pageSize: 10,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="高级表格"
      toolBarRender={() => [
        <Button key="button" icon={<PlusOutlined />} type="primary">
          新建
        </Button>,
        <Dropdown
          key="menu"
          overlay={
            <Menu>
              <Menu.Item>文字</Menu.Item>
            </Menu>
          }
        >
          <Button>
            <EllipsisOutlined />
          </Button>
        </Dropdown>,
      ]}
    />
    </PageContainer>
  )
}

export default ArticleList
