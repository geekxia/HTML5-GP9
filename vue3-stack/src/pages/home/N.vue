<template>
  <div v-html='content'></div>
</template>

<script setup>
  import { ref, watchEffect, nextTick } from 'vue'
  const content = ref('')
  watchEffect(()=>{
    content.value = `<div id="box">一行文字</div>`
    nextTick(()=>{
      document.getElementById('box').style.color = 'red'
    })
  })
</script>

<style scoped>
.box {
  opacity: 0.5;
}
</style>
