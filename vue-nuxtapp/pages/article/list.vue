<template>
  <div class='page'>
    <h1>CSR文章列表页</h1>
    <!-- <nuxt-link to='/article/1'>第一篇文章</nuxt-link> -->
    <div v-for='item in list' :key='item.id'>
      <div v-text='item.title'></div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('article', ['list'])
  },
  methods: {
    ...mapActions('article', ['getList'])
  },
  mounted () {
    console.log('---list $router', this.$router)
    this.getList()
  }
}
</script>

<style lang="scss" scoped>
.page {
  h1 { color: red; }
}
</style>
