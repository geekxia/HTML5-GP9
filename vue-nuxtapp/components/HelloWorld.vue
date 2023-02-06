<template>
  <h1>你好 {{ msg }}</h1>
</template>

<script>
export default {
  props: {
    msg: { type: String, default: '世界' }
  }
}
</script>

<style lang="css" scoped>
</style>
