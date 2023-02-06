<template>
  <h1>学习Vue3语法范式</h1>
  <h1 v-text='num'></h1>
  <button @click='add'>自增</button>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
export default {
  // 这是vue3新增的选项（组合选项）
  setup (props, context) {
    console.log('---props', props)
    console.log('---context', context)
    const num = ref(0)
    onMounted(()=>{
      console.log('---index mounted 1')
    })
    watch(num, ()=>{
      console.log('---num changed 1')
    })
    return {
      num
    }
  },
  data () {
    return {
      name: ''
    }
  },
  methods: {
    add () {
      this.num++
    }
  },
  mounted () {
    console.log('---index mounted 2')
  },
  watch: {
    num () {
      console.log('---num changed 2')
    }
  }
}
</script>

<style>
</style>
