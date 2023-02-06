import { defineStore } from 'pinia'

export default defineStore('user', {
  state: () => {
    const token = localStorage.getItem('token')
    return {
      token,
      count: 1,
      userinfo: {}
    }
  },
  getters: {
    isLogin () {
      return true
    }
  },
  actions: {
    login () {

    },
    getInfo () {

    },
    addCount () {
      this.count++
      console.log('---执行了', this.count)
    }
  }
})
