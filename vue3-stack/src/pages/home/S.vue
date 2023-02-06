<template>

  <!-- 有且仅有当v-memo数组中的声明式变量发生变化时，其它内部视图结构才会更新。 -->
  <!-- 当v-memo的值是空数组时，这段视图结构是不更新的。 -->
  <div v-memo='[]'>
    <h1>你好国庆节</h1>
    <h1 v-text='num'></h1>
  </div>

  <button @click='num++'>自增</button>
</template>

<script setup>
  import { ref } from 'vue'
  const num = ref(1)
  const foo = ref('')

</script>

<style lang="css" scoped>
</style>
