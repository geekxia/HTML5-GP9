<template>
  <ChildF>
    <template #default>
      <h1>千锋</h1>
    </template>
    <template #header>
      <h1>头部</h1>
    </template>
  </ChildF>
</template>

<script setup>
  import ChildF from '@/components/ChildF.vue'
</script>

<style lang="css" scoped>
</style>
