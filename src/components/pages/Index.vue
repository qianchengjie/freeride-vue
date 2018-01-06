<template>
  <div class="index">
    <mt-t-c v-model="active">
      <mt-t-c-i class="mt-t-c-i" id="tc1">
        <default></default>
      </mt-t-c-i>
      <mt-t-c-i  class="mt-t-c-i" id="tc2">
        <user-list></user-list>
      </mt-t-c-i>
      <mt-t-c-i class="mt-t-c-i" id="tc3">
        <messages></messages>
      </mt-t-c-i>
      <mt-t-c-i class="mt-t-c-i" id="tc4">
        <me></me>
      </mt-t-c-i>
    </mt-t-c>

    <mt-t class="tabbar" v-model="active">
      <mt-t-i id="tc1">
        <icon slot="icon" :name="'home' + (active === 'tc1' ? '-active' : '')" />
        首页
      </mt-t-i>
      <mt-t-i id="tc2">
        <icon slot="icon" :name="'userlist' + (active === 'tc2' ? '-active' : '')" />
        好友
      </mt-t-i>
      <mt-t-i id="tc3">
        <icon slot="icon" :name="'message' + (active === 'tc3' ? '-active' : '')" />
        消息
      </mt-t-i>
      <mt-t-i id="tc4">
        <icon slot="icon" :name="'me' + (active === 'tc4' ? '-active' : '')" />
        我
      </mt-t-i>
    </mt-t>
  </div>
</template>

<script>
import { TabContainer, TabContainerItem, Tabbar, TabItem } from 'mint-ui'
import Default from './index/default'
import UserList from './index/UserList'
import Me from './index/Me'
import Messages from './index/Messages'

export default {
  components: {
    MtTC: TabContainer,
    MtTCI: TabContainerItem,
    MtT: Tabbar,
    MtTI: TabItem,
    UserList,
    Messages,
    Me,
    Default
  },
  data () {
    return {
      active: 'tc1'
    }
  },
  mounted () {
  }
}
</script>

<style lang="less">
  .index {
    .tabbar {
      border-top: 1px solid #EFEFEF
    }
    .mt-t-c-i{
      .mint-indexlist-content{
        height: 100vh;
        box-sizing: border-box;
        padding-bottom: 100px;
      }
    }
    .mint-tab-item-label {
      color: #8a8a8a;
    }
    .is-selected {
      .mint-tab-item-label {
         color: #2aa515;
      }
    }
  }
</style>