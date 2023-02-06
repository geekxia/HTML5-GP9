<template>
  <div class='cates'>
    <span
      v-for='item in cates'
      v-text='item.label'
      :class='{"on": value===item.tab}'
      @click='$emit("input", item.tab)'
    >
    </span>
  </div>
</template>

<script>
export default {
  props: {
    cates: { type: Array, default: [] },
    value: { type: String, default: '' }
  }
}
</script>

<style lang="css" scoped>
</style>
