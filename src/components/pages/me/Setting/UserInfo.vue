<template>
  <div class="view-box">
    <mt-h fixed title="个人信息">
      <router-link to="setting" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-h>
    <div class="cell-group">
      <mt-c @click.native="actionsShow=actionsShow===true?false:true" class="cell" title="会员头像" is-link>
          <img class="head-img" src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2924858960,2264534403&fm=27&gp=0.jpg">
      </mt-c>
      <mt-c href="#/modifyname" class="cell" title="会员昵称" value="用户名" is-link></mt-c>
    </div>
    <mt-a-s :actions="actions" v-model="actionsShow"></mt-a-s>
  </div>
</template>

<script>
  import { Cell, Header, Actionsheet } from 'mint-ui'

  export default {
    components: {
      MtC: Cell,
      MtH: Header,
      MtAS: Actionsheet
    },
    data () {
      return {
        actionsShow: false,
        actions: [
          {
            name: '从相册选择',
            method: function () {
              alert('未开发')
            }
          }
        ]
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