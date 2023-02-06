<template>
  <div>
    <slot name='header'>千锋头部</slot>
    <hr>
    <slot>千锋主体</slot>
  </div>
</template>

<script setup>
  import { useSlots } from 'vue'
  const slots = useSlots()
  console.log('---slots', slots)

</script>
