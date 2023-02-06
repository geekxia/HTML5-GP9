<template>
  <h1>学习Pinia</h1>
  <h1 v-text='num'></h1>
  <h1 v-text='total1'></h1>
  <h1 v-text='total2'></h1>
  <h1 v-text='total3(3)'></h1>

  <button @click='add'>自增</button>
  <button @click='reset'>重置</button>

  <hr>
  <h1>文章列表</h1>
  <div v-for='item in list' :key='item.id' v-text='item.title'></div>
  <button @click='setList'>下一页</button>

  <hr>

  <h1>{{ cate.isLogin ? '已登录' : '未登录' }}</h1>
  <button @click='test'>测试</button>

</template>

<script setup>

  // import useStore from '@/store'
  import useCateStore from './hooks/useCateStore'


  import useList from './hooks/useList'
  import useStudy from './hooks/useStudy'
  const [list, setList] = useList()
  const { num, total1, total2, total3, add, reset } = useStudy()

  const cate = useCateStore()

  // const store = useStore()
  // console.log('--------store', store)
  const test = () => {
    cate.testCount()
  }
</script>

<style lang="css" scoped>
</style>
