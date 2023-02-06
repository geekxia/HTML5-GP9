<template>
  <h1>学习组合 API</h1>
  <h1 v-text='x.a'></h1>
  <button @click='add'>自增</button>
</template>

<script setup>
  import { toRaw, markRaw, ref, reactive } from 'vue'

  const obj = { a: 1, b: 2 }
  const foo = markRaw({ c: 3, d: 4 })

  const x = reactive(obj)
  const y = reactive(foo)

  console.log('----1', toRaw(x) === obj)

  console.log('----y', y)

  const add = () => {
    x.a++
  }

</script>

<style lang="css" scoped>
</style>
