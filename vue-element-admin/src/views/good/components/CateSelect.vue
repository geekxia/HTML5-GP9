<template>
  <el-select v-model='cate' placeholder="请选择商品品类">
    <el-option v-if='hasAll' value=''>全部</el-option>
    <el-option v-for='item in cates' :label="item.cate_zh" :value="item.cate"  :key='item._id' />
  </el-select>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  props: {
    value: { type: String, default: '' },
    hasAll: { type: Boolean, default: false }
  },
  computed: {
    ...mapState('good', ['cates']),
    cate: {
      get () {
        return this.value
      },
      set (cate) {
        this.$emit('input', cate)
      }
    }
  },
  created () {
    this.getCates()
  },
  methods: {
    ...mapActions('good', ['getCates'])
  }
}
</script>

<style lang="css" scoped>
</style>
