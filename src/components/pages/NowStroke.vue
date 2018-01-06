<template>
  <div>
    <mt-b v-if="isDriver" @click="finishStroke" type="primary">完成行程</mt-b>
    <div v-else>行程中...</div>
  </div>
</template>

<script>
  import { Button } from 'mint-ui'
  export default {
    components: {
      MtB: Button
    },
    data () {
      return {
        stroke: {},
        isDriver: false
      }
    },
    mounted () {
      this.getDriverStroke()
      this.getDriverStroke()
    },
    methods: {
      getDriverStroke () {
        const params = {
          userId: JSON.parse(localStorage.userinfo).id,
          roleId: 3,
          status: 2
        }
        this.$axios.get(
          process.env.API_HOST + 'stroke/findAll/1',
          { params }
        ).then(res => {
          if (res.data.code === 0) {
            if (res.data.data.content.length !== 0) {
              this.stroke = res.data.data.content[0]
              this.isDriver = true
            }
          }
        }).catch(res => {
        })
      },
      getPassenegerStroke () {
        const params = {
          userId: JSON.parse(localStorage.userinfo).id,
          roleId: 4,
          status: 2
        }
        this.$axios.get(
          process.env.API_HOST + 'stroke/findAll/1',
          { params }
        ).then(res => {
          if (res.data.code === 0) {
            if (res.data.data.content.length !== 0) {
              this.stroke = res.data.data.content[0]
            }
          } else {
            this.toast(res.data.msg)
          }
        }).catch(res => {})
      },
      finishStroke () {
        const postData = this.$qs.stringify({
          strokeId: this.stroke.id
        })
        this.$axios.post(
          process.env.API_HOST + 'stroke/finishStroke',
          postData
        ).then(res => {
          console.log(res)
          if (res.data.code === 0) {
            this.toast('行程完成')
            this.$router.push('/')
          } else {
            this.toast(res.data.msg)
          }
        }).catch(res => {})
      },
      toast (msg) {
        this.$toast({message: msg, position: 'bottom', duration: 1000})
      }
    }
  }
</script>

<style scoped lang="less">
  
</style>