<template>
  <div class='info'>
    <!-- 轮播图 -->
    <GoodSwiper :imgs='imgs' />
    <!-- 商品信息 -->
    <div class='good'>
      <div><span>￥</span><span v-text='info.price'></span></div>
      <div v-text='info.name'></div>
    </div>

    <van-goods-action>
      <van-goods-action-icon icon="shop-o" text="店铺" />
      <van-goods-action-icon icon="chat-o" text="客服" v-login />
      <van-goods-action-icon icon="cart-o" text="购物车" v-login />
      <van-goods-action-button type="warning" text="加入购物车" v-login @click='addCart' />
      <van-goods-action-button type="danger" text="立即购买" v-login />
    </van-goods-action>
  </div>
</template>

<script>
import GoodSwiper from './components/GoodSwiper.vue'
export default {
  name: 'GoodInfo',
  components: { GoodSwiper },
  data () {
    return {
      info: {},  // 商品详情
    }
  },
  computed: {
    imgs () {
      let result = []
      if (this.info && this.info.img) {
        for (let i=0; i<3; i++) {
          result.push({ id: this.info._id, img: this.info.img })
        }
      }
      return result
    }
  },
  mounted () {
    const id = this.$route.params.id
    this.$api.fetchGoodInfo(id).then(res=>{
      console.log('---商品详情', res)
      if (res.info) this.info = res.info
    })
  },
  methods: {
    change (idx) {
      this.curIdx = idx + 1
    },
    addCart () {
      // console.log('---调接口，添加购物车')
      const data = {
        good_id: this.info._id,
        num: 1
      }
      this.$api.fetchCartAdd(data).then(()=>{
        // 添加购物成功，跳转到购物车页面
        this.$router.push('/cart')
      })
    }
  }
}
</script>



<style lang="scss" scoped>

.good {
  font-size: .4rem;
}
</style>
