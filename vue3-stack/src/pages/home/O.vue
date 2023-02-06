<template>

  <!-- to的值，要求是有效的HTML标签名，或者有效的id选择器 -->
  <teleport to='head'>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/animate.css@4.1.1/animate.css"
    />
  </teleport>

  <teleport to='body'>
    <div>footer</div>
  </teleport>

  <transition
    enter-active-class='animate__animated animate__zoomIn'
    leave-active-class='animate__animated animate__zoomOutUp'
    mode='out-in'
  >
    <h1 v-if='bol'>不负当下</h1>
    <h1 v-else>不畏未来</h1>
  </transition>

  <transition name='xxx'>

  </transition>

  <button @click='bol=!bol'>切换</button>
</template>

<script setup>
  import { ref } from 'vue'
  const bol = ref(true)

</script>

<style lang="css" scoped>
.xxx-enter-from {}
.xxx-enter-active {}
.xxx-enter-to {}

.xxx-leave-from {}
.xxx-leave-active {}
.xxx-leave-to {}
</style>
