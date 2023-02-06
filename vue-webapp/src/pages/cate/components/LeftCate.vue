<template>
  <div class="left">
    <!-- v-model可以绑定一个计算属性的变化 -->
    <van-sidebar v-model='activeKey'>
      <van-sidebar-item v-for='item in cates' :key='item._id' :title="item.cate_zh" />
    </van-sidebar>
  </div>
</template>

<script>
export default {
  props: {
    cates: { type: Array, default: () => [] },
    // 父组件中v-model给的value属性
    value: { type: Number, default: 0 }
  },
  computed: {
    activeKey : {
      get () { return this.value },
      set (val) { this.$emit("input", val) }
    }
  }
}
</script>

<style lang="scss" scoped>
.van-sidebar{
  width: 2.2667rem;
  background-color: #eee;
}
.van-sidebar-item {
  height: 1.2267rem;
  line-height: 1.2267rem;
  padding-top: 0;
  padding-bottom: 0;
}
.van-sidebar-item--select::before {
  display: none; width: 0;
}
.van-sidebar-item--select {
  color: red; background-color: white;
}
</style>

<style lang="css" scoped>
</style>
