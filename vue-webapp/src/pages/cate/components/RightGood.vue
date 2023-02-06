<template>
  <div class="right">
    <NotData v-show='loaded && list.length===0' />
    <van-grid column-num='3' :border='false'>
      <van-grid-item v-for='item in list' :key='item._id'>
        <div class='good'>
          <img :src="$img+item.img" />
          <div v-text='item.name'></div>
        </div>
      </van-grid-item>
    </van-grid>

  </div>
</template>

<script>
export default {
  props: {
    list: { type: Array, default: () => [] },
    loaded: { type: Boolean, default: false }
  }
}
</script>

<style lang="scss">
.van-grid-item__content {
  padding-top: .1333rem;
  padding-bottom: .1333rem;
}
</style>

<style lang="scss" scoped>
.good {

  img {
    display: inline-block; width: 1.8667rem;
    height: 1.8667rem;
  }
  font-size: .32rem; text-align: center;
}
</style>
