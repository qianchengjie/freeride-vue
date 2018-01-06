<template>
  <div>
    <mt-header fixed title="用户注册">
      <router-link to="login" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="reg_container">
      <div class="reg_form">
        <mt-f label="用户名" placeholder="请输入用户名" v-model="form.name.value" :state="form.name.state"></mt-f>
        <mt-f label="密码" type="password" placeholder="请输入密码" v-model="form.password.value" :state="form.password.state"></mt-f>
        <mt-f label="确认密码" type="password" placeholder="请确认密码" v-model="form.cPassword.value" :state="form.cPassword.state"></mt-f>
        <mt-f label="手机号" type="tel" placeholder="请输入手机号" v-model="form.phone.value" :state="form.phone.state"></mt-f>
        <mt-f label="验证码"  type="number" placeholder="请输入验证码" v-model="form.verification.value" :state="form.verification.state">
          <mt-b @click="sendCode" plain size="small" type="primary" style="width: 100px">{{form.verification.time === 0 ? '获取验证码' : ('已发送 ' + form.verification.time)}}</mt-b>
        </mt-f>
        <mt-b @click="register" class="reg_btn">注册</mt-b>
      </div>
    </div>
  </div>
</template>

<script>
  import { Field, Button, Header } from 'mint-ui'
  export default {
    components: {
      MtF: Field,
      MtB: Button,
      MtH: Header
    },
    data () {
      return {
        form: {
          name: {
            value: '',
            state: ''
          },
          password: {
            value: '',
            state: ''
          },
          cPassword: {
            value: '',
            state: ''
          },
          phone: {
            value: '',
            state: ''
          },
          verification: {
            value: '',
            state: '',
            time: 0
          }
        }
      }
    },
    methods: {
      sendCode () {
        let toast = this.toast
        if (!/(\d{11})/.test(this.form.phone.value)) {
          toast('请输入正确的手机号')
        } else if (this.form.verification.time === 0) {
          this.form.verification.time = 10
          toast('验证码已发送')
          var codeWait = setInterval(() => {
            if (this.form.verification.time === 0) {
              clearInterval(codeWait)
            } else {
              this.form.verification.time--
            }
          }, 1000)
        } else {
          toast('请耐心等待验证码')
        }
      },
      register () {
        this.vaild({form: this.form, submit: true})
      },
      vaild ({form, submit}) {
        let name = form.name.value
        let password = form.password.value
        let cPassword = form.cPassword.value
        let phone = form.phone.value
        let verification = form.verification.value
        let toast = this.toast
        if (name.length > 8 && name !== '') {
          this.form.name.state = 'error'
          return toast('用户名2-8位')
        } else {
          this.form.name.state = ''
        }

        if (password.length > 16 && password !== '') {
          this.form.password.state = 'error'
          return toast('密码8-16数字或英文组成')
        } else {
          this.form.password.state = ''
        }

        if (password !== '' && cPassword !== '' && password !== cPassword) {
          this.form.cPassword.state = 'error'
          return toast('两次密码不一致')
        } else {
          this.form.cPassword.state = ''
        }

        if (phone.length > 11 && phone !== '') {
          this.form.phone.state = 'error'
          return toast('手机号长度为11位')
        } else {
          this.form.phone.state = ''
        }

        if (verification.length > 6) {
          return toast('验证码长度为6位')
        }
        if (submit) {
          let namePattern = /^.{2,8}$/
          let passwordPattern = /^([a-z]|[A-Z]|[0-9]){8,16}$/
          let phonePattern = /^1[3|4|5|8][0-9]\d{8}$/
          let verificationPattern = /^\d{6}$/

          if (!namePattern.test(name)) {
            this.form.name.state = 'error'
            return toast('用户名2-8位')
          }

          if (!passwordPattern.test(password)) {
            this.form.password.state = 'error'
            return toast('密码8-16数字或英文组成')
          }

          if (!phonePattern.test(phone)) {
            this.form.phone.state = 'error'
            return toast('手机号错误')
          }

          if (!verificationPattern.test(verification)) {
            this.form.verification.state = 'error'
            return toast('验证码错误')
          }
          var postData = this.$qs.stringify({
            name, password, phone
          })
          this.$axios.post(
            process.env.API_HOST + 'user/register',
            postData
          ).then(res => {
            if (res.data.code === 0) {
              toast('注册成功')
              localStorage.userinfo = JSON.stringify(res.data.data)
              localStorage.driverinfo = 1
              this.$router.push('/')
            } else {
              toast(res.data.msg)
            }
          })
        }
      },
      toast (msg) {
        this.$toast({message: msg, position: 'bottom', duration: 1000})
        return false
      }
    },
    watch: {
      form: {
        handler: function (val, oldVal) {
          if (val.verification.time === 0) {
            this.vaild({form: val, submit: false})
          }
        },
        deep: true
      }
    }

  }
</script>

<style scoped>
  .reg_container {
    padding-top: 25vh;
    height: 100vh;
  }
  .reg_form {
    margin: 0 auto;
    width: 90vw;
  }
  .reg_form>a{
    border-bottom: 1px solid #F1F1F1
  }
  .reg_form>a:first-child {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px
  }
  .reg_form>a:nth-last-child(2) {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    border-bottom: 0
  }
  .reg_btn {
    margin-top: 5vh;
    display: inline-block;
    width: 90vw;
    border: 1px solid #2ECC71;
    background-color: #2ECC71;
    color: #FFF;
  }
  .reg_btn::after {
    background-color: #27AE60 !important;
  }
</style>