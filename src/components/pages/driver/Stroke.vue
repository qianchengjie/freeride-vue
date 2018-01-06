<template>
  <div v-if="driverinfo !== 1">
    <apply-driver v-if="driverinfo.status === 2" :readonly="true"></apply-driver>
    <div @click="work" class="float-btn" v-if="driverinfo.status === 0 || driverinfo.status === 1">
      {{driverinfo.status === 1 ? '出车' : '收车'}}
    </div>
    <stroke-list v-if="driverinfo.status === 0"></stroke-list>
  </div>
</template>

<script>
  import { Header, Field, Button, DatetimePicker, Picker, MessageBox } from 'mint-ui'
  import ApplyDriver from './ApplyDriver'
  import StrokeList from './StrokeList'
  export default {
    components: {
      MtH: Header,
      MtF: Field,
      MtB: Button,
      MtDP: DatetimePicker,
      MtP: Picker,
      MessageBox,
      ApplyDriver,
      StrokeList
    },
    data () {
      return {
        driverinfo: JSON.parse(localStorage.driverinfo)
      }
    },
    methods: {
      work () {
        let url = 'driver/'
        url += this.driverinfo.status === 0 ? 'startWork' : 'stopWork'
        this.$emit('changeStatus', this.driverinfo.status === 0 ? 1 : 0)
        const postData = this.$qs.stringify({
          userId: JSON.parse(localStorage.userinfo).id
        })
        this.$axios.post(
          process.env.API_HOST + url,
          postData
        ).then(res => {
          if (res.data.code === 0) {
            this.driverinfo.status = this.driverinfo.status === 0 ? 1 : 0
            let driverinfo = JSON.parse(localStorage.driverinfo)
            driverinfo.status = this.driverinfo.status
            localStorage.driverinfo = JSON.stringify(driverinfo)
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .float-btn {
    z-index: 1000;
    width: 80px;
    height: 80px;
    border-radius: 50px;
    color: #FFF;
    font-weight: bold;
    background-color: #FF8751;
    border: 5px solid #FFDD7E;
    box-shadow: 0 0 8px #FD0;
    font-size: 20px;
    line-height: 80px;
    text-align: center;
    position: fixed;
    bottom: 80px;
    right: 20px;
    &:active {
      background-color: #EE7640;
      border: 5px solid #EECC6D;
      box-shadow: 0 0 8px #EC0;
    }
  }
</style>