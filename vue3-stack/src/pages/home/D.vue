<template>
  <h1>学习组合 API</h1>
</template>

<script setup>
  import { isProxy, ref, reactive, readonly, isReactive } from 'vue'
  const a = ref(100)
  const b = reactive({a:1,b:2})
  const c = readonly(b)

  // console.log('---a proxy', isProxy(a))
  console.log('---b proxy', isProxy(b))
  console.log('---c proxy', isProxy(c))

  console.log('---b reactive', isReactive(b))
  console.log('---c reactive', isReactive(c))

</script>

<style lang="css" scoped>
</style>
