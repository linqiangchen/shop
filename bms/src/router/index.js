import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import main from './module/mainRouter'
import store from '../store'
Vue.use(VueRouter)
const routes = [{
    path: '/login',
    name: 'login',
    component: () => import('../views/account/login.vue')
  },
  main,
]
const router = new VueRouter({
  mode: 'hash',
  routes
})
router.beforeEach(async (to, from, next) => {
  let login = store.state.account.login //获取登录状态
  let info = store.state.account.info
  if (login === -1) { //如果登录状态未设置，获取最新的状态
    let result = await axios.get('/os/account/isLogin')
    store.commit('account/setLogin', result.data.msg) //设置登录状态
    login = result.data.msg
    if (login) {
      let data = await axios.get('/os/account/info')
      store.commit('account/setInfo', data.data.data)
      info = data.data.data
    }
  }
  if (to.name === 'login' || to.name === 'register' || to.name === '403') {
    next()
  } else {
    if (!login) {
      next('/login');
      return
    }
    let index = info.auth.findIndex(item => item === to.name)
    if ((login && index >= 0) || (login && info.isAdmin)) {
      next()
    } else {
      if (index === -1) {
        next('/403')
      }
    }
  }
})
export default router