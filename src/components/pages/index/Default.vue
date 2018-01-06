<template>
  <div class="view-box deafult">
    <mt-n class="navbar" v-model="active">
      <mt-t-i id="n1">
        发布行程
      </mt-t-i>
      <mt-t-i id="n2">
        开始接单
      </mt-t-i>
    </mt-n>

    <mt-t-c v-model="active">
      <mt-t-c-i class="mt-t-c-i" id="n1">
        <passeneger-stroke v-if="driverinfo === 1 || driverinfo.status === 1"></passeneger-stroke>
      </mt-t-c-i>
      <mt-t-c-i class="mt-t-c-i" id="n2">
        <div v-if="driverinfo === 1">
          <img style="width: 100vw; margin-top: 50px" :src="require('@/assets/img/bg/jiondrivers.png')">
          <img style="width: 100vw; margin-top: 3px" :src="require('@/assets/img/bg/jionmethod.png')">
          <mt-b @click.native="applydriver" style="width: 96vw; margin-left: 2vw;" type="primary">申请成为车主</mt-b>
        </div>
        <driver-stroke @changeStatus="changeStatus" v-else></driver-stroke>
      </mt-t-c-i>
    </mt-t-c>
  </div>
</template>

<script>
  import { Navbar, TabItem, TabContainer, TabContainerItem, Button } from 'mint-ui'
  import PassenegerStroke from '../passeneger/Stroke'
  import DriverStroke from '../driver/Stroke'
  export default {
    components: {
      MtTC: TabContainer,
      MtTCI: TabContainerItem,
      MtN: Navbar,
      MtTI: TabItem,
      MtB: Button,
      PassenegerStroke,
      DriverStroke
    },
    data () {
      return {
        active: 'n1',
        driverinfo: JSON.parse(localStorage.driverinfo)
      }
    },
    methods: {
      applydriver () {
        this.$router.push('applydriver')
      },
      changeStatus (status) {
        this.driverinfo.status = status
      }
    }
  }
</script>

<style lang="less">
  .deafult {
    height: 90vh;
    padding-bottom: 10vh;
    .field:not(:last-child) {
      border-bottom: 1px solid #F1F1F1;
    }
    .navbar {
      border-bottom: 3px solid #EEE;
      margin-bottom: -3px;
      z-index: 1001;
      position: fixed;
      width: 100vw;
    }
    .mint-tab-item > .mint-tab-item-label {
      font-size: 16px;
    }
    .mint-tab-item.is-selected > .mint-tab-item-label {
      color: #26A2FF;
      font-size: 16px;
    }
  }
</style>