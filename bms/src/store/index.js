import Vue from 'vue'
import Vuex from 'vuex'
import account from './module/account'
import good from './module/good'
import order from './module/order'
import vip from './module/vip'
import comment from './module/comment'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    account,
    good,
    order,
    vip,
    comment
  }
})
