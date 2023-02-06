<template>
  <div>
    <div class='tabs'>
      <span :class='{on:subIdx===0}' @click='skipTo("")'>我的信息</span>
      <span :class='{on:subIdx===1}' @click='skipTo("/vip")'>我的会员</span>
    </div>
    <!-- 二级的嵌套视图 -->
    <router-view></router-view>

    <div>
      <van-cell is-link @click='logout'>
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <span class="custom-title">退出登录</span>
        </template>
      </van-cell>
    </div>

    <TabBar />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      subIdx: 0
    }
  },
  methods: {
    ...mapMutations('user', ['resetUser']),
    skipTo (subPath) {
      this.$router.push(`/user`+subPath)
      this.subIdx = subPath === '/vip' ? 1 : 0
    },
    logout () {
      this.$dialog.confirm({
        title: '退出登录',
        message: '你确定要退出登录吗？',
      }).then(()=>{
        this.resetUser()  // 重置vuex中的用户信息
        this.$router.push('/login')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  display: flex;
  &>span {
    flex: 1;
    line-height: .8rem;
    border: 1px solid #ccc;
    text-align: center;
    font-size: .4rem;
  }
  &>span.on {
    background-color: orange;
    color: white;
  }
}
</style>
