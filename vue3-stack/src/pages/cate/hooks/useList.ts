import useArticleStore from '@/store/useArticleStore'

import { watchEffect, ref } from 'vue'
import { storeToRefs } from 'pinia'

export default function useList () {
  const page = ref(1)

  const store = useArticleStore()
  const { list } = storeToRefs(store)

  watchEffect(()=>{
    // 用于测量actions方法的执行时间
    store.$onAction(({ name, after })=>{
      const sTime = Date.now()
      after(()=>{
        const eTime = Date.now()
        console.log(`${name}执行，用时${eTime-sTime}`)
      })
    })
  })

  watchEffect(()=>{
    const params = {
      page: page.value,
      limit: 5,
      tab: ''
    }
    store.getList(params)
  })

  const setList = () => {
    page.value++
  }

  return [list, setList]
}
