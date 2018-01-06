// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Mint from 'mint-ui'
import axios from 'axios'
import qs from 'qs'
import Icon from '@/components/utils/commons/Icon'
import '@/assets/css/animate.min.css'

Vue.use(Mint)
Vue.component('icon', Icon)
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  let userinfo = localStorage.userinfo
  if ((typeof (userinfo) === 'undefined' || userinfo === '') && to.name !== 'login' && to.name !== 'register') {
    next('login')
  }
  if (typeof (userinfo) !== 'undefined') {
    const params = {
      userId: JSON.parse(localStorage.userinfo).id,
      status: 2
    }
    axios.get(
      process.env.API_HOST + 'stroke/findAll/1',
      { params }
    ).then(res => {
      if (res.data.code === 0 && res.data.data.content.length !== 0) {
        next('nowstroke')
      }
    }).catch(res => {
    })
  }
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
