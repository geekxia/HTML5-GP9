<template>
  <div class="swipe">
    <van-swipe :autoplay="3000" :show-indicators='false' @change='curIdx=$event+1'>
      <van-swipe-item v-for='(item,idx) in imgs' :key='idx'>
        <img v-lazy='$img+item.img' />
      </van-swipe-item>
    </van-swipe>
    <div class='indicator' v-cloak>{{ curIdx }} / {{imgs.length}}</div>
    <img class='back' :src="back" @click='$router.back()' />
  </div>
</template>

<script>
import back from '@/assets/icons/back.png'
export default {
  props: {
    imgs: {
      type: Array, default () { return [] }
    }
  },
  data () {
    return {
      curIdx: 1,
      back
    }
  }
}
</script>

<style lang='scss' scoped>
.van-swipe {
  width: 100%;
  height: 10rem;
  img {
    display: block;
    width: 100%; height: 100%;
  }
}
</style>

<style lang="scss" scoped>
.swipe {
  position: relative;
  .indicator {
    background-color: red;
    position: absolute;
    bottom: .2667rem;
    right: 0;
    background-color: rgba(0,0,0,.6);
    height: .5333rem;
    font-size: .16rem;
    color: white;
    line-height: .5333rem;
    padding: .1333rem;
    border-top-left-radius: .5333rem;
    border-bottom-left-radius: .5333rem;
    padding-left: .3333rem;
  }
  .back {
    position: absolute;
    top: .2667rem;
    left: .2667rem;
    width: .9867rem;
    height: .9867rem;
    border-radius: 50%;
  }
}
</style>
