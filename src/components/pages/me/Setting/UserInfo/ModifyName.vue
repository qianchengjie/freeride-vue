<template>
  <div class="view-box">
    <mt-h fixed title="修改会员昵称">
      <router-link to="userinfo" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-h>
    <mt-f class="field" placeholder="输入想要修改的会员昵称"></mt-f>
    <mt-b class="save-btn" type="primary">保存</mt-b>
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
  .field {
    margin-top: 60px;
    border-top: 1px solid #F1F1F1;
    border-bottom: 1px solid #F1F1F1
  }
</style>