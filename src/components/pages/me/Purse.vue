<template>
  <div class="view-box" v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loadAll"
        infinite-scroll-distance="0"  >
    <mt-h fixed title="我的钱包">
      <router-link to="/" slot="left">
        <mt-b icon="back">返回</mt-b>
      </router-link>
    </mt-h>
    <header class="purse-money">
      <div class="purse">账户余额： {{parseFloat(userinfo.purse).toFixed(2)}}元
        <mt-b class="p-btn" @click.native="withdrawals">提现</mt-b>
        <mt-b class="p-btn" type="primary" @click.native="recharge">充值</mt-b>
      </div>
    </header>
    <div class="detail">
      <ul class="detail-list">
        <li v-for="detail of detaillist" class="detail-item">
          <div class="detail-sum" :style="detail.type === 1 || detail.type === 2 ? 'color: #F00' : ''">
            {{detail.type === 1 || detail.type === 2 ? '+' : '-' }}{{parseFloat(detail.sum).toFixed(2)}}
          </div>
          <div class="detail-content">
            <div class="detail-desc">
              {{detail.descText}}
            </div>
            <div class="detail-time">
              {{detail.date}}
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div v-if="!loadAll" class="load-more">加载更多中...</div>
  </div>
</template>

<script>
  import { Button, Header, MessageBox } from 'mint-ui'
  export default {
    components: {
      MtB: Button,
      MtH: Header,
      MessageBox
    },
    data () {
      return {
        userinfo: JSON.parse(localStorage.userinfo),
        pageNum: 1,
        detaillist: [],
        loadAll: false
      }
    },
    mounted () {
      this.getUserinfo()
      this.findAllTD()
    },
    methods: {
      getUserinfo () {
        this.$axios.get(
          process.env.API_HOST + 'user/find/' + this.userinfo.id
        ).then(res => {
          if (res.data.code === 0) {
            this.userinfo = res.data.data
            localStorage.userinfo = JSON.stringify(this.userinfo)
          } else {
            this.toast(res.data.msg)
          }
        })
      },
      recharge () {
        MessageBox.prompt('请输入充值金额', '').then(({ value, action }) => {
          const postData = this.$qs.stringify({
            userId: this.userinfo.id,
            price: value
          })
          this.$axios.post(
            process.env.API_HOST + 'user/recharge',
            postData
          ).then(res => {
            if (res.data.code === 0) {
              this.toast('充值成功')
              this.userinfo.purse += Number(value)
              localStorage.userinfo = JSON.stringify(this.userinfo)
              this.detaillist.unshift(res.data.data)
            } else {
              this.toast(res.data.msg)
            }
          })
        }).catch(res => {})
      },
      withdrawals () {
        MessageBox.prompt('请输入提现金额', '').then(({ value, action }) => {
          const postData = this.$qs.stringify({
            userId: this.userinfo.id,
            price: value
          })
          this.$axios.post(
            process.env.API_HOST + 'user/withdrawals',
            postData
          ).then(res => {
            if (res.data.code === 0) {
              this.toast('充值成功')
              this.userinfo.purse -= Number(value)
              localStorage.userinfo = JSON.stringify(this.userinfo)
              this.detaillist.unshift(res.data.data)
            } else {
              this.toast(res.data.msg)
            }
          })
        }).catch(res => {})
      },
      loadMore () {
        this.pageNum++
        this.findAllTD()
      },
      findAllTD () {
        this.$axios.get(
          process.env.API_HOST + 'user/findAllTD/' + this.pageNum,
          {
            params: {
              userId: this.userinfo.id
            }
          }
        ).then(res => {
          if (res.data.data.last) {
            this.loadAll = true
          }
          if (res.data.code === 0) {
            this.detaillist = this.detaillist.concat(res.data.data.content)
          } else {
            this.toast(res.data.msg)
          }
        })
      },
      toast (msg) {
        this.$toast({message: msg, position: 'bottom', duration: 1000})
      }
    }
  }
</script>

<style scoped lang="less">
	.purse-money {
    margin-top: 40px;
    height: 50px;
    width: 100vw;
    color: #FFF;
    font-size: 18px;
    background-color: #5A53AB;
    .purse {
      padding: 10px 15px;
      .p-btn {
        float: right;
        height: 30px;
      }
    }
  }
  .detail {
    .detail-list {
      margin: 10px 3vw;
      .detail-item {
        background-color: #FFF;
        padding: 10px 1vw;
        margin-top: 10px;
        box-shadow: 0 0 4px #CCC;
        .detail-sum {
          float: right;
          width: 20vw;
          text-align: right;
          font-size: 16px;
          font-weight: bold;
        }
        .detail-content {
          width: 70vw;
          padding: 0 10px;
          box-sizing: border-box;
          .detail-time {
            color: #888;
          }
        }
      }
    }
  }
  .load-more {
    background-color: #EEE;
    padding: 10px 0;
    text-align: center;
    margin-bottom: -10vh;
    width: 100vw;
  }
</style>