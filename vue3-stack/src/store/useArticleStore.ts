import { defineStore } from 'pinia'
import { fetchCnode } from '@/utils/api'

const useArticleStore = defineStore('article', {
  state: () => ({
    list: []
  }),
  actions: {
    async getList (params) {
      const list = await fetchCnode(params)
      this.list = list
    }
  }
})

export default useArticleStore
