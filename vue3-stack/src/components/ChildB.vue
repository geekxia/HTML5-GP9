<template>
  <!-- 在视图模板中，可以使用Vue3的那些$的内置API -->
  <h1>子组件:<span v-text='modelValue'></span></h1>
  <button @click='$emit("update:modelValue", "张三")'>重置</button>
</template>

<script setup>
  import { defineProps, toRefs, defineEmits } from 'vue'
  // 接收父组件传递过来的自定义属性
  const props = defineProps({
    modelValue: { type: String, default: '' }
  })
  const { modelValue } = toRefs(props)
  // 在setup语法糖中，返回值是emit方法
  const emit = defineEmits(['update:modelValue'])

  // const reset = () => {
  //   emit('reset', '张三')
  // }

  // do something
</script>

<style lang="css" scoped>
</style>
