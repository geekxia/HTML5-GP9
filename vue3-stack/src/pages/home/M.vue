<template>
  <!-- 当添加class和style时，有且仅有当子组件是单一根节点时，样式才会起使用。 -->
  <ChildD a='1' c :b='100' class='box' style='color:red;fontSize:20px' />
</template>

<script setup>
  import ChildD from '@/components/ChildD.vue'
</script>

<style scoped>
.box {
  opacity: 0.5;
}
</style>
