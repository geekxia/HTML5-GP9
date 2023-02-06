<template>
  <div class="app-container">
    <el-row style="marginBottom: 20px;">
      <el-col :span="24">
        <el-input v-model="filter.name" placeholder="输入商品名称" style="width:140px;" />

        <el-select v-model="filter.check_status" placeholder="请选择状态" style="width:120px;">
          <el-option value=''>全部</el-option>
          <el-option
            v-for="(item) in checkStatusArr"
            :key="item.id"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-date-picker
          v-model="filter.date"
          type="daterange"
          range-separator="至"
          style="width:220px;"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-col>
    </el-row>
    <el-row style="margin:25px 0;">
      <!-- <el-col :span='24'>
        <el-button type="primary" icon="el-icon-search" @click="filterHandle(1)">搜索</el-button>
        <el-button type="primary" icon="el-icon-delete" @click="filterHandle(4)">重置</el-button>
        <el-button type="primary" icon="el-icon-edit" @click="filterHandle(2)">添加</el-button>
        <el-button type="primary" icon="el-icon-download" @click="filterHandle(3)">导入</el-button>
      </el-col> -->
    </el-row>

    <!-- 表格 -->
    <el-table
      :data="list"
      style="width: 100%"
      border
    >
      <el-table-column fixed label="序号" prop="id" sortable="custom" align="center" width="80" type='index'>
        <!-- <template slot-scope="{row}">
          <span>{{ row._id }}</span>
        </template> -->
      </el-table-column>

      <el-table-column
        prop="name"
        label="商品"
        align='center'
      >
      <template slot-scope="{row}">
        <div class="good">
          <el-image :src='($img + row.img)' />
          <div v-text='row.name'></div>
        </div>
      </template>
      </el-table-column>

      <el-table-column
        prop="user_id"
        label="商家"
        align='center'
      />




      <el-table-column
        prop="price"
        label="价格"
        align='center'
        />

      <el-table-column
        prop="create_time"
        label="发布时间"
        align='center'
      >
        <template slot-scope="{row}">
          <div>{{ row.create_time | ymd }}</div>
        </template>
      </el-table-column>



      <el-table-column
        prop="check_status"
        label="审核状态"
        align='center'
      >
        <template slot-scope="{row}">
          <div>{{ checkStatus(row.check_status) }}</div>
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        align="center"
        width="200"
      >
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click='rowHandle(1, row)'>详情</el-button>
        </template>
      </el-table-column>

    </el-table>

    <!-- 参考作者封装的组件源码 -->
    <Pagination :total="total" :limit='filter.size' :pageSizes='[2,5,10,20]' @pagination='paginationChange'  />

    <el-drawer
      title="商品审核详情"
      :visible.sync="drawer"
      custom-class='drawer'
      direction="rtl">
      <div class='info'>
        <div v-text='curRow.user_id'></div>
        <div v-text='curRow.name'></div>
        <div v-text='curRow.desc'></div>

        <div class="content">
          <el-input type='textarea' v-model.trim='content' />
        </div>
        <div class="btns">
          <el-button type="primary" @click='rowHandle(2)' :disabled='curRow.check_status!==0'>通过</el-button>
          <el-button type="danger" @click='rowHandle(3)' :disabled='curRow.check_status!==0'>驳回</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { fetchGoodCheckList, fetchCheckGood } from '@/api/check'

import { mapState } from 'vuex'
export default {
  name: 'GoodCheck',
  components: { Pagination },
  data() {
    return {
      checkStatusArr: [
        { id: 1, value: 0, label: '待审核' },
        { id: 2, value: 1, label: '已审核成功' },
        { id: 3, value: -1, label: '审核失败' }
      ],
      // 查询的入参们（即后端接口要求的查询参数）
      filter: {
        name: '',
        check: 0,  // 0/-1/1
        size: 5,
        page: 1
      },
      list: [],  // 商品审核列表
      total: 0,  // 用于分页
      count: 0,  // 计数器
      drawer: false,
      curRow: {},
      content: ''
    }
  },
  created () {
    console.log('---good check created')
    this.getList()
  },
  watch: {
    count () {
      this.getList()
    }
  },
  methods: {
    getList () {
      const params = this.filter
      fetchGoodCheckList(params).then(({ data })=>{
        console.log('----商品列表', data)
        this.list = data.list
        this.total = data.total
      })
    },
    paginationChange ({ page, limit}) {
      // console.log('--- 分页变化了', ev)
      this.filter = { ...this.filter, page, size: limit }
      this.count++
    },
    rowHandle (idx, row) {
      if (idx === 1) {
        console.log('---打开一个抽屉查看商品详情', row)
        this.curRow = row
        this.drawer = true
      }
      if (idx === 2) {
        // console.log('---同意')
        const data = {
          good_id: this.curRow._id,
          check: 1,
          content: this.content
        }
        fetchCheckGood(data).then(()=>{
          this.drawer = false
          this.count++
          this.content = ''
          // 向socket服务器发一条消息，socket服务器对这条信息进行中转
          this.sendMsg('server', {id: this.curRow.user_id, msg: this.content})
        })
      }
      if (idx === 3) {
        if (this.content) {
          const data = {
            good_id: this.curRow._id,
            check: -1,
            content: this.content
          }
          fetchCheckGood(data).then(()=>{
            this.drawer = false
            this.count++
            this.content = ''
            // 向socket服务器发一条消息，socket服务器对这条信息进行中转
            this.sendMsg('server', {id: this.curRow.user_id, msg: this.content})
          })
        }
        console.log('---驳回')
      }
    }

  }
}
</script>



<style lang="scss" scoped>
.good {
  .el-image {
    width: 60px;
    height: 60px;
  }
  text-align: center;
}
.btns {
  text-align: center;
  position: absolute;
  bottom: 25px;
  left: 0;
  right: 0;
}
.info {
  padding: 0 25px;
  box-sizing: border-box;
}
.content {
  position: absolute;
  bottom: 80px;
  left: 25px;
  right: 25px;
}
.el-drawer {
  width: 250px;
}
</style>
