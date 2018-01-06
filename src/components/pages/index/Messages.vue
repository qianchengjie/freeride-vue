<template>
  <div class="view-box">
    <ul class="msg-list">
      <li class="msg-item" v-for="i in (0,10)">
        <div class="msg-head-img">
          <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2519280229,3438460415&fm=27&gp=0.jpg">
        </div>
        <div class="msg-content">
          <div class="msg-info">
            <span class="msg-name">好友一</span>
            <span class="msg-info">消息内容消息内容消息内容消息内容消息内容</span>
            <span class="msg-time">2017年12月19日 14:39:02</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data () {
      return {

      }
    }
  }
</script>

<style scoped lang="less">
  ul.msg-list {
    background-color: #FFF;
    margin: 0;
    padding: 0;
    li.msg-item {
      height: 20vw;
      min-height: 60px;
      position: relative;
      list-style: none;
      border-bottom: 1px solid #F1F1F1;
      .msg-head-img {
        display: inline-block;
        img {
          height: 15vw;
          width: 15vw;
          padding: 2.5vw;
        }
      }
      .msg-content {
        min-height: 60px;
        width: 80vw;
        height: 20vw;
        position: absolute;
        top: 10px;
        display: inline-block;
        .msg-info {
          .msg-name {
            font-size: 16px;
            display: block;
          }
          .msg-info {
            display: block;
            font-size: 14px;
            color: #888;
          }
          .msg-time {
            position: absolute;
            right: 10px;
            bottom: 10px;
          }
        }
      }
    }
  }
  .view-box {
    height: 90vh;
    padding-bottom: 10vh;
  }
</style>