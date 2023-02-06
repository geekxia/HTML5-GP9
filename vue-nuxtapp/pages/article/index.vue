<template>
  <div>
    <h1>SSR文章列表页</h1>
    <el-button type='primary'>点击</el-button>
    <div v-for='item in $store.state.article.list' :key='item.id'>
      <div v-text='item.title'></div>
    </div>
  </div>
</template>

<script>
import { fetchList } from '@/utils/api'
export default {
  // 钩子，在组件实例化之前就完成了调用
  // 所以在这个钩子中是不能访问this的。
  // async asyncData (ctx) {
  //   const params = { limit: 10, page: 1 }
  //   const list = await fetchList(params)
  //   return { list }
  // },
  async fetch (ctx) {
    const params = { limit: 10, page: 1 }
    await ctx.store.dispatch('article/getList', params)
  }
}
</script>

<style lang="css" scoped>
</style>
