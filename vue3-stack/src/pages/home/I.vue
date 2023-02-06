<template>
  <h1>学习组合 API</h1>
  <h1 v-text='version'></h1>

</template>

<script setup>
  import { inject } from 'vue'
  import useGlobal from '../../hooks/useGlobal'
  const version = inject('version', 2)
  console.log('---version', version)

  const url = useGlobal('url')
  console.log('---url', url)

</script>

<style lang="css" scoped>
</style>
