<template>
  <div class="app-container">
    <el-form ref="form" :model="ruleForm" :rules="rules" label-width="100px" class="form">

      <el-form-item label="商品名称" prop="name">
        <el-input v-model="ruleForm.name" :disabled='Boolean(id)' />
      </el-form-item>

      <el-form-item label="商品简介" prop="desc">
        <el-input v-model="ruleForm.desc" type="textarea" />
      </el-form-item>

      <el-form-item label="商品品类" prop="cate">
        <CateSelect v-model='ruleForm.cate' />
      </el-form-item>

      <el-form-item label="商品价格" prop="price">
        <el-input-number v-model.number="ruleForm.price" controls-position="right" :min="0" />
      </el-form-item>

      <el-form-item label="是否热销" prop="hot">
        <el-switch v-model="ruleForm.hot" />
      </el-form-item>

      <el-form-item label="商品图片" prop="img">
        <ImgUpload v-model='ruleForm.img' />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submit('ruleForm')">{{id?'修改':'新增'}}</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>

import CateSelect from './components/CateSelect.vue'
import ImgUpload from './components/ImgUpload.vue'
import { fetchGoodSubmit, fetchGoodInfo } from '@/api/good'

// 自定义校验方法
var checkPrice = (rule, value, callback) => {
  if (value < 0.5) {
    return callback(new Error('价格不能小于0.5元'))
  }
  callback()
}

export default {
  name: 'GoodForm',
  components: {
    CateSelect, ImgUpload
  },
  props: {
    id: { type: String, default: '' },  // 编辑
  },
  data() {
    return {

      ruleForm: {},
      rules: {
        name: [
          { required: true, message: '商品名称是必填属性', trigger: 'blur' },
          { pattern: /^[\u4e00-\u9fa5]{4,8}$/, message: '商品名称要求是4~8个中文汉字', trigger: 'blur' }
        ],
        price: [
          { validator: checkPrice, trigger: 'blur' },
          { required: true, message: '价格是必填属性' }
        ]
      },
    }
  },

  created () {
    if (this.id) {
      fetchGoodInfo(this.id).then(({data})=>{
        this.ruleForm = data.info
      })
    }

  },

  methods: {
    submit() {
      // console.log('---提交', this.$refs.form)
      this.$refs.form.validate().then(()=>{
        let params = { ...this.ruleForm }
        if (this.id) params.id = this.id  // 编辑
        fetchGoodSubmit(params).then(()=>{
          // console.log('---商品添加成功')
          this.$message({
            message: `商品${this.id?'修改':'添加'}成功`,
            type: 'success',
            onClose: () => {
              this.$router.push({name: 'GoodList'})
            }
          })
          // 当商品提交成功后，向socket服务器发一条消息
          this.sendMsg('server', { id: 'service', msg: '请尽快审核' })
        })
      })

    }
  }
}
</script>

<style lang="scss" scoped>
.form {
  width: 60%;
  min-width: 500px;
}
</style>
