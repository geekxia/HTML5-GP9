<template>
  <h1>首页</h1>
</template>

<script setup>

  import { useRouter, useRoute } from 'vue-router'

  const router = useRouter()
  const route = useRoute()

  console.log('---router', router)
  console.log('---route', route)

</script>

<style lang="css" scoped>
</style>
