<template>
  <div class="view-box">
    <div class="head-warpper">
      <router-link to="setting">
        <img :src="require('@/assets/img/head/' + userinfo.headImg)" />
      </router-link>
      <span>{{userinfo.name}}</span>
    </div>
    <div class="cell-group">
      <mt-c href="#/purse" class="cell" title="钱包" is-link></mt-c>
      <mt-c href="#/stroke" class="cell" title="我的行程" is-link></mt-c>
      <mt-c @click.native="goStroke(1)" v-if="driverinfo !== 1" class="cell" title="待开始行程" is-link></mt-c>
      <mt-c @click.native="goStroke(2)" v-if="driverinfo !== 1" class="cell" title="已完成行程" is-link></mt-c>
      <mt-c href="#/setting" class="cell" title="设置" is-link></mt-c>
    </div>
    <!-- <div class="cell-group">
      <mt-c class="cell" title="成为车主" is-link></mt-c>
    </div> -->
  </div>
</template>

<script>
  import { Cell } from 'mint-ui'

  export default {
    components: {
      MtC: Cell
    },
    data () {
      return {
        userinfo: JSON.parse(localStorage.userinfo),
        driverinfo: JSON.parse(localStorage.driverinfo)
      }
    },
    methods: {
      goStroke (type) {
        this.$router.push({
          path: 'stroke',
          query: {
            type
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
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
  .cell-group {
    border-top: 1px solid #F1F1F1;
    border-bottom: 1px solid #F1F1F1;
    margin-top: 20px;
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
  .view-box {
    height: 90vh;
    padding-bottom: 10vh;
  }
</style>