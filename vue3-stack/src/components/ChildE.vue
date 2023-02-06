<template>
  <div class="form">
    <span v-for='s in sizes' v-text='s.value' :key='s.value' :class='{on:s.value===size}' @click='sizeChange(s)'></span>
  </div>
  <div class="form">
    <span v-for='c in colors' v-text='c.label' :key='c.value' :class='{on:c.value===color}' @click='colorChange(c)'></span>
  </div>
</template>

<script setup>
  import { defineProps, defineEmits, toRefs } from 'vue'
  const props = defineProps({
    sizes: { type: Array, default: () => [] },
    colors: { type: Array, default: () => [] },
    size: { type: String, default: '' },
    sizeModifiers: { default: () => ({}) },  // 接收size的修饰符
    color: { type: String, default: '' },
    colorModifiers: { default: () => ({}) }
  })
  const emit = defineEmits(['update:size', 'update:color'])
  const { sizes, colors } = toRefs(props)
  const sizeChange = ({value}) => {
    // 使用修饰符
    const { lower } = props.sizeModifiers
    // if (lower) value = value.toLowerCase()
    emit('update:size', value)
  }
  const colorChange = ({value}) => {
    emit('update:color', value)
  }

  console.log('----props', props)
</script>

<style lang="scss" scoped>
.form {
  &>span {
    display: inline-block; padding: 3px 15px;
    border: 1px solid #ccc; cursor: pointer;
  }
  &>span.on {
    color: red;
  }
}

</style>
