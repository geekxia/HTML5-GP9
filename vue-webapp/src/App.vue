<template>
  <div>

    <!-- <router-link to='/home' tag='span' exact-active-class='on'>首页</router-link>
    <router-link :to='{path:"/login"}' tag='span' exact-active-class='on'>登录</router-link> -->

    <!-- 视图容器：用于显示路由匹配成功的那个组件 -->
    <keep-alive>
      <!-- 命名视图，用于缓存首页 -->
      <router-view name='alive'></router-view>
    </keep-alive>

    <router-view></router-view>




  </div>
</template>

<script>
export default {
  name: 'App',
  watch: {
    // 监听路由信息变化
    $route (to, from) {
      console.log('---to', to)
      console.log('---from', from)
    }
  }
}
</script>

<style>
</style>

<style>
[v-cloak] { display: none; }
</style>
