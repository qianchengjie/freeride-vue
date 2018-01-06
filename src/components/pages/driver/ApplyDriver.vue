<template>
  <div :class="!readonly ? 'view-box' : ''">
    <mt-h v-if="!readonly" fixed title="申请车主">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-h>
    <div class="apply-form">
      <mt-f class="field" label="姓名" :readonly="readonly" :disableClear="readonly" v-model="name"></mt-f>
      <mt-f class="field" label="车牌" :readonly="readonly" :disableClear="readonly" v-model="vehicle.code"></mt-f>
      <mt-f class="field" label="车辆品牌" :readonly="readonly" :disableClear="readonly" v-model="vehicle.brand"></mt-f>
      <mt-f class="field" label="车辆颜色" :readonly="readonly" :disableClear="readonly" v-model="vehicle.color"></mt-f>
      <div class="license">
        <div>
          <img :src="driverLicense !== '' ? (driverImgUrl + driverLicense) : require('@/assets/img/icon/default.svg')">
          <mt-b v-if="!readonly" @click.native="uploadDriverLicense" type="default" size="small">上传驾照</mt-b>
        </div>
        <div>
          <img :src="drivingLicense !== '' ? (drivingImgUrl + drivingLicense) : require('@/assets/img/icon/default.svg')">
          <mt-b v-if="!readonly" @click.native="uploadDrivingLicense" type="default" size="small">上传行驶证</mt-b>
        </div>
      </div>
      <file-upload
        ref="fileUpload1"
        v-bind:filters="filters"
        v-bind:events='events1'
        :autoUpload="true"
        style="display: none"
        :url="fileUploadUrl[0]">
      </file-upload>
      <file-upload
        ref="fileUpload2"
        v-bind:filters="filters"
        v-bind:events='events2'
        :autoUpload="true"
        style="display: none"
        :url="fileUploadUrl[1]">
      </file-upload>
      <p v-if="readonly" class="reviewing-title">审核中</p>
    </div>
    <mt-b v-if="!readonly" @click.native="applyDriver" class="apply-btn" type="primary">申请车主</mt-b>
  </div>
</template>

<script>
  import { Header, Field, Button, DatetimePicker, Picker, MessageBox } from 'mint-ui'
  import VueFileUpload from 'vue-file-upload'
  export default {
    components: {
      MtH: Header,
      MtF: Field,
      MtB: Button,
      MtDP: DatetimePicker,
      MtP: Picker,
      MessageBox,
      FileUpload: VueFileUpload
    },
    data () {
      return {
        name: '',
        driverLicense: '',
        drivingLicense: '',
        fileUploadUrl: [
          process.env.API_HOST + 'driver/uploadDriverLicense',
          process.env.API_HOST + 'driver/uploadDrivingLicense'
        ],
        driverImgUrl: process.env.DIRVER_LICENSE_IMAGES_URL,
        drivingImgUrl: process.env.DIRVING_LICENSE_IMAGES_URL,
        vehicle: {
          code: '',
          brand: '',
          color: ''
        },
        driverinfo: JSON.parse(localStorage.driverinfo),
        readonly: false,
        filters: [
          {
            name: 'imageFilter',
            fn: (file) => {
              let type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|'
              if ('|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1) {
                return true
              } else {
                this.toast('请上传图片！')
              }
            }
          }
        ],
        events1: {
          onSuccessUpload: (file, res, status, headers) => {
            if (res.code === 0) {
              this.driverLicense = res.data
              this.toast('上传成功')
            } else {
              this.toast(res.msg)
            }
          },
          onErrorUpload: (file, res, status, headers) => {
            this.toast('上传失败')
          }
        },
        events2: {
          onSuccessUpload: (file, res, status, headers) => {
            console.log(res)
            if (res.code === 0) {
              this.drivingLicense = res.data
              this.toast('上传成功')
            } else {
              this.toast(res.msg)
            }
          },
          onErrorUpload: (file, res, status, headers) => {
            this.toast('上传失败')
          }
        }
      }
    },
    mounted () {
      if (this.driverinfo !== 1) {
        this.readonly = true
        this.name = this.driverinfo.name
        this.driverLicense = this.driverinfo.driverLicense
        this.drivingLicense = this.driverinfo.drivingLicense
        this.vehicle.code = this.driverinfo.vehicleCode
        this.vehicle.brand = this.driverinfo.vehicleBrand
        this.vehicle.color = this.driverinfo.vehicleColor
      }
    },
    methods: {
      uploadDriverLicense () {
        this.$refs.fileUpload1.$el.children[0].click()
      },
      uploadDrivingLicense () {
        this.$refs.fileUpload2.$el.children[0].click()
      },
      applyDriver () {
        if (this.vehicle.code === '' ||
          this.vehicle.brand === '' ||
          this.vehicle.color === '' ||
          this.drivingLicense === '' ||
          this.driverLicense === '') {
          this.toast('请填写完整')
        } else {
          const postData = this.$qs.stringify({
            userId: JSON.parse(localStorage.userinfo).id,
            name: this.name,
            driverLicense: this.driverLicense,
            drivingLicense: this.drivingLicense,
            vehicleBrand: this.vehicle.brand,
            vehicleCode: this.vehicle.code,
            vehicleColor: this.vehicle.color
          })
          this.$axios.post(
            process.env.API_HOST + 'driver/applyDriver',
            postData
          ).then(res => {
            if (res.data.code === 0) {
              this.toast('申请成功，等待审核')
              this.readonly = true
              localStorage.driverinfo = JSON.stringify(res.data.data)
            } else {
              this.toast(res.data.msg)
            }
          })
        }
      },
      toast (msg) {
        this.$toast({message: msg, position: 'bottom', duration: 1000})
      }
    }
  }
</script>

<style scoped lang="less">
  .reviewing-title{
    background-color: #FFF;
    margin: 0;
    padding: 10px 0;
    font-size: 20px;
    text-align: center;
    color: red;
  }
  .apply-form {
    width: 100vw;
    margin-top: 40px;
    padding: 10px 15px;
    box-sizing: border-box;
    background-color: #FFF;
    box-shadow: 0 2px 4px #CCC;
    margin-bottom: 4px;
    .field {
      border-bottom: 1px solid #F1F1F1;
    }
    .license {
      margin-top: 10px;
      width: 92vw;
      & > div {
        box-sizing: border-box;
        text-align: center;
        width: 45vw;
        display: inline-block;
      }
      img {
        border: 1px solid #CCC;
        box-sizing: border-box;
        width: 45vw;
        height: 30vw;
        margin-bottom: 10px;
        display: block;
      }
    }
  }
  .apply-btn {
    width: 100vw;
    position: absolute;
    bottom: 0;
    border-radius: 0;
  }
</style>