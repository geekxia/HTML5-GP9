<template>
  <div class='cart'>
    <NaviBar>购物车</NaviBar>

    <NotData v-show='show' />

    <van-swipe-cell v-for='(item,i) in list' :key='item._id + i'>
      <van-row type='flex' align='center'>
        <van-col span="3">
          <van-checkbox v-model='item.checked' @click='checkFull' />
        </van-col>
        <van-col span="21">
          <van-card
            :num="item.num"
            :price="item.good_info.price"
            :desc="item.good_info.desc"
            :title="item.good_info.name"
            :thumb="$img+item.good_info.img"
          >
            <template #footer>
              <van-button size="mini" @click='rowUpd(item, -1, i)'>-</van-button>
              <van-button size="mini" @click='rowUpd(item, 1, i)'>+</van-button>
            </template>
          </van-card>
        </van-col>
      </van-row>
      <template #right>
        <van-button square text="删除" type="danger" class="btn" @click='rowDel(item, i)' />
      </template>
    </van-swipe-cell>

    <van-submit-bar :price="total" button-text="提交订单" @submit="onSubmit">
      <van-checkbox v-model="full" @click='fullClick'>全选</van-checkbox>
      <template #tip>
        你的收货地址不支持同城送, <span>修改地址</span>
      </template>
    </van-submit-bar>
  </div>
</template>

<script>
export default {
  name: 'CartList',
  data () {
    return {
      // rows: Array(5).fill(false),
      full: false,
      list: [],  // 购物车列表
      total: 0,  // 总计（单位是分）
      show: false
    }
  },
  watch: {
    list : {
      handler () {
        this.total = this.list.reduce((a,b)=>{
          a += (b.checked ? b.num*b.good_info.price*100 : 0)
          return a
        }, 0)
      },
      deep: true
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.$api.fetchCartList().then(res=>{
        console.log('---购物车列表', res)
        if (res.list) {

          this.list = res.list.map(ele=>{
            let ele2 = {...ele}
            // 添加自定义属性
            ele2.checked = 60*60*1000 > (Date.now() - ele.create_time)
            return ele2
          })
          this.checkFull()
        }
      })
    },
    rowDel (row, i) {
      this.$dialog.confirm({
        title: '警告',
        message: `你确定要删除 ${row.good_info.name} 吗？`,
      }).then(()=>{
        this.$api.fetchCartDel(row._id).then(()=>{
          // this.init()
          // 通过声明式操作，保持界面的变化
          this.list.splice(i, 1)
          this.checkFull()
        })
      })
    },
    rowUpd (row, step, i) {
      if (row.num === 1 && step === -1) {
        return this.$toast('商品数量不能为零')
      }
      const params = {
        cart_id: row._id,
        new_num: row.num + step  // 变化的商品数量
      }
      this.$api.fetchCartUpd(params).then(()=>{
        // this.init()
        this.list[i].num = params.new_num
      })
    },
    // 全选操作
    fullClick () {
      console.log('----full', this.full)
      this.list = this.list.map(ele=>({ ...ele, checked: this.full }))
    },
    // 检测是否全选了
    checkFull () {
      let count = 0
      this.list.forEach(ele=>{
        if (ele.checked) count++
      })
      this.full = (count !== 0 && count === this.list.length)
      if (this.list.length === 0) this.show = true
    },
    onSubmit () {
      const ids = this.list.reduce((prev, item) => {
        if (item.checked) {
          prev += `;${item._id}`
        }
        return prev
      }, '')
      if (!ids) return this.$toast('请勾选商品')
      this.$api.fetchCartSub(ids).then(()=>{
        this.init()  // 刷新页面
      })
    }
  }
}
</script>

<style lang="scss">
  .van-checkbox__icon {
    margin: 0 auto;
    display: inline-block;
  }
  .van-card {
    background-color: white;
    padding-left: 0;
    .van-button {
      padding: 0 .24rem;
      margin-left: .2rem;
    }
  }
  .van-row {
    border-bottom: 1px solid #eee;
  }
</style>

<style lang="css" scoped>
.cart {
  padding-bottom: 2.4rem;
}
.btn {
  height: 100%;
}
</style>
