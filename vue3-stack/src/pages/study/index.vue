<template>
  <h1>学习Vue3语法范式</h1>
  <h1 v-text='num'></h1>
  <h1 v-text='total'></h1>
  <button @click='add'>自增</button>
</template>


<script setup>
import useNum from './hooks/useNum.js'
// 页面逻辑
const { num, total, add } = useNum()
</script>

<style>
</style>
