<template>
  <h1>学习Vue3语法范式</h1>
  <h1 v-text='num'></h1>
  <h1 v-text='total'></h1>
  <button @click='add'>自增</button>
</template>

<script>
import { ref, onMounted, watch, computed, onUpdated, onUnmounted } from 'vue'
export default {
  // 这是vue3新增的选项（组合选项）
  // setup()相当于beforeCreate和created的替代
  // setup()是没有this的
  setup (props, context) {
    console.log('---this', this)
    console.log('---props', props)
    console.log('---context', context)

    const num = ref(0)  // 定义一个声明式变量
    console.log('---num', typeof num)

    onMounted(()=>{
      console.log('---index mounted 1')
    })

    onUpdated(()=>{
      console.log('---index updated')
    })

    watch(num, ()=>{
      console.log('---num changed 1')
    })

    const total = computed(()=>(num.value * 100))

    const add = () => {
      num.value++
    }

    // 抛出去给其它选项或视图使用。
    return {
      num, add, total
    }
  }
}
</script>

<style>
</style>
