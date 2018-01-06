<template>
  <div class="view-box">
    <mt-h fixed title="账户与安全">
      <router-link to="/setting" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-h>
    <div class="cell-group">
      <mt-c class="cell" title="会员名" value="用户名"></mt-c>
      <mt-c class="cell" href="#/modifyphone" title="修改绑定手机" value="134****5123"  is-link></mt-c>
      <mt-c class="cell" title="修改登录密码" is-link></mt-c>
    </div>
  </div>
</template>

<script>
  import { Cell, Header } from 'mint-ui'

  export default {
    components: {
      MtC: Cell,
      MtH: Header
    },
    data () {
      return {
      }
    }
  }
</script>

<style scoped lang="less">
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
</style>