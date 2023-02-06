<template>
  <div class="good" @click='skipTo'>
    <van-image :src='$img+good.img' />
    <div class="van-multi-ellipsis--l2" v-text='good.desc' />
    <div v-text='good.price'></div>
  </div>
</template>

<script>
export default {
  props: {
    good: { type: Object, default () { return {} }}
  },
  methods: {
    skipTo () {
      // 跳转详情页
      this.$router.push('/good/info/'+this.good._id)
    }
  }
}
</script>

<style lang="scss" scoped>
.good {
  font-size: .4rem;
  line-height: .6667rem;
  text-align: left;
}
</style>
