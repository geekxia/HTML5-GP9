<template>
  <div class="app-container">
    <el-row style="marginBottom: 20px;">
      <el-col :span="24">
        <el-input v-model="filter.name" placeholder="输入商品名称" style="width:140px;" />
        <CateSelect v-model='filter.cate' has-all style="width:120px;" />

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
      <el-col :span='24'>
        <el-button type="primary" icon="el-icon-search" @click="filterHandle(1)">搜索</el-button>
        <el-button type="primary" icon="el-icon-delete" @click="filterHandle(4)">重置</el-button>
        <el-button type="primary" icon="el-icon-edit" @click="filterHandle(2)">添加</el-button>
        <el-button type="primary" icon="el-icon-download" @click="filterHandle(3)">导入</el-button>
      </el-col>
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
          <el-image :src='($img+row.img)' />
          <div v-text='row.name'></div>
        </div>
      </template>
      </el-table-column>

      <el-table-column
        prop="cate"
        label="品类"
        align='center'
      >
        <template slot-scope="{row}">
          <!-- 这里为什么不建议使用计算属性？ -->
          <div v-text='cate2Zh(row.cate)'></div>
        </template>
      </el-table-column>

      <el-table-column
        prop="hot"
        label="是否"
        align='center'
      >
        <template slot-scope="{row}">
          <div v-text='(row.hot?"是":"否")'></div>
        </template>
      </el-table-column>

      <el-table-column
        prop="price"
        label="价格"
        align='center'
      >
        <template slot-scope="{row}">
          <div>{{ row.price | rmb}}</div>
        </template>
      </el-table-column>

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
        prop="store_status"
        label="状态"
        align='center'
      >
        <template slot-scope="{row}">
          <div>{{ row.store_status ? "已上架" : "未上架" }}</div>
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
          <el-button type="primary" size="mini" @click='rowHandle(3, row)' v-if='row.check_status===1'>{{row.store_status?'上架':'下架'}}</el-button>
          <el-button type="primary" size="mini" @click='rowHandle(1, row)'>编辑</el-button>
          <el-button type="danger" size="mini" @click='rowHandle(2, row)'>删除</el-button>
        </template>
      </el-table-column>

    </el-table>

    <!-- 参考作者封装的组件源码 -->
    <Pagination :total="total" :limit='filter.size' :pageSizes='[2,5,10,20]' @pagination='paginationChange'  />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { fetchGoodList, fetchGoodDel } from '@/api/good'
import CateSelect from './components/CateSelect.vue'
import { mapState } from 'vuex'
export default {
  name: 'GoodList',
  components: { Pagination, CateSelect },
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
        cate: '',
        check_status: '',
        date: [],
        size: 10,
        page: 1
      },
      list: [],  // 商品列表
      total: 0,  // 用于分页
      count: 0,  // 计数器
    }
  },
  computed: {
    ...mapState('good', ['cates'])
  },
  watch: {
    count () {
      this.getList()
    }
  },
  created () {
    this.getList()
  },
  activated () {
    this.count++
  },
  methods: {
    getList () {
      const params = this.filter
      fetchGoodList(params).then(({ data })=>{
        console.log('----商品列表', data)
        this.list = data.list
        this.total = data.total
      })
    },
    filterHandle(idx) {
      if (idx === 1) {
        // 查询操作时，非分页的变化，都要把page重置为1
        this.filter.page = 1
        this.count++
      }
      if (idx === 2) {
        this.$router.push({ name: 'GoodAdd' })
      }
      if (idx === 3) {
        // this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['商品名称', '商品品类', '商品价格', '商品状态']

          const filterVal = ['name', 'cate', 'price', 'status']
          const data = this.formatJson(filterVal)

          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: 'qf-list'
          })
          // this.downloadLoading = false
        })
      }
    },
    //
    formatJson(filterVal) {
      // 表格数据
      return this.list.map(row => filterVal.map(k => {
        // 根据k进行若干数据处理
        // if (j === 'timestamp') {
        //   return parseTime(v[j])
        // } else {
        //   return v[j]
        // }
        return row[k]
      }))
    },
    // 处理品类
    cate2Zh (cate) {
      let result = ''
      if (this.cates) {
        const res = this.cates.find(ele=>ele.cate === cate)
        // console.log('---res', res)
        if (res) result = res.cate_zh
      }
      return result
    },
    // 监听分页器变化
    paginationChange ({ page, limit}) {
      // console.log('--- 分页变化了', ev)
      this.filter = { ...this.filter, page, size: limit }
      this.count++
    },
    rowHandle (idx, row) {
      if (idx === 1) {
        // 跳转编辑页
        this.$router.push(`/good/edit/${row._id}`)
      }
      if (idx === 2) {
        this.$confirm(`你确定要删除 ${row.name} 吗？`, {
          title: '危险'
        }).then(()=>{
          const ids = row._id
          fetchGoodDel(ids).then(()=>{
            if (this.list.length===1) {
              this.filter.page--
            }
            this.count++
          })
        })
      }
    }
  },
  beforeDestroy () {
    console.log('---good list des')
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
</style>
