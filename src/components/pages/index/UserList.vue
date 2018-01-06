<template>
  <div class="view-box">
    <!-- <mt-search
      v-model="search.value"
      :show="search.show"
      :result="search.result"
      cancel-text="取消"
      placeholder="搜索">
    </mt-search> -->
    <mt-i-l v-if="loadFinish">
      <mt-i-s v-for="letter of letterList" :index="letter" :key="letter" v-if="typeof (userList[letter]) !== 'undefined'" >
        <mt-c @click.native="chooseUser(user)" v-for="user of userList[letter]" :key="user.id" :title="user.nikeName">
          <img style="height: 40px;width: 40px; margin: 0 10px" slot="icon" :src="require('@/assets/img/head/' + user.headImg)" />
        </mt-c>
      </mt-i-s>
    </mt-i-l>
    <user v-if="userShow" :user="user" @close="userShow=false"></user>
  </div>
</template>

<script>
import { IndexList, IndexSection, Cell, Search } from 'mint-ui'
import User from '../user/User'
import py from 'pinyin'

export default {
  components: {
    'mtIL': IndexList,
    'mtIS': IndexSection,
    'mtC': Cell,
    'mt-s': Search,
    User
  },
  data () {
    return {
      letterList: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '#'],
      userList: {'#': []},
      loadFinish: false,
      search: {
        value: '',
        show: false,
        result: []
      },
      userShow: false,
      user: {}
    }
  },
  mounted () {
    this.$axios.get(process.env.API_HOST + '/user/findAll')
    .then(res => {
      if (res.data.code === 0) {
        for (let item of res.data.data) {
          let letter = py(item.name, {style: py.STYLE_FIRST_LETTER})[0][0].toUpperCase().substr(0, 1)
          if (this.letterList.includes(letter)) {
            if (typeof (this.userList[letter]) === 'undefined') {
              this.userList[letter] = []
            }
            this.userList[letter].push(item)
            this.loadFinish = true
          } else {
            this.userList['#'].push(item)
          }
        }
      } else {
        this.$toast({message: res.data.msg, position: 'top'})
      }
    })
  },
  methods: {
    searchFocus () {
      console.log(1)
    },
    chooseUser (user) {
      this.user = user
      this.$nextTick(() => {
        this.userShow = true
      })
    }
  }
}
</script>

<style lang="less">
  .view-box {
    height: 90vh;
    padding-bottom: 10vh;
  }
</style>