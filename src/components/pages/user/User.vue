<template>
  <div class="view-box" v-if="typeof (user) !== 'undefined'">
    <mt-h>
      <mt-b @click.native="close" slot="left" icon="back">返回</mt-b>
    </mt-h>
    <div class="head-warpper">
      <img :src="require('@/assets/img/head/' + user.headImg)" />
      <span>{{user.name}}</span>
    </div>
    <div class="userinfo">
      <div><span>用户名</span>{{user.name}}</div>
      <div><span>用户ID</span>{{user.id}}</div>
      <div><span>年龄</span>{{user.age === null ? '-' : user.age}}</div>
      <div><span>昵称</span>{{user.nikeName === null ? '-' : user.nikeName}}</div>
      <div><span>上次登录</span>{{user.lastOnlineTime === null ? '-' : user.lastOnlineTime}}</div>
    </div>
  </div>
</template>

<script>
  import { Header, Button } from 'mint-ui'
  export default {
    components: {
      MtH: Header,
      MtB: Button
    },
    data () {
      return {
      }
    },
    props: {
      user: [Object]
    },
    methods: {
      close () {
        this.$emit('close')
      }
    }
  }
</script>

<style scoped lang="less">
  .view-box {
    position: fixed;
    z-index: 1001;
    top: 0;
    left: 0;
    background-color: #FAFAFA;
  }
  .head-warpper{
    width: 100%;
    background-color: #374760;
    padding: 20px 0;
    img{
      display: block;
      margin: 0 auto;
      margin-bottom: 10px;
      height: 80px;
      width: 80px;
      border-radius: 40px;
      box-sizing: border-box;
      border: 3px solid #FFF;
    }
    span{
      display: inline-block;
      width: 100%;
      text-align: center;
      color: #FFF;
      font-size: 14px;
    }
  }
  .userinfo {
    margin-top: 50px;
    padding: 10px 15px;
    background-color: #FFF;
    font-size: 16px;
    box-shadow: 0 2px 4px #CCC;
    & > div {
      padding: 10px;
      &:not(:last-child) {
        border-bottom: 1px solid #F1F1F1;
      }
      & > span {
        width: 6em;
        display: inline-block;
      }
    }
  }
</style>