<template>
  <div class='home' @scroll='scroll' ref='page'>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <OpenApp />
      <SearchBar />
      <AdSwiper />
      <!-- 列表  -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check='false'
      >
        <GoodList :list='list' />
      </van-list>
    </van-pull-refresh>

    <TabBar />
  </div>
</template>

<script>
import OpenApp from './components/OpenApp.vue'
import SearchBar from './components/SearchBar.vue'
import AdSwiper from './components/AdSwiper.vue'
import GoodList from './components/GoodList.vue'

export default {
  name: 'HomeList',
  components: { OpenApp, SearchBar, AdSwiper, GoodList },
  data () {
    return {
      refreshing: false,  // 是否处于下拉刷新状态
      loading: false,     // 是否处于触底加载状态
      finished: false,    // 是否还有数据
      list: [],  // 放置后端返回的商品列表
      count: 0,  // 计数器
      top: 0,    // 记录滚动条的位置
      page: 1,   // 初始化page=1
    }
  },
  watch: {
    count: {
      immediate: true,  // 默认情况下watch在初始化时不执行，加上这个属性后可以初始化执行
      handler () {
        // console.log('---因为page变化了，所以调接口')

        const params = { page: this.page, size:10 }
        // 每次page变化时，都要调接口。调完接口后，如何处理返回的那一页数据呢？
        this.$api.fetchGoodList(params).then(res=>{
          console.log('---商品列表', res)

          // 场景1、初始化调接口
          if (!this.loading && !this.refreshing) {
            this.list = res.list
          }

          // 场景2、触底分页调接口
          if (this.loading) {
            this.list = [...this.list, ...res.list]
            this.loading = false

          }

          // 场景3、下拉刷新调接口
          if (this.refreshing) {
            this.finished = false
            this.list = res.list
            this.refreshing = false
          }

          if (this.list.length >= res.total) {
            this.finished = true
          }
        })
      }
    }
  },
  methods: {
    onRefresh () {
      console.log('---触发下拉事件')
      // 当下拉刷新时，目标是重置list数组
      this.page = 1
      this.count++
    },
    onLoad () {
      console.log('---触底了')
      // 当触底时，目标是请求下一页数据，追加到list中去
      this.page++
      this.count++
    },
    scroll (ev) {
      // console.log('---页面滚动了', )
      this.top = ev.srcElement.scrollTop
    }
  },
  activated () {
    // 当激活时，手动把页面div滚动到“离开时的那位位置”
    this.$refs.page.scrollTop = this.top
  },
  beforeDestroy () {
    console.log('----HomeList beforeDestroy')
  }
}
</script>

<style lang='scss' scoped>
.home {
  padding-bottom: 2rem;
  position: absolute;
  top: 0; bottom: 0;
  left: 0; right: 0;
  overflow: scroll;
}
.home::-webkit-scrollbar{ display:none }
</style>
