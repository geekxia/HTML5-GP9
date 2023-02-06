<template>
  <h1>测试</h1>
</template>

<script setup>
  import { defineProps, inject } from 'vue'
  const props = defineProps({
    num: { type: Number, default: 0 },
    list: {
      type: Array,
      default: () => {
        console.log('---v3 props this', this)
        return inject('list', [])
      }
    }
  })
</script>

<style lang="css" scoped>
</style>
