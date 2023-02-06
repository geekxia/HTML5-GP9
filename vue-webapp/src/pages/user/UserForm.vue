<template>
  <div class='page'>
    <NaviBar>
      <div v-text='flag?"京东登录":"京东注册"'></div>
    </NaviBar>

    <div class="field">
      <van-field
        placeholder="请输入用户名"
        clearable
        v-model='username'
        :rules='unRules'
      />
    </div>

    <div class='field'>
      <van-row>
        <van-col :span='(flag?12:24)'>
          <van-field placeholder="请输入密码" :type='(bol?"password":"text")' clearable v-model.trim='password' />
        </van-col>
        <van-col span='5' v-if='flag'>
          <img class="type" :src='(bol?show:hide)' @click='bol=!bol' />
        </van-col>
        <van-col span='7' v-if='flag'>
          <span class='forget'>忘记密码</span>
        </van-col>
      </van-row>
    </div>

    <div class='field' v-if='!flag'>
      <van-row>
        <van-col span='24'>
          <van-field type='password' placeholder="再次请输入密码" clearable v-model.trim='password2' />
        </van-col>
      </van-row>
    </div>

    <div class="field" style="marginTop: 0.7rem;">
      <van-button type="primary" block round :disabled='!agree' @click='submit'>
        {{ flag ? '登 录' : '注 册' }}
      </van-button>
    </div>

    <van-divider
      :style="{ color: '#666', borderColor: '#666', padding: '0 16px' }"
    >
      其它方式
    </van-divider>
    <div class="toggle">
      <span v-if='flag' @click='$router.replace("/regist")'>没有账号？立即注册！</span>
      <span v-else @click='$router.replace("/login")'>已有账号，立即登录！</span>
    </div>

  </div>
</template>

<script>
import hide from '@/assets/icons/hide.png'
import show from '@/assets/icons/show.png'
import { mapMutations, mapActions } from 'vuex'
export default {
  name: 'UserForm',
  data () {
    // do something

    const unRules = [
      { pattern: /^[a-zA-Z][a-zA-Z0-9]{3,9}$/, message:'用户名要求以字母开头且长度为4~10位', trigger:'onBlur' },
      { required: true, message: '这是必填字段' }
    ]

    return {
      username: '',
      password: '',
      password2: '',
      show, hide,
      bol: true,   // 切换密码可见性
      agree: true,
      unRules
    }
  },
  computed: {
    // 判断当前页面是不是登录页
    flag () {
      return this.$route.path === '/login'
    }
  },
  watch: {
    $route () {
      this.username = ''
      this.password = ''
      this.password2 = ''
    }
  },
  methods: {
    ...mapMutations('user', ['setToken']),
    ...mapActions('user', ['getInfo']),
    submit () {
      if (!this.flag) {
        if (this.password !== this.password2) {
          return this.$toast({
            message: '两次密码不相同',
            type: 'fail'
          })
        }
        const data = {
          username: this.username,
          password: this.password
        }
        this.$api.fetchRegist(data).then(res=>{
          // console.log('---注册成功', res)
          if (res.username) {
            this.$toast({
              message: '注册成功',
              type: 'succcess',
              // 注意this指向
              onClose: () => {
                this.$router.replace('/login')
              }
            })
          }
        })
      }
      // 登录
      if (this.flag) {
        const data = {
          username: this.username,
          password: this.password
        }
        this.$api.fetchLogin(data).then(res=>{
          console.log('---登录成功', res)
          if (res.token) {
            localStorage.setItem('token', res.token)
            this.setToken(res.token)  // 把token放进Vuex
            // $route.query.path 表示上一个页面
            this.$router.replace(this.$route.query.path || '/')
          }
        })
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.van-field {
  padding: 0;
  line-height: 1.3333rem;
  input::placeholder {
    font-size: .4267rem;
    color: #666;
  }
}
.van-button {
  background-image: linear-gradient(90deg,#f10000,#ff2000 73%,#ff4f18);
  border: none;
  height: 1.3333rem;
  font-size: .4267rem;
}
</style>
<style lang="scss" scoped>
.page {
  .field {
    height: 1.3333rem;
    margin: 0 auto;
    width: 8.6667rem;
    border-bottom: 1px solid #eee;
  }
  .forget {
    font-size: .3733rem;
    text-align: center;
    display: block;
    line-height:  1.3333rem;
  }
  .type {
    display: inline-block;
    width: .64rem;
    height: .64rem;
    margin-left: .2667rem;
    vertical-align: middle;
  }
}
.toggle {
  font-size: .4rem;
  color: #666666;
  text-align: center;
}
</style>
