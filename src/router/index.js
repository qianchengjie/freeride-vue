import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/pages/Index'
import NowStroke from '@/components/pages/NowStroke'
import Register from '@/components/pages/Register'
import Login from '@/components/pages/Login'
import Purse from '@/components/pages/me/Purse'
import Setting from '@/components/pages/me/Setting'
import UserInfo from '@/components/pages/me/setting/UserInfo'
import ModifyName from '@/components/pages/me/setting/userinfo/ModifyName'
import AccountAndSafe from '@/components/pages/me/setting/AccountAndSafe'
import ModifyPhone from '@/components/pages/me/setting/accountandsafe/ModifyPhone'
import Stroke from '@/components/pages/me/Stroke'
import ApplyDriver from '@/components/pages/driver/ApplyDriver'
import 'mint-ui/lib/style.css'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/setting',
      name: 'setting',
      component: Setting
    },
    {
      path: '/userinfo',
      name: 'userinfo',
      component: UserInfo
    },
    {
      path: '/modifyname',
      name: 'modifyname',
      component: ModifyName
    },
    {
      path: '/accountandsafe',
      name: 'accountandsafe',
      component: AccountAndSafe
    },
    {
      path: '/modifyphone',
      name: 'modifyphone',
      component: ModifyPhone
    },
    {
      path: '/stroke',
      name: 'stroke',
      component: Stroke
    },
    {
      path: '/applydriver',
      name: 'applydriver',
      component: ApplyDriver
    },
    {
      path: '/nowstroke',
      name: 'nowstroke',
      component: NowStroke
    },
    {
      path: '/purse',
      name: 'purse',
      component: Purse
    }
  ]
})
