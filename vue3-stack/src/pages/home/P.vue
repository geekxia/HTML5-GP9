<template>
  <!-- 这种写法，同时绑定静态和动态属性时，谁在前面谁生效！ -->
  <div id='red' :id='("blue")'>不负当下</div>
  <div :title='("hello")' title='world'>不畏未来</div>
  <hr>

  <!-- 这种写法，同时绑定静态和动态属性时，谁在后面谁生效！ -->
  <div id='red' v-bind='{id:"blue"}'>不负当下</div>
  <div v-bind='{title:"hello"}' title='world'>不畏未来</div>
</template>

<script setup>

</script>

<style lang="css" scoped>
</style>
