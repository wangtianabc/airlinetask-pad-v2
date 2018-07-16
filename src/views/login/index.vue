<template>
  <div class="login-container">
    <div class="lang-container">
      <lang-select class="set-language"></lang-select>
    </div>
    <div class="title-container">
      <h3 class="title">{{$t('login.title')}}</h3>
    </div>
    <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" placeholder="username" autoComplete="on" name="username" type="text" >
          <template slot="prepend"><svg-icon icon-class="user" class-name="icon-font"/></template>
        </el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" placeholder="password" >
          <template slot="prepend"><svg-icon icon-class="lock" class-name="icon-font"/></template>
        </el-input>
      </el-form-item>
      <el-button type="primary" style="width:100%;margin-bottom:30px;" :loading="loading" @click.native.prevent="handleLogin">{{$t('login.logIn')}}</el-button>
    </el-form>
  </div>
</template>

<script>
// import { isvalidUsername } from '@/utils/validate'
import LangSelect from '@/components/LangSelect'

export default {
  components: { LangSelect },
  name: 'login',
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: 'Please enter the correct user name' }],
        password: [{ required: true, trigger: 'blur', message: 'Please enter the correct password' }]
      },
      loading: false
    }
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({ path: '/' })
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    afterQRScan() {
      // const hash = window.location.hash.slice(1)
      // const hashObj = getQueryObject(hash)
      // const originUrl = window.location.origin
      // history.replaceState({}, '', originUrl)
      // const codeMap = {
      //   wechat: 'code',
      //   tencent: 'code'
      // }
      // const codeName = hashObj[codeMap[this.auth_type]]
      // if (!codeName) {
      //   alert('第三方登录失败')
      // } else {
      //   this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
      //     this.$router.push({ path: '/' })
      //   })
      // }
    }
  },
  created() {

  },
  destroyed() {
    // window.removeEventListener('hashchange', this.afterQRScan)
  }
}
</script>



<style rel="stylesheet/scss" lang="scss">
$bg:#2d3a4b;
$light_front:#fff;

.login-container {
  position: relative;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 380px;
    height: 230px;
    padding: 40px;
    margin:-150px 0 0 -190px;
    background-color: $light_front;
    border-radius: 5px;
    .icon-font {
      font-size: 20px;
    }
  }
  .title-container {
    position: absolute;
    top: 50%;
    width: 100%;
    text-align: center;
    .title {
      font-size: 30px;
      font-weight: 400;
      color: $light_front;
      margin-top: -230px;

    }
  }
  .lang-container {
      color: $light_front;
      position: absolute;
      top: 0x;
      right: 0px;
      margin-top: 10px;
      margin-right: 10px;
  }
}
</style>
