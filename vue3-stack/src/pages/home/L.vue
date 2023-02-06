<template>
  <!-- 通过ref访问DOM -->
  <AsyncChild />

</template>

<script setup>
  import { defineAsyncComponent } from 'vue'

  const AsyncChild = defineAsyncComponent({
    loader: () => import('@/components/ChildC.vue')
  })


</script>
