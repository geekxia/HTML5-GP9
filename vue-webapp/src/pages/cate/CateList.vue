<template>
  <div class="cate">
    <NaviBar>品类</NaviBar>

    <LeftCate :cates='cates' v-model='activeKey' />
    <RightGood :loaded='loaded' :list.sync='cache[activeKey]' />

    <TabBar />
  </div>
</template>

<script>
import LeftCate from './components/LeftCate.vue'
import RightGood from './components/RightGood.vue'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'CartList',
  components: { LeftCate, RightGood },
  data () {
    return {
      activeKey: 0,
      cates: [],  // 左侧的品类数组
      loaded: false,
    }
  },
  computed: {
    // 从good这个子store中映射cache变量，映射成功可以使用this访问它们
    ...mapState('good', ['cache', 'num']),
    ...mapGetters('good', ['total']),

    payload () {
      const activeKey = this.activeKey
      const cate = this.cates[activeKey].cate
      return { activeKey, cate }
    }
  },
  watch: {
    activeKey () {
      // 先判断vuex中有没有当前activeKey所对应的缓存数据
      // 如果有，直接用于渲染右侧视图；如果没有，才需要走Vuex流程进行调接口。
      if (!this.cache[this.activeKey]) {
        // this.$store.dispatch('good/getList', this.payload)
        this.loaded = false
        this.getList(this.payload)
      }
    },
    // 监听vuex中的state数据
    cache () {
      this.loaded = true  // 加载已完成
    }
  },
  async mounted () {
    const res = await this.$api.fetchCates()
    this.cates = res.list
    // this.$store.dispatch('good/getList', this.payload)
    this.getList(this.payload)

  },
  methods: {
    // 从good这个子store中映射addNum，映射成功后可以用this访问并调用
    ...mapMutations('good', ['cleanCache']),
    ...mapActions('good', ['getList'])
  },
  beforeDestroy () {
    // 当组件销毁时，清除vuex中的缓存数据
    this.cleanCache()
  }
}
</script>

<style lang="scss" scoped>
.cate {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  overflow: hidden;
  &>.left {
    position: absolute;
    top: 1.2rem; left: 0;
    bottom: 1.3333rem; width: 2.2667rem;
    overflow: scroll;
  }
  &>.left::-webkit-scrollbar{ display:none }

  &>.right {
    position: absolute;
    top: 1.2rem; left: 2.2667rem;
    bottom: 1.3333rem; right: 0;
    overflow: scroll;
  }
  &>.right::-webkit-scrollbar{ display:none }
}
</style>
