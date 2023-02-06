<template>
  <h1>学习组合API</h1>
  <h1 v-show='bol'>十一是否放假</h1>
  <h1 v-text='str'></h1>
  <!-- <button @click='bol=!bol'>切换</button> -->
  <button @click='toggle'>切换</button>
  <hr>

  <input type="text" v-model.trim='task' @keyup.enter='confirm' />
  <div v-for='(item,idx) in list' :key='item.id'>
    <span v-text='item.task'></span>
    <span @click='remove(idx)'>删除</span>
  </div>
</template>

<script>
  import { ref, computed } from 'vue'

  function useHoliday () {
    const bol = ref(true)  // boolean / string / number
    const toggle = () => {
      bol.value = !bol.value
    }
    // 计算属性，具有缓存，默认只有get功能
    const str = computed({
      get () {
        let result = ''
        if (bol.value) {
          result = '放假'
        } else {
          result = '不放假'
        }
        return result
      },
      set () {
        // do something
      }
    })
    return { bol, toggle, str }
  }

  function useNum () {
    const num = ref(1)
    const total = computed(()=>{
      return num.value * 100
    })
    return { num, total }
  }

  function useTodoList () {
    const list = reactive([])  // array / object
    const task = ref('')
    console.log('---list', list)
    const confirm = () => {
      list.push({ id: Date.now(), task: task.value })
      task.value = ''
    }
    const remove = (idx) => {
      list.splice(idx, 1)
    }
    return { list, task, confirm, remove }
  }
</script>

<script setup>
  console.log('---start')
  import { ref, computed, reactive } from 'vue'

  const { bol, toggle, str } = useHoliday()
  const { num, total } = useNum()
  const { task, list, confirm, remove } = useTodoList()

  console.log('---end')
</script>

<style lang="css" scoped>
</style>
