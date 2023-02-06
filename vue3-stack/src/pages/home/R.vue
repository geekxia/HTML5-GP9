<template>
  <div>
    <!-- 对HTML5表单来讲，v-model的语法糖和Vue2完全一样（三种情况） -->
    <!-- 姓名：<input type="text" :value='form.name' @input='form.name=$event.target.value' /> -->
    姓名：<input type="text" v-model='form.name' />

    <!-- 在自定义组件上，可以同时使用多个v-model进行通信 -->
    <!-- v-model = :modelValue + @update:modelValue -->
    <!-- v-model:size = :size + @update:size -->
    <!-- v-model:color = :size + @update:color -->

    <ChildE
      :sizes='sizes'
      :colors='colors'
      v-model:size.lower='form.size'
      v-model:color.rgb='form.color'
    />

    <hr>

    <button @click='submit'>提交</button>
  </div>
</template>

<script setup>
  import { reactive } from 'vue'
  import ChildE from '@/components/ChildE.vue'
  const form = reactive({
    name: '',
    size: '',
    color: ''
  })

  const sizes = reactive([
    { id: 1, value: 'M', label: '中号' },
    { id: 2, value: 'L', label: '大号' },
    { id: 3, value: 'XL', label: '超大号' }
  ])

  const colors = reactive([
    { id: 1, value: 'bw', label: '蓝白' },
    { id: 2, value: 'rb', label: '红黑' }
  ])


  const submit = () => {
    console.log('---提交', form)
  }
</script>

<style lang="css" scoped>
</style>
