<template>
  <h1>学习组合API</h1>
  <h1 v-text='page'></h1>
  <button @click='page++'>自增</button>
  <button @click='stop'>停止监听</button>
  <hr>
  <h1 v-text='user.a.b.c'></h1>
  <button @click='user.a.b.c++'>自增</button>
  <hr>
  <button @click='test'>测试</button>
  <hr>

</template>

<script setup>
  import { ref, reactive, computed, watch, watchEffect, watchPostEffect, watchSyncEffect, readonly } from 'vue'
  const user = reactive({a: { b: { c: 200 }}})
  const page = ref(100)
  const pp = computed(()=>page.value+1)
  const mm = computed(()=>page.value+2)
  const xx = readonly(user)

  // 在v3中，watch有一个返回值（函数），调用这个返回值，可以停止监听
  const stop1 = watch(page, (newPage, oldPage)=>{
    // console.log('---page', newPage, oldPage)
    console.log('---watch 1')
  }, {flush: 'pre', immediate: true})

  // 在v3中，watch可以同时监听多个响应式变量（ref/reactive/computed...）
  const stop2 = watch([pp,mm], ([newPP,newMM], [oldPP,oldMM])=>{
    // console.log('---pp mm changed')
    // console.log('---watch 2')
  })

  const stop3 = watch(user, ()=>console.log('---user c changed'), {})

  const stop4 = watchEffect(()=>{
    console.log('--- watch effect 2')
  })
  const stop5 = watchSyncEffect(()=>{
    console.log('--- watch effect 3')
  })
  const stop6 = watchPostEffect(()=>{
    console.log('--- watch effect 1')
  })

  const stop = () => {
    stop1()
    stop2()
    stop3()
  }

  const test = () => {
    console.log('---xx', xx)
  }
</script>

<style lang="css" scoped>
</style>
