<template>
  <div class="swiper">
    <div class="slider-bg"></div>
    <van-swipe :autoplay="3000000" indicator-color='#c82519'>
      <van-swipe-item v-for="item in images" :key='item.id'>
        <img v-lazy="item.img" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  props: {
    images: {
      type: Array, default () {
        return [
          { id: 1, img: '//m15.360buyimg.com/mobilecms/s1062x420_jfs/t1/66479/13/21399/65518/62e271dfE4dc4181f/2d7c014f2d37b45b.jpg!cr_1053x420_4_0!q70.jpg' },
          { id: 2, img: '//imgcps.jd.com/ling4/10059124870677/5Lqs6YCJ5aW96LSn/5L2g5YC85b6X5oul5pyJ/p-60541302312a785a1c0033fc/32123ad1/cr_1125x449_0_166/s/q70.jpg' },
          { id: 3, img: '//m15.360buyimg.com/mobilecms/jfs/t1/62545/23/19255/142077/62b1f387Eb18795a8/0d30b6db1bb64f71.jpg!cr_1125x449_0_166!q70.jpg' }
        ]
      }
    }
  }
}
</script>

<style lang='scss'>
.van-swipe {
  width: 9.3333rem; height: 100%;
  margin: 0 auto; border-radius: .1333rem;
}
.van-swipe-item {
  &>img {
    display: block;
    width: 100%; height: 100%;
  }
}
.van-swipe__indicators {
  bottom: .16rem;
}
</style>

<style lang="scss" scoped>
.swiper {
  width: 100%; height: 3.7333rem;
  overflow: hidden;
  position: relative;
}
.slider-bg {
  background-image: -webkit-gradient(linear,left bottom,left top,from(#f1503b),color-stop(50%,#c82519));
  background-image: -webkit-linear-gradient(bottom,#f1503b,#c82519 50%);
  background-image: linear-gradient(0deg,#f1503b,#c82519 50%);
  position: absolute;
  top: 0;
  left: -25%;
  // height: 7.25rem;
  height: 2.2rem;
  width: 150%;
  border-bottom-left-radius: 100%;
  border-bottom-right-radius: 100%;
}
</style>
