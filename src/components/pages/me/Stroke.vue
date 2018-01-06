<template>
  <div class="view-box">
    <mt-h v-if="!strokeInfoShow" fixed title="我的行程">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-h>
    <mt-h v-else fixed title="行程信息">
        <mt-button @click.native="strokeInfoShow=false" slot="right" >关闭</mt-button>
    </mt-h>
    <transition 
    :enter-active-class="'animated ' + (strokeInfoShow ? 'slideInRight' : 'slideInLeft')"
    :leave-active-class="'animated ' + (strokeInfoShow ? 'slideOutLeft' : 'slideOutRight')">
      <ul v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loadAll"
        infinite-scroll-distance="0" 
        v-if="!strokeInfoShow" class="stroke-list">
        <li @click="viewStrokeInfo(stroke)" v-for="stroke in strokelist" :key="stroke.id" class="stroke-item">
          <mt-c is-link :title="strokeStatus[stroke.status]">
            <div class="stroke-info">
              <div><icon class="stroke-time" slot="icon" name="time" scale=".03"/>{{stroke.beginTime}}</div>
              <div><span class="stroke-start"></span>{{stroke.start}}</div>
              <div><span class="stroke-end"></span>{{stroke.end}}</div>
            </div>
          </mt-c>
        </li>
      </ul>
      <div v-else class="stroke-popup">
        <stroke @cancelStroke="cancelStroke" @deleteStroke="deleteStroke" :strokeInfo="strokeInfo" :type="type" @startStroke="startStroke"></stroke>
      </div>
    </transition>
    <div v-if="!loadAll" class="load-more">加载更多中...</div>
  </div>
</template>

<script>
  import { Cell, Header, Button, InfiniteScroll, Loadmore } from 'mint-ui'
  import Stroke from '@/components/pages/passeneger/Stroke'
  export default {
    components: {
      MtC: Cell,
      MtH: Header,
      MtB: Button,
      MtIS: InfiniteScroll,
      MtL: Loadmore,
      Stroke
    },
    data () {
      return {
        strokelist: [],
        strokeStatus: ['等待接单', '已接单', '行程中', '已完成', '行程已取消'],
        strokeInfoShow: false,
        strokeInfo: {},
        pageNum: 0,
        loadAll: false,
        driverinfo: JSON.parse(localStorage.driverinfo),
        type: 0
      }
    },
    mounted () {
      this.type = Number(this.$route.query.type) || 0
    },
    methods: {
      viewStrokeInfo (stroke) {
        this.strokeInfo = {}
        this.strokeInfoShow = true
        this.$nextTick(function () {
          this.strokeInfo = stroke
        })
      },
      cancelStroke () {
        this.strokeInfoShow = false
        if (this.type === 0) {
          for (let i = 0; i < this.strokelist.length; i++) {
            if (this.strokelist[i].id === this.strokeInfo.id) {
              this.strokelist[i].status = 4
            }
          }
        } else {
          for (let i = 0; i < this.strokelist.length; i++) {
            if (this.strokelist[i].id === this.strokeInfo.id) {
              this.strokelist.splice(i, 1)
            }
          }
        }
      },
      deleteStroke () {
        this.strokeInfoShow = false
        for (let i = 0; i < this.strokelist.length; i++) {
          if (this.strokelist[i].id === this.strokeInfo.id) {
            this.strokelist.splice(i, 1)
          }
        }
      },
      startStroke () {
      },
      loadMore () {
        let userId = JSON.parse(localStorage.userinfo).id
        let params
        if (this.type === 0) {
          params = {
            userId,
            roleId: 4
          }
        }
        if (this.type === 1) {
          params = {
            userId,
            roleId: 3,
            status: 1
          }
        }
        if (this.type === 2) {
          params = {
            userId,
            roleId: 3,
            status: 3
          }
        }
        this.pageNum++
        this.$axios.get(
          process.env.API_HOST + 'stroke/findAll/' + this.pageNum,
          {
            params: params
          }
        ).then(res => {
          if (res.data.code === 0) {
            this.strokelist = this.strokelist.concat(res.data.data.content)
            if (res.data.data.last) {
              this.loadAll = true
            }
          } else {
            this.toast(res.data.msg)
            this.loadAll = true
          }
        }).catch(res => {
          this.loadAll = false
          this.toast('连接服务器失败')
        })
      },
      toast (msg) {
        this.$toast({message: msg, position: 'bottom', duration: 1000})
      }
    }
  }
</script>

<style scoped lang="less">
  .stroke-list {
    margin: 50px 0;
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
        .stroke-start, .stroke-end {
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
      }
    }
  }
  .load-more {
    background-color: #EEE;
    padding: 10px 0;
    text-align: center;
    margin-bottom: -10vh;
    width: 100vw;
  }
  .stroke-popup {
    position: absolute;
    top: 0;
    left: 0;
    padding-top: 20vw;
    background-color: #fafafa;
    height: 100vh;
    width: 100vw;
  }
  .slideInRight, .slideInLeft, .slideOutRight, .slideOutLeft {
    animation-duration: .5s;
  }
</style>