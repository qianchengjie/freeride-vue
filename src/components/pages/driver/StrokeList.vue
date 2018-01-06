<template>
  <ul class="stroke-list">
    <li @click="takingStroke(stroke)" v-for="stroke in strokelist" :key="stroke.id" class="stroke-item">
      <mt-c is-link>
        <div class="stroke-info">
          <div><icon class="stroke-time" slot="icon" name="time" scale=".03"/>{{stroke.beginTime}}</div>
          <div><span class="stroke-start"></span>{{stroke.start}}</div>
          <div><span class="stroke-end"></span>{{stroke.end}}</div>
          <div><span class="stroke-amount"></span>{{stroke.amount}}人</div>
        </div>
      </mt-c>
    </li>
  </ul>
</template>

<script>
  
  import { Cell, MessageBox } from 'mint-ui'
  export default {
    components: {
      MtC: Cell,
      MessageBox
    },
    data () {
      return {
        strokelist: [],
        pageNum: 1
      }
    },
    mounted () {
      this.getStrokeList()
    },
    methods: {
      getStrokeList () {
        this.$axios.get(
          process.env.API_HOST + 'stroke/findAll/' + this.pageNum,
          {
            params: {
              roleId: 4,
              status: 0
            }
          }
        ).then(res => {
          if (res.data.code === 0) {
            this.strokelist = this.strokelist.concat(res.data.data.content)
            if (res.data.data.last) {
            }
          } else {
            this.toast(res.data.msg)
          }
        }).catch(res => {
          this.toast('连接服务器失败')
        })
      },
      takingStroke (stroke) {
        MessageBox.confirm('确定接下此单？').then(action => {
          const postData = this.$qs.stringify({
            userId: JSON.parse(localStorage.userinfo).id,
            strokeId: stroke.id
          })
          this.$axios.post(
            process.env.API_HOST + 'stroke/strokeTaking',
            postData
          ).then(res => {
            if (res.data.code === 0) {
              this.toast('接单成功')
              for (let i = 0; i < this.strokelist.length; i++) {
                if (this.strokelist[i].id === stroke.id) {
                  this.strokelist.splice(i, 1)
                }
              }
            } else {
              this.toast(res.data.msg)
            }
          })
        }).catch(act => {})
      },
      toast (msg) {
        this.$toast({message: msg, position: 'bottom', duration: 1000})
      }
    }
  }
</script>

<style scoped lang="less">
  .stroke-list {
    margin-top: 60px;
    margin-bottom: 60px;
    .stroke-item {
      padding: 10px 5px;
      box-sizing: border-box;
      width: 94vw;
      margin-left: 3vw;
      margin-top: 20px;
      box-shadow: 0 2px 4px #CCC;
      background-color: #FFF;
      .stroke-info {
        padding: 10px 15px;
        margin-left: 10px;
        border-left: 1px solid #F1F1F1;
        font-size: 14px;
        & > div {
          margin-bottom: 5px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
        }
        .stroke-time {
          margin: 0 15px;
        }
        .stroke-start, .stroke-end, .stroke-amount {
          margin: 0 15px;
          height: 8px;
          width: 8px;
          border-radius: 4px;
          display: inline-block;
        }
        .stroke-start {
          background-color: #4C0;
        }
        .stroke-end {
          background-color: #F90;
        }
        .stroke-amount {
          background-color: #0FF;
        }
      }
    }
  }
</style>