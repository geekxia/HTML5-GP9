<template>
  <h1>学习Vue3语法范式</h1>
  <h1 v-text='num'></h1>
  <button @click='num++'>自增</button>
</template>

<script>
export default {
  data () {
    return {
      num: 1
    }
  }
}
</script>

<style>
</style>
