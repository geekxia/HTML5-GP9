<template>
  <van-nav-bar left-arrow @click-left='back'>
    <template #right>
      <slot name='action'></slot>
    </template>
    <template #title>
      <slot>标题</slot>
    </template>
  </van-nav-bar>
</template>

<script>
export default {
  methods: {
    back () {
      this.$router.back() // 返回上一页
    }
  }
}
</script>

<style lang="scss">
.van-icon.van-nav-bar__arrow {
  color: black;
}
</style>
