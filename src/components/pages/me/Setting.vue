<template>
  <div class="view-box">
    <mt-h fixed title="设置">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-h>
    <div class="cell-group">
      <mt-c class="cell" is-link href="#/userinfo">
        <div slot="title">
          <img class="head-img" :src="require('@/assets/img/head/' + userinfo.headImg)">
          <div class="name">
            <p>{{userinfo.name}}</p>
          </div>
        </div>
      </mt-c>
      <mt-c class="cell" href="#/accountandsafe" title="账户与安全"  is-link></mt-c>
    </div>
    <mt-b @click.native="logout" class="logout-btn" type="danger">退出当前账户</mt-b>
  </div>
</template>

<script>
  import { Cell, Header, Button } from 'mint-ui'

  export default {
    components: {
      MtC: Cell,
      MtH: Header,
      MtB: Button
    },
    data () {
      return {
        userinfo: JSON.parse(localStorage.userinfo)
      }
    },
    methods: {
      logout () {
        localStorage.removeItem('userinfo')
        localStorage.driverinfo = 1
        this.$router.push('login')
      }
    }
  }
</script>

<style scoped lang="less">
  .head-img{
    padding: 10px 0;
    height: 60px;
    width: 60px;
    border-radius: 8px;
  }
  .name {
    display: inline-block;
    margin-left: 10px;
    padding-bottom: 20px;
  }
  .cell-group {
    border-top: 1px solid #F1F1F1;
    border-bottom: 1px solid #F1F1F1;
    margin-top: 40px;
    .cell:not(:last-child) {
      &::after {
        height: 1px;
        width: 100%;
        content: " ";
        display: block;
        margin-left: 15px;
        box-sizing: border-box;
        background-color: #F1F1F1
      }
    }
  }
  .logout-btn {
    width: 100vw;
    position: fixed;
    bottom: 0;
    border-radius: 0;
  }
</style>