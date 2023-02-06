<template>
  <div class='data'>
    <img :src='bg' />
    <div>暂无数据</div>
  </div>
</template>

<script>
import bg from '@/assets/icons/data.png'
export default {
  data () {
    return {
      bg
    }
  }
}
</script>

<style lang="scss" scoped>
.data {
  img {
    display: inline-block;
    width: 60%;
  }
  font-size: .4267rem;
  line-height: .8rem;
  color: #888888;
  box-sizing: border-box;
  padding: .4rem;
  text-align: center;
}
</style>
