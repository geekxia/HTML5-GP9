<template>
  <div>
    <div v-text='$attrs.a'></div>
    <div v-text='$attrs.b'></div>
  </div>
</template>

<script setup>
  import { useAttrs, getCurrentInstance } from 'vue'
  const attrs = useAttrs()
  console.log('---attrs', attrs)

  const app = getCurrentInstance()
  console.log('---child d app', app)
</script>

<style lang="css" scoped>
</style>
