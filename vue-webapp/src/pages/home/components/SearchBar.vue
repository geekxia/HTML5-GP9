<template>
  <van-search
    shape="round"
    background="#c82519"
    placeholder="请输入搜索关键词"
    show-action
    readonly
    :value='good.name'
    @click='skip'
  >
    <template #left>
      <span class="left" @click='$emit("find")'>
        <img :src="menu" />
      </span>
    </template>
    <template #action >
      <span v-if='!isLogin' class="action" v-login @click='$emit("confirm")'>登录</span>
      <span v-else style="paddingRight:0.4rem;"></span>
    </template>
  </van-search>
</template>

<script>
import menu from '@/assets/icons/menu.png'
import { mapGetters } from 'vuex'
export default {
  props: {
    // 如果自定义属性是引用数据类型，default要写工厂函数。
    good: {
      type: Object,
      default () { return { name: '西门子'} }
    },
  },
  data () {
    return {
      menu
    }
  },
  computed: {
    ...mapGetters('user', ['isLogin'])
  },
  methods: {
    skip () {
      console.log('---skip')
    }
  }
}
</script>

<style lang='scss' scoped>
.van-search {
  height: 1.2rem;
  line-height: 1.2rem;
  padding-left: 0;
  border: none;
  .van-cell {
    line-height: .5867rem;
  }
}
.van-search__content {
  height: .8rem;
  line-height: .8rem;
}
.van-search__action {
  padding: 0;
}
</style>

<style lang="scss" scoped>
.action {
  display: block; width: 1.4667rem;
  text-align: center; color: white;
}
.left {
  display: block; width: 1.4667rem;
  display: flex;
  justify-content: center;
  text-align: center;
  &>img {
    width: .5333rem; height: .5333rem;
    display: inline-block;
  }
}
</style>
