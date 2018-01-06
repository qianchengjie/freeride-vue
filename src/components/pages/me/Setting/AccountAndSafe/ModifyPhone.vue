<template>
  <div class="view-box">
    <mt-h fixed title="修改绑定手机">
      <router-link to="userinfo" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-h>
    <mt-f v-if="step === 1" class="field" placeholder="验证码" v-model="code.value">
      <mt-b @click="sendCode" plain size="small" type="primary" style="width: 100px">{{code.time === 0 ? '获取验证码' : ('已发送 ' + code.time)}}</mt-b>
    </mt-f>

    <mt-f v-if="step === 2" class="field" placeholder="手机号" v-model="phone.value"></mt-f>
    <mt-f v-if="step === 2" placeholder="验证码" v-model="code1.value">
      <mt-b @click="sendCode1" plain size="small" type="primary" style="width: 100px">{{code1.time === 0 ? '获取验证码' : ('已发送 ' + code1.time)}}</mt-b>
    </mt-f>
    
    <mt-b @click.native="nextStep" class="save-btn" type="primary">{{step===1?'下一步':'确认修改'}}</mt-b>
  </div>
</template>

<script>
  import { Cell, Header, Button, Field } from 'mint-ui'

  export default {
    components: {
      MtC: Cell,
      MtH: Header,
      MtB: Button,
      MtF: Field
    },
    data () {
      return {
        code: {
          value: '',
          _value: '123456',
          time: 0
        },
        code1: {
          value: '',
          _value: '456789',
          time: 0
        },
        phone: {
          value: '',
          pattern: /^1[3|4|5|8][0-9]\d{8}$/
        },
        step: 1
      }
    },
    methods: {
      sendCode () {
        let toast = this.toast
        if (this.code.time === 0) {
          this.code.time = 10
          toast('验证码已发送')
          var codeWait = setInterval(() => {
            if (this.code.time === 0) {
              clearInterval(codeWait)
            } else {
              this.code.time--
            }
          }, 1000)
        } else {
          toast('请耐心等待验证码')
        }
      },
      sendCode1 () {
        let toast = this.toast
        if (!this.phone.pattern.test(this.phone.value)) {
          toast('手机格式不正确')
        } else if (this.code1.time === 0) {
          this.code1.time = 10
          toast('验证码已发送')
          var code1Wait = setInterval(() => {
            if (this.code1.time === 0) {
              clearInterval(code1Wait)
            } else {
              this.code1.time--
            }
          }, 1000)
        } else {
          toast('请耐心等待验证码')
        }
      },
      nextStep () {
        let toast = this.toast
        if (this.step === 1) {
          if (this.code.value === this.code._value) {
            this.step = 2
          } else {
            toast('请输入正确的验证码')
          }
        } else if (this.step === 2) {
          if (this.code1.value !== this.code1._value) {
            toast('请输入正确的验证码')
          } else if (!this.phone.pattern.test(this.phone.value)) {
            toast('手机格式不正确')
          } else {
            toast('修改成功')
          }
        }
      },
      toast (msg) {
        this.$toast({message: msg, position: 'bottom', duration: 1000})
        return false
      }
    }
  }
</script>

<style scoped lang="less">
  .save-btn {
    width: 100vw;
    position: fixed;
    bottom: 0;
    border-radius: 0;
  }
  .field:not(:last-child) {
    margin-top: 60px;
    border-top: 1px solid #F1F1F1;
    border-bottom: 1px solid #F1F1F1
  }
</style>