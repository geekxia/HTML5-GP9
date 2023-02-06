<template>
  <h1>学习组合API</h1>

</template>

<script setup>
  import { isRef, ref, unref, toRef, reactive, toRefs } from 'vue'
  const x = 100
  const a = ref(x)
  const b = 200
  // console.log('---b', isRef(b))

  const user = reactive({a: 1, b: 2})


  console.log('--- a', a)
  // unref返回ref变量的原始值
  console.log('--- x', unref(a) === x)

  // 把reactive变量中的某一个key变量包裹成ref变量
  const c = toRef(user, 'a')
  const d = toRef({a:1,b:2}, 'b')
  console.log('--- c', c)
  console.log('--- d', d)

  const obj = toRefs(reactive({a:1,b:2,c:3}))
  console.log('--- obj.a', isRef(obj.a))

</script>

<style lang="css" scoped>
</style>
