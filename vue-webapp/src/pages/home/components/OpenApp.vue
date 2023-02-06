<template>
  <van-notice-bar
    background='#000000'
    color='#ffffff'
    :scrollable='false'
    text="打开京东App，购物更轻松！"
    v-if='show'
  >
    <template #right-icon>
      <div class="open">立即打开</div>
    </template>
    <template #left-icon>
      <div class="icon">
        <span @click='close'>
          <img src="//m.360buyimg.com/mobilecms/jfs/t19480/10/1439571805/820/787bec2c/5ac9d730N04e6d766.png" />
        </span>
        <span>
          <img src="//img11.360buyimg.com/jdphoto/s80x80_jfs/t27847/91/107794072/6854/14716732/5b850ecaN644d2983.png" />
        </span>
      </div>
    </template>
  </van-notice-bar>
</template>

<script>
export default {
  data () {
    return {
      show: true
    }
  },
  methods: {
    close () {
      this.show = false
      this.$emit('close')  // 自定义事件
    }
  }
}
</script>

<style lang="scss" scoped>
.van-notice-bar {
  height: 1.2rem; padding: 0;
}
</style>

<style lang="scss" scoped>
.open {
  background: red; height: 100%; width: 2.5067rem;
  line-height: 1.2rem; text-align: center;
}
.icon {
  width: 1.8133rem;
  &>span:first-child {
    display: inline-block;
    width: .8rem;
    text-align: center;
    &>img {
      width: .2667rem;
      height: .2667rem;
      display: inline-block;
      vertical-align: middle;
    }
  }
  &>span:last-child {
    display: inline-block;
    width: 1.0133rem;
    height: 100%;
    &>img {
      display: inline-block;
      width: .8rem;
      width: .8rem;
      vertical-align: middle;
    }
  }
}
</style>
