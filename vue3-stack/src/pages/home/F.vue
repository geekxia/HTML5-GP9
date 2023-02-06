<template>
  <h1>学习组合 API</h1>
  <h1 v-text='num'></h1>
  <button @click='num++'>自增</button>
</template>

<script setup>
  import { customRef, onRenderTracked, onRenderTriggered } from 'vue'

  const num = customRef((track, trigger) => {
    let value = 100  // 语句
    return {
      get () {
        track()  // 触发onRenderTracked
        return value
      },
      set (val) {
        value = val
        trigger()  // 触发onRenderTriggered
      }
    }
  })

  onRenderTracked((ev)=>{
    console.log('---有变量被跟踪了', ev)
  })

  onRenderTriggered((ev)=>{
    console.log('---有变量被修改了', ev)
  })


</script>

<style lang="css" scoped>
</style>
