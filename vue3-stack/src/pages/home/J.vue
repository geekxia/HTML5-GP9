<template>

  <h1>父组件 <button @click='changeName'>改名</button></h1>
  <hr>

  <ChildA :name='name' @reset='name=$event' />
  <hr>

  <!-- 在v3中，v-model = :modelValue + @update:modelValue -->
  <!-- <ChildB :modelValue='name' @update:modelValue='name=$event' /> -->
  <ChildB v-model='name' />

</template>

<script setup>
  import ChildA from '@/components/ChildA.vue'
  import ChildB from '@/components/ChildB.vue'
  import { ref } from 'vue'
  const name = ref('张三')
  const changeName = () => {
    name.value = '李四'
  }
</script>

<style lang="css" scoped>
</style>
