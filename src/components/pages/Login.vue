<template>
  <div>
    <mt-header fixed title="用户登录">
      <!-- <router-link v-if="" to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link> -->
    </mt-header>
    <div class="log_container">
      <div class="log_form">
        <mt-f label="帐号" placeholder="用户名或手机" v-model="form.account.value" :state="form.account.state"></mt-f>
        <mt-f label="密码" type="password" placeholder="密码" v-model="form.password.value" :state="form.password.state"></mt-f>
        <mt-b @click="log" class="log_btn">登录</mt-b>
        <mt-b @click="reg" class="reg_btn">注册新账号</mt-b>
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
          account: {
            value: '',
            state: ''
          },
          password: {
            value: '',
            state: ''
          }
        }
      }
    },
    methods: {
      log () {
        let account = this.form.account.value
        let password = this.form.password.value
        let namePattern = /^.{2,8}$/
        let passwordPattern = /^([a-z]|[A-Z]|[0-9]){8,16}$/
        let phonePattern = /^1[3|4|5|8][0-9]\d{8}$/
        let toast = this.toast
        if (!namePattern.test(account) && !phonePattern.test(account)) {
          toast('请输入正确的帐号')
        } else if (!passwordPattern.test(password)) {
          toast('请输入正确的密码')
        } else {
          const postData = this.$qs.stringify({
            name: account,
            phone: account,
            password: password
          })
          this.$axios.post(
            process.env.API_HOST + 'user/login',
            postData
          ).then(res => {
            if (res.data.code === 0) {
              localStorage.userinfo = JSON.stringify(res.data.data)
              this.$axios.get(
                process.env.API_HOST + 'driver/find/' + res.data.data.id
              ).then(res => {
                if (res.data.code === 0) {
                  if (res.data.data !== 1) {
                    localStorage.driverinfo = JSON.stringify(res.data.data)
                  } else {
                    localStorage.driverinfo = 1
                  }
                } else {
                  toast(res.data.msg)
                }
                this.$router.push('/')
              })
            } else {
              toast(res.data.msg)
            }
          })
        }
      },
      reg () {
        this.$router.push('register')
      },
      toast (msg) {
        this.$toast({message: msg, position: 'bottom', duration: 1000})
      }
    }
  }
</script>

<style scoped lang="less">
  .log_container {
    padding-top: 30vh;
    height: 100vh;
    .log_form {
      margin: 0 auto;
      width: 90vw;
      a {
        border-bottom: 1px solid #F1F1F1
      }
      &>a:first-child {
        border-top-left-radius: 4px;
        border-top-right-radius: 4px
      }
      &>a:nth-last-child(3) {
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px
      }
    }
    .log_btn, .reg_btn{
      margin-top: 5vh;
      display: inline-block;
      width: 90vw;
      border: 1px solid #2ECC71;
      background-color: #2ECC71;
      color: #FFF;
    }
    .reg_btn {
      margin-top: 2vh;
      border: 1px solid #3498DB;
      background-color: #3498DB;
    }
    .reg_btn::after, .log_btn::after {
      background-color: #27AE60 !important;
    }
  }
</style>