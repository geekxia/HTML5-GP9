<template>
  <div id="app">
    <!-- 一级路由，用于显示登录页、Layout布局等 -->
    <router-view name="default" />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
