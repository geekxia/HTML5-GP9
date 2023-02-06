<template>
  <h1>学习组合 API</h1>

</template>

<script setup>
  import { effectScope, watchEffect, onScopeDispose, onUpdated, onBeforeUpdate } from 'vue'

  const scope = effectScope()
  scope.run(()=>{
    watchEffect(()=>{
      console.log('---do')
    })
  })

  onScopeDispose(()=>{
    console.log('---scope作用域被释放')
  })

  scope.stop()

  onUpdated(()=>{console.log('---页面更新完成')})
  onUpdated(()=>{console.log('---页面更新完成')})

</script>

<style lang="css" scoped>
</style>
