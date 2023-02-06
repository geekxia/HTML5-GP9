import { watchEffect} from 'vue'
import { storeToRefs } from 'pinia'
import useCateStore from './useCateStore'

export default function useStudy () {
  const store = useCateStore()
  const { num, total1, total2, total3 } = storeToRefs(store)

  const add = () => {
    // store.$state.num++
    // store.num++
    // store.$patch({ num: store.num + 1 }) // 批量修改
    store.addNum(5)  // 通过actions方法修改state
    // store.subNum(10)
  }

  const reset = () => {
    store.$reset()  // 重置store
  }

  watchEffect(()=>{
    // 监听当前store的变化，默认当组件销毁时将停止监听
    // 如果希望组件销毁继续监听，添加一个选项 detached: true
    store.$subscribe(({events}, state)=>{
      if (events.key==='num') {
        console.log('---store num change', state.num)
      }
    }, { detached: true })
  })

  return {
    num,
    total1,
    total2,
    total3,
    add,
    reset
  }
}
