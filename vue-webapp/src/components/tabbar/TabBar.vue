<template>
  <van-tabbar v-model="active" active-color='#ff0000' route>
    <van-tabbar-item v-for='(item,idx) in tabRoutes' :key='idx' :to='item.path'>
      <template #icon='{active}'>
        <img :src='`/icons/${item.meta.icon}${active?"-on":""}.png`' />
      </template>
      <span v-if='idx!==3' v-text='item.meta.text'></span>
      <span v-else v-text='(isLogin?item.meta.text:"未登录")'></span>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { tabRoutes } from '@/router'
import { mapGetters } from 'vuex'
export default {
  name: 'TabBar',  // 指定组件的名字
  data () {
    return {
      active: 0,
      tabRoutes
    }
  },
  computed: {
    ...mapGetters('user', ['isLogin'])
  }
}
</script>

<style lang="scss" scoped>

</style>
