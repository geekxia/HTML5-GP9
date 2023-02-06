<template>
  <!-- action是图片上传的接口地址 -->
  <!-- name是后端接收接收时所要求的Key名 -->
  <el-upload
    :action="($api+'/api/v1/element/upload/img')"
    name='good'
    class="upload-demo"
    :headers='{Authorization: token}'
    :on-success='imgSuccess'
    :before-upload='imgCheck'
    drag
    :show-file-list='false'
  >
    <div slot='trigger'>
      <el-image v-if='value' :src='(`http://localhost:9999${value}`)' fit='cover' />
      <div v-else>
        <i class="el-icon-upload" />
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </div>
    </div>
    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2M</div>
  </el-upload>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    // 双向绑定的图片地址
    value: { type: String, default: '' }
  },
  computed: {
    ...mapGetters(['token'])
  },
  methods: {
    imgSuccess (response) {
      console.log('---图片上传成功', response.data.img)
      if (response.data && response.data.img) {
        this.$emit('input', response.data.img)
      }
    },
    // 图片验证
    imgCheck (file) {
      console.log('----file', file)
      const arr = ['image/png', 'image/jpg']
      if (!arr.includes(file.type)) {
        this.$message.error('图片格式只支持png、jpg格式')
        return false
      }
      if (file.size/1024/1024 > 2) {
        this.$message.error('图片不能超过2M')
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-image {
  width: 100%;
}
</style>
