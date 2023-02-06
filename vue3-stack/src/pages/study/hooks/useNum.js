import { ref, onMounted, watch, computed, onUpdated, onUnmounted } from 'vue'
export default function useNum () {
  const num = ref(0)  // 定义一个声明式变量
  console.log('---num', typeof num)

  watch(num, ()=>{
    console.log('---num changed 1')
  })

  const total = computed(()=>(num.value * 100))

  const add = () => {
    num.value++
  }
  return { num, total, add }
}
