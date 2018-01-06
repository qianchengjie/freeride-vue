<template>
  <div>
    <!-- <mt-h fixed title="顺风车">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-h> -->
    <div class="stroke_form">
      <mt-f class="field" label="出发地" placeholder="填写出发地" :readonly="!edit" :disableClear="!edit" v-model="stroke.start"></mt-f>
      <mt-f class="field" label="目标地" placeholder="填写目标地" :readonly="!edit" :disableClear="!edit" v-model="stroke.end"></mt-f>
      <mt-f v-if="!edit" readonly disableClear class="field" label="人数" v-model="stroke.amount"  placeholder="选择出行人数">
      </mt-f>
      <mt-f v-else @click.native="selectAmountShow=true" readonly disableClear class="field" label="人数" v-model="stroke.amount"  placeholder="选择出行人数">
      </mt-f>
      <div v-show="selectAmountShow" class="amount-picker">
        <div @click="selectAmountShow=false" class="mask"></div>
        <div class="amount-picker-content">
          <div class="amount-picker-btn">
            <span @click="selectAmountShow=false">取消</span>
            <span @click="amountConfirm">确定</span>
          </div>
          <mt-p @change="amountChange" :slots="[{flex:1,values: [1,2,3,4]}]"></mt-p>
        </div>
      </div>
      <mt-f v-if="!edit" readonly disableClear class="field" label="出发时间" v-model="stroke.beginDate"  placeholder="选择出发时间">
      </mt-f>
      <mt-f v-else @click.native="dateTimePicker" readonly disableClear class="field" label="出发时间" v-model="stroke.beginDate"  placeholder="选择出发时间">
      </mt-f>
      <mt-f v-if="!edit && strokeInfo.finishTime !== null" readonly disableClear class="field" label="结束时间" v-model="strokeInfo.finishTime"  placeholder="选择出发时间"> </mt-f>
      <mt-datetime-picker
        v-model="datetime"
        :startDate="new Date()"
        :endDate="new Date(new Date().getTime()+5*24*3600*1000)"
        ref="datetime"
        type="datetime"
        yearFormat="{value}年"
        monthFormat="{value}月"
        dateFormat="{value}日"
        @confirm="confirmDate">
      </mt-datetime-picker>

      <mt-f v-if="!edit" readonly disableClear class="field" label="车费" v-model="stroke.price">
      </mt-f>
    </div>
    <div class="price" v-if="complete && edit">
      <div @click="choose=0" :class="choose === 0?'active':''">
        <span>拼车</span>
        <span>{{parseFloat(price.ran1).toFixed(2)}}</span>元
      </div>
      <div @click="choose=1" :class="choose === 1?'active':''">
        <span>不拼车</span>
        <span>{{parseFloat(price.ran2).toFixed(2)}}</span>元
      </div>
    </div>
    <mt-b @click="submit" v-if="complete && edit" class="submit-btn" type="primary">确认发布</mt-b>
    <mt-b @click="cancel" v-if="typeof (strokeInfo) !== 'undefined' && (strokeInfo.status == 0 || strokeInfo.status == 1)" class="cancel-btn" type="danger">取消行程</mt-b>
    <mt-b @click="deleteStoke" v-if="typeof (strokeInfo) !== 'undefined' && (strokeInfo.status == 3 || strokeInfo.status == 4)" class="delete-btn" type="danger">删除行程</mt-b>
    <mt-b @click="startStroke" v-if="type === 1 && strokeInfo.status === 1 " class="start-btn" type="primary">开始行程</mt-b>
  </div>
</template>

<script>
  import { Header, Field, Button, DatetimePicker, Picker, MessageBox } from 'mint-ui'
  export default {
    components: {
      MtH: Header,
      MtF: Field,
      MtB: Button,
      MtDP: DatetimePicker,
      MtP: Picker,
      MessageBox
    },
    data () {
      return {
        stroke: {
          start: '',
          end: '',
          amount: '',
          beginDate: ''
        },
        price: {
          ran1: 0,
          ran2: 0
        },
        choose: 0,
        selectAmount: 0,
        selectAmountShow: false,
        datetime: '',
        startHour: '',
        complete: false,
        edit: true
      }
    },
    props: {
      strokeInfo: [Object],
      type: [Number]
    },
    mounted () {
      this.datetime = new Date()
    },
    methods: {
      dateTimePicker () {
        this.$refs.datetime.open()
      },
      confirmDate () {
        this.stroke.beginDate = this.datetime.toLocaleString()
      },
      amountConfirm () {
        if (this.selectAmount === null) {
          this.stroke.amount = 1
        } else {
          this.stroke.amount = this.selectAmount
        }
        this.selectAmountShow = false
      },
      amountChange (amountPicker) {
        this.selectAmount = amountPicker.getSlotValue(0)
      },
      startStroke () {
        const postData = this.$qs.stringify({
          strokeId: this.strokeInfo.id
        })
        this.$axios.post(
          process.env.API_HOST + 'stroke/startStroke',
          postData
        ).then(res => {
          if (res.data.code === 0) {
            this.toast('开始行程')
            this.$router.push('nowstroke')
          } else {
            this.toast(res.data.msg)
          }
        })
      },
      submit () {
        if (this.stroke.start === '' &&
          this.stroke.end === '' &&
          this.stroke.amount === '' &&
          this.stroke.beginDate === '') {
          this.toast('请填写完整')
        } else {
          const postData = this.$qs.stringify({
            start: this.stroke.start,
            end: this.stroke.end,
            price: parseFloat(this.choose === 0 ? this.price.ran1 : this.price.ran2).toFixed(2),
            amount: this.stroke.amount,
            beginTime: this.stroke.beginDate.substr(0, 11) + this.stroke.beginDate.substr(13),
            userId: JSON.parse(localStorage.userinfo).id,
            roleId: 4
          })
          this.$axios.post(
            process.env.API_HOST + 'stroke/add',
            postData
          ).then(res => {
            if (res.data.code === 0) {
              this.toast('提交行程成功')
              // this.$router.push()
            } else {
              this.toast(res.data.msg)
            }
          })
        }
      },
      cancel () {
        MessageBox.confirm('确定取消行程？').then(action => {
          let postData
          if (this.type === 1) {
            postData = this.$qs.stringify({
              userId: JSON.parse(localStorage.userinfo).id,
              roleId: 3,
              strokeId: this.strokeInfo.id
            })
          } else if (this.type === 0) {
            postData = this.$qs.stringify({
              userId: JSON.parse(localStorage.userinfo).id,
              roleId: 4,
              strokeId: this.strokeInfo.id
            })
          }
          this.$axios.post(
            process.env.API_HOST + 'stroke/cancel',
            postData
          ).then(res => {
            if (res.data.code === 0) {
              this.toast('取消行程成功')
              this.$emit('cancelStroke')
            } else {
              this.toast(res.data.msg)
            }
          })
        }).catch(act => {})
      },
      deleteStoke () {
        let roleId = 4
        if (this.type === 1) {
          roleId = 3
        }
        if (this.type === 2) {
          roleId = 3
        }
        MessageBox.confirm('确定删除行程？').then(action => {
          this.$axios.delete(
            process.env.API_HOST + 'stroke/delete',
            {
              params: {
                userId: JSON.parse(localStorage.userinfo).id,
                roleId,
                strokeId: this.strokeInfo.id
              }
            }
          ).then(res => {
            if (res.data.code === 0) {
              this.toast('删除行程成功')
              this.$emit('deleteStroke')
            } else {
              this.toast(res.data.msg)
            }
          })
        }).catch(act => {})
      },
      toast (msg) {
        this.$toast({message: msg, position: 'bottom', duration: 1000})
      }
    },
    watch: {
      stroke: {
        handler: function (stroke) {
          if (stroke.start !== '' && stroke.end !== '' && stroke.amount !== '' && stroke.beginDate !== '') {
            this.complete = true
            this.price.ran1 = 20 + Math.random() * 5 * stroke.amount
            this.price.ran2 = this.price.ran1 + 12
          } else {
            this.complete = false
          }
        },
        deep: true
      },
      strokeInfo: {
        handler: function (stroke) {
          if (typeof (this.strokeInfo) !== 'undefined') {
            this.stroke.start = this.strokeInfo.start
            this.stroke.end = this.strokeInfo.end
            this.stroke.beginDate = this.strokeInfo.beginTime
            this.stroke.amount = this.strokeInfo.amount
            this.stroke.price = this.strokeInfo.price
            this.edit = false
          }
        },
        deep: true
      }
    }
  }
</script>

<style scoped lang="less">
  .stroke_form {
    width: 96vw;
    margin-left: 2vw;
    margin-top: 60px;
    border: 1px solid #F1F1F1;
    border-radius: 4px;
    box-shadow: 0 0 2px #CCC;
    .field:not(:last-child) {
      border-bottom: 1px solid #F1F1F1;
    }
  }
  .amount-picker {
    .amount-picker-content {
      width: 100vw;
      left: 0;
      background-color: #FFF;
      border-top: 1px solid #F1F1F1;
      position: fixed;
      bottom: 0;
      z-index: 2000;
      .amount-picker-btn {
        padding: 10px 0;
        font-size: 16px;
        color: #4EB3FF;
        border-bottom: 1px solid #DDD;
        span {
          display: inline-block;
          width: 49vw;
          text-align: center;
        }
      }
    }
    .mask {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 999;
      height: 100vh;
      width: 100vw;
      background-color: rgba(0, 0, 0, 0.4);
      display: block;
      content: " "
    }
  }
  .price {
    margin-top: 15vh;
    margin-left: 2vw;
    width: 96vw;
    padding: 2vw 0;
    background-color: #FFF;
    border-radius: 4px;
    box-shadow: 0 0 4px #CCC;
    div {
      display: inline-block;
      width: 47vw;
      text-align: center;
      span:first-child {
        display: block;
      }
      span:last-child {
        font-size: 30px;
      }
    }
    div:first-child {
      border-right: 1px solid #F1F1F1;
    }
    .active {
      color: #FF8E00;
    }
  }
  .submit-btn, .cancel-btn, .delete-btn, .start-btn {
    margin-top: 2vw;
    margin-left: 2vw;
    width: 96vw;
  }
  .cancel-btn, .delete-btn {
    margin-top: 5vh;
  }
</style>