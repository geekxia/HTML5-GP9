<template>
  <!-- 在视图模板中，可以使用Vue3的那些$的内置API -->
  <h1>子组件:<span v-text='name'></span></h1>
  <button @click='$emit("reset", "张三")'>重置</button>
</template>

<script setup>
  import { defineProps, toRefs, defineEmits } from 'vue'
  // 接收父组件传递过来的自定义属性
  const props = defineProps({
    name: { type: String, default: '' }
  })
  const { name } = toRefs(props)
  // 在setup语法糖中，返回值是emit方法
  const emit = defineEmits(['reset'])

  // const reset = () => {
  //   emit('reset', '张三')
  // }

  // do something
</script>

<style lang="css" scoped>
</style>
